import {
Body,
Column,
Container,
Head,
Heading,
Html,
Preview,
Row,
Section,
Tailwind,
Text,
} from '@react-email/components'

type ResetPasswordEmailProps = {
user: {
    name: string
    email: string
}
resetLink: string
}

export default function ResetPasswordEmail({
user,
resetLink,
}: ResetPasswordEmailProps) {
return (
    <Html>
    <Preview>Password Reset Request</Preview>
    <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
        <Container className="max-w-xl">
            <Heading>Password Reset</Heading>
            <Section>
            <Row>
                <Column>
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
                    If you did not request a password reset, please ignore this email or contact support.
                </Text>
                <Text>Thanks,</Text>
                <Text>Your team at MusicRecords2U.</Text>
                </Column>
            </Row>
            </Section>
        </Container>
        </Body>
    </Tailwind>
    </Html>
)
}
