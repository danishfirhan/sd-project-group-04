import { Resend } from 'resend'
import { SENDER_EMAIL, APP_NAME } from '@/lib/constants'
import ResetPasswordEmail from './reset-password'
import PurchaseReceiptEmail from './purchase-receipt'
import { Order } from '@/types'

const resend = new Resend(process.env.RESEND_API_KEY as string)

export const sendPurchaseReceipt = async ({ order }: { order: Order }) => {
    await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: order.user.email ?? '',
    subject: 'Order Confirmation',
    react: <PurchaseReceiptEmail order={order} />,
    })
}

export const sendResetPasswordEmail = async ({
    user,
    resetLink,
    }: {
    user: { name: string; email: string }
    resetLink: string
    }) => {
    await resend.emails.send({
        from: `${APP_NAME} <${SENDER_EMAIL}>`,
        to: user.email,
        subject: 'Password Reset Request',
        react: <ResetPasswordEmail user={user} resetLink={resetLink} />,
    })
}

export const sendVerificationEmail = async (email: string, token: string) => {
    const resend = new Resend();
    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-email?token=${token}`;
    
    await resend.emails.send({
        to: email,
        from: `${APP_NAME} <no-reply@${process.env.NEXT_PUBLIC_DOMAIN}>`,
        subject: 'Verify your email',
        html: `<p>Please verify your email by clicking the link: <a href="${verificationLink}">Verify Email</a></p>`,
    });
};