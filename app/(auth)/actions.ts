'use server';

import { z } from 'zod';
import { eq, and } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import {
  users,
  profiles,
  type NewUser,
  type NewProfile,
} from '@/lib/db/schema';
import { comparePasswords, hashPassword, setSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { validatedAction } from '@/lib/auth/middleware';

// Helper function to calculate age
function calculateAge(dateOfBirth: Date): number {
  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--;
  }
  return age;
}

// Password validation regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/;

// Sign In Schema
const signInSchema = z.object({
  email: z.string().email('Invalid email address').min(3).max(255),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100),
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const { email, password } = data;

  // Find user by email
  const userResult = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (userResult.length === 0) {
    return {
      error: 'Invalid email or password. Please try again.',
      email,
      password: ''
    };
  }

  const foundUser = userResult[0];

  // Verify password
  const isPasswordValid = await comparePasswords(password, foundUser.passwordHash);

  if (!isPasswordValid) {
    return {
      error: 'Invalid email or password. Please try again.',
      email,
      password: ''
    };
  }

  // Check if user is deleted
  if (foundUser.deletedAt) {
    return {
      error: 'This account has been deactivated. Please contact support.',
      email,
      password: ''
    };
  }

  // Set session
  await setSession(foundUser);

  // Redirect to account page
  redirect('/account');
});

// Sign Up Schema
const signUpSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Invalid email address').max(255),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100)
    .regex(
      passwordRegex,
      'Password must contain at least 1 uppercase letter, 1 number, and 1 special character'
    ),
  confirmPassword: z.string(),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  referralSource: z.string().optional(),
  ageVerified: z.string().optional(),
  marketingConsent: z.string().optional(),
  termsAccepted: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const signUp = validatedAction(signUpSchema, async (data, formData) => {
  const {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    referralSource,
    ageVerified,
    marketingConsent,
    termsAccepted,
  } = data;

  // Check if terms are accepted
  if (termsAccepted !== 'on') {
    return {
      error: 'You must accept the Terms & Conditions to create an account.',
    };
  }

  // Check if age is verified
  if (ageVerified !== 'on') {
    return {
      error: 'You must confirm you are 18 years or older.',
    };
  }

  // Validate age
  const dob = new Date(dateOfBirth);
  const age = calculateAge(dob);

  if (age < 18) {
    return {
      error: 'You must be at least 18 years old to create an account.',
    };
  }

  // Check if user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return {
      error: 'An account with this email already exists. Please sign in instead.',
    };
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user
  const fullName = `${firstName} ${lastName}`;
  const newUser: NewUser = {
    name: fullName,
    email,
    passwordHash,
    role: 'member', // Default role for e-commerce users
  };

  const [createdUser] = await db.insert(users).values(newUser).returning();

  if (!createdUser) {
    return {
      error: 'Failed to create user. Please try again.',
    };
  }

  // Create profile
  const newProfile: NewProfile = {
    userId: createdUser.id,
    dateOfBirth: dob,
    ageVerified: true, // Already verified above
    referralSource: referralSource || null,
    marketingConsent: marketingConsent === 'on',
  };

  await db.insert(profiles).values(newProfile);

  // Return success message (don't auto-login, send to login page)
  return {
    success: 'Account created successfully! Please sign in to continue.',
  };
});

// Request Password Reset Schema
const requestPasswordResetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const requestPasswordReset = validatedAction(
  requestPasswordResetSchema,
  async (data) => {
    const { email } = data;

    // Check if user exists
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    // Always return success message to prevent email enumeration
    // In production, you would send an email here with a reset token
    // For now, we'll just return a success message

    if (userResult.length > 0) {
      // TODO: Generate reset token and send email
      // const resetToken = await generateResetToken(userResult[0].id);
      // await sendPasswordResetEmail(email, resetToken);
      console.log('Password reset requested for:', email);
    }

    return {
      success: 'If an account exists with this email, you will receive password reset instructions shortly.',
    };
  }
);

// Reset Password Schema
const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100)
    .regex(
      passwordRegex,
      'Password must contain at least 1 uppercase letter, 1 number, and 1 special character'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const resetPassword = validatedAction(
  resetPasswordSchema,
  async (data) => {
    const { token, password } = data;

    // TODO: Implement token validation
    // In production, you would:
    // 1. Verify the token hasn't expired
    // 2. Find the user associated with the token
    // 3. Update their password
    // 4. Invalidate the token

    // For now, we'll just return an error
    return {
      error: 'Password reset functionality is currently being set up. Please contact support.',
    };

    // When implemented:
    // const newPasswordHash = await hashPassword(password);
    // await db.update(users).set({ passwordHash: newPasswordHash }).where(eq(users.id, userId));
    // return { success: 'Password reset successfully! Redirecting to sign in...' };
  }
);

// Sign Out
export async function signOut() {
  (await cookies()).delete('session');
  redirect('/login');
}
