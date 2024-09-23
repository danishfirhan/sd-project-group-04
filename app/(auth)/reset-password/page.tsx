/*'use client'

import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function ResetPasswordPage() {
const [email, setEmail] = useState('')
const [loading, setLoading] = useState(false)
const [message, setMessage] = useState('')
const [error, setError] = useState('')
const router = useRouter()

const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault()
setLoading(true)
setError('')
setMessage('')

try {
    // Assuming you have an API endpoint for handling password reset requests
    const res = await fetch('/api/reset-password', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
    })

    if (!res.ok) {
    throw new Error('Failed to send reset email. Please try again.')
    }

    setMessage('Check your email for the reset password link.')
} catch (err: any) {
    setError(err.message || 'An error occurred. Please try again later.')
} finally {
    setLoading(false)
}
}

return (
<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-black">
    <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
    Reset Password
    </h1>

    <form
    className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md"
    onSubmit={handleResetPassword}
    >
    <label
        htmlFor="email"
        className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
    >
        Enter your email to receive reset instructions:
    </label>

    <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="you@example.com"
        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 mb-4 text-gray-700 dark:text-white bg-white dark:bg-gray-900"
    />

    {message && (
        <p className="text-green-500 dark:text-green-400 mb-4 text-sm">
        {message}
        </p>
    )}

    {error && (
        <p className="text-red-500 dark:text-red-400 mb-4 text-sm">
        {error}
        </p>
    )}

    <button
        type="submit"
        disabled={loading}
        className="w-full p-3 rounded-lg bg-blue-500 dark:bg-blue-600 text-white font-semibold hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
    >
        {loading ? 'Sending...' : 'Send Reset Link'}
    </button>
    </form>

    <Link href="/login" className="mt-4 text-blue-500 dark:text-blue-400">
    Back to Login
    </Link>
</div>
)
}
*/