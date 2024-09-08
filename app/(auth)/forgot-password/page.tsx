// pages/forgot-password.tsx
"use client";
import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const ForgotPassword = () => {
const [email, setEmail] = useState('')

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault()
// Handle the forgot password logic here
console.log(`Sending password reset link to ${email}`)
}

return (
<div className="w-full max-w-md mx-auto">
    <Card>
    <CardHeader className="space-y-4">
        <CardTitle className="text-center">Forgot Password</CardTitle>
        <CardDescription className="text-center">
        Enter your email to receive a password reset link.
        </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6"> {/* Increased spacing */}
        <form onSubmit={handleSubmit} className="space-y-6"> {/* Added space between form elements */}
        <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
        />
        <Button type="submit" className="w-full">
            Send Reset Link
        </Button>
        </form>
    </CardContent>
    </Card>
</div>
)
}

export default ForgotPassword
