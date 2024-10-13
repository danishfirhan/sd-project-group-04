'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SignInWithEmail } from '@/lib/actions/user.actions'

export default function EmailSigninForm() {
const [pending, setPending] = useState(false);

const SignInButton = () => {
return (
    <Button disabled={pending} className="w-full" variant="default">
    {pending ? 'sending email...' : 'Sign In with email'}
    </Button>
)
}

return (
<form onSubmit={async (e) => {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    await SignInWithEmail(formData);
    setPending(false);
}}>
    <div className="space-y-4">
    <div className="space-y-2">
        <Label htmlFor="user_email">Email</Label>
        <Input
        id="user_email"
        name="email"
        placeholder="m@example.com"
        required
        type="email"
        />
    </div>
    <div className="space-y-2">
        <SignInButton />
    </div>
    </div>
</form>
)
}
