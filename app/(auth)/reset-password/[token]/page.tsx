    // app/reset-password/[token]/page.tsx
    'use client';
    import React, { useState } from 'react';
    import { useRouter } from 'next/router';

    export default function ResetPasswordPage({ params }: { params: { token: string } }) {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: params.token, newPassword }),
        });
        const data = await response.json();
        if (data.message) {
        setMessage(data.message);
        router.push('/login');
        } else {
        setMessage(data.error);
        }
    };

    return (
        <div>
        <h1>Reset Your Password</h1>
        <form onSubmit={handleSubmit}>
            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <button type="submit">Reset Password</button>
        </form>
        {message && <p>{message}</p>}
        </div>
    );
    }
