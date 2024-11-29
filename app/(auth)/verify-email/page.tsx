import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
    title: `Email Verified - ${APP_NAME}`,
}

export default async function VerifyEmail({
    searchParams: { callbackUrl },
}: {
    searchParams: {
        callbackUrl: string
    }
}) {
    const session = await auth()
    if (session) {
        return redirect(callbackUrl || '/')
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <Card>
                <CardHeader className="space-y-4">
                    <Link href="/" className="flex-center">
                        <Image
                            src="/assets/icons/logo.svg"
                            width={100}
                            height={100}
                            alt={`${APP_NAME} logo`}
                        />
                    </Link>
                    <CardTitle className="text-center">Email Verified</CardTitle>
                    <CardDescription className="text-center">
                        Your email address has been successfully verified!
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                    <p>
                        Thank you for verifying your email. You can now <br />
                        <Link href="/sign-in" className="text-blue-500 hover:underline">
                            sign in
                        </Link> to your account.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}