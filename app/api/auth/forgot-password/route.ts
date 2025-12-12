import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = forgotPasswordSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Check if user exists
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    // Always return success to prevent email enumeration
    // In production, send email only if user exists
    if (userResult.length > 0) {
      // TODO: Generate reset token and send email
      // const resetToken = await generatePasswordResetToken(userResult[0].id);
      // await sendPasswordResetEmail(email, resetToken);
      console.log('Password reset requested for:', email);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'If an account exists with this email, you will receive reset instructions',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'An error occurred processing your request' },
      { status: 500 }
    );
  }
}
