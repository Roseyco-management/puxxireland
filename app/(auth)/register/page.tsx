'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Mail, Lock, Eye, EyeOff, User, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { signUp } from '../actions';
import { ActionState } from '@/lib/auth/middleware';

// Password strength checker
function getPasswordStrength(password: string): { score: number; text: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  if (score <= 2) return { score, text: 'Weak', color: 'red' };
  if (score === 3) return { score, text: 'Fair', color: 'yellow' };
  if (score === 4) return { score, text: 'Good', color: 'blue' };
  return { score, text: 'Strong', color: 'green' };
}

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    signUp,
    { error: '' }
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: '', color: '' });
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(getPasswordStrength(newPassword));
    if (confirmPassword) {
      setPasswordsMatch(newPassword === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(password === newConfirmPassword);
  };

  return (
    <div className="w-full max-w-2xl space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Join PUXX Ireland for premium nicotine pouches
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <form action={formAction} className="space-y-5">
          {/* Name Fields */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  maxLength={100}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-400"
                  placeholder="John"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  maxLength={100}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-400"
                  placeholder="Doe"
                />
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={255}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-400"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                minLength={8}
                maxLength={100}
                value={password}
                onChange={handlePasswordChange}
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-400"
                placeholder="Min. 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Password strength:</span>
                  <span className={`text-xs font-medium text-${passwordStrength.color}-600`}>
                    {passwordStrength.text}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full bg-${passwordStrength.color}-600 transition-all duration-300`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Must contain at least 8 characters, 1 uppercase, 1 number, and 1 special character
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                minLength={8}
                maxLength={100}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-400"
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {confirmPassword && (
              <div className="mt-2 flex items-center">
                {passwordsMatch ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">Passwords match</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-600 mr-1" />
                    <span className="text-xs text-red-600">Passwords do not match</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
                max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-colors text-gray-900"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              You must be 18 or older to purchase nicotine products
            </p>
          </div>

          {/* How did you hear about us */}
          <div>
            <label
              htmlFor="referralSource"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              How did you hear about us?
            </label>
            <select
              id="referralSource"
              name="referralSource"
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-colors text-gray-900"
            >
              <option value="">Select an option</option>
              <option value="social_media">Social Media</option>
              <option value="friend_family">Friend/Family</option>
              <option value="search_engine">Search Engine</option>
              <option value="advertisement">Advertisement</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Age Verification Checkbox */}
          <div className="space-y-3">
            <div className="flex items-start">
              <input
                id="ageVerified"
                name="ageVerified"
                type="checkbox"
                required
                className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded cursor-pointer mt-1"
              />
              <label
                htmlFor="ageVerified"
                className="ml-2 block text-sm text-gray-700 cursor-pointer"
              >
                <span className="font-medium">I confirm I am 18 years or older</span>{' '}
                <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Marketing Consent */}
            <div className="flex items-start">
              <input
                id="marketingConsent"
                name="marketingConsent"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded cursor-pointer mt-1"
              />
              <label
                htmlFor="marketingConsent"
                className="ml-2 block text-sm text-gray-700 cursor-pointer"
              >
                I'd like to receive offers, updates, and special promotions from PUXX Ireland
              </label>
            </div>

            {/* Terms Acceptance */}
            <div className="flex items-start">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                required
                className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded cursor-pointer mt-1"
              />
              <label
                htmlFor="termsAccepted"
                className="ml-2 block text-sm text-gray-700 cursor-pointer"
              >
                I agree to the{' '}
                <Link href="/terms" className="text-green-600 hover:text-green-700 underline">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-green-600 hover:text-green-700 underline">
                  Privacy Policy
                </Link>{' '}
                <span className="text-red-500">*</span>
              </label>
            </div>
          </div>

          {/* Error Message */}
          {state?.error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-sm text-red-800">{state.error}</p>
            </div>
          )}

          {/* Success Message */}
          {state?.success && (
            <div className="rounded-lg bg-green-50 border border-green-200 p-3">
              <p className="text-sm text-green-800">{state.success}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={pending || !passwordsMatch}
            className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {pending ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or sign up with
            </span>
          </div>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          disabled
          className="w-full flex justify-center items-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign up with Google
          <span className="ml-2 text-xs text-gray-400">(Coming soon)</span>
        </button>
      </div>

      {/* Sign In Link */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-green-600 hover:text-green-700"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
