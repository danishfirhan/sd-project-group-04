// email/reset-password-email.tsx
import {
    Body,
    Container,
    Head,
    Html,
    Preview,
    Text,
    Tailwind,
} from '@react-email/components';

type ResetPasswordEmailProps = {
    user: {
        name: string;
        email: string;
    };
};

export default function ResetPasswordEmail({ user }: ResetPasswordEmailProps) {
    const resetLink = 'http://localhost:3000/reset-password/839e929132'; // Fixed link

    return (
        <Html>
            <Preview>Password Reset Request</Preview>
            <Tailwind>
                <Head />
                <Body className="font-sans bg-white">
                    <Container className="max-w-xl">
                        <Text>Hi {user.name},</Text>
                        <Text>
                            We received a request to reset the password for your account. You can reset your password by clicking the link below:
                        </Text>
                        <Text>
                            <a href={resetLink} target="_blank" rel="noopener noreferrer">
                                Reset Password
                            </a>
                        </Text>
                        <Text>
                            If you did not request a password reset, please ignore this email or contact our support team.
                        </Text>
                        <Text>Thanks,</Text>
                        <Text>Your team.</Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}