import { Metadata } from 'next'
import UserForm from '@/components/shared/admin/user-form'
import { APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
    title: `Create User - ${APP_NAME}`,
}

export default function CreateUserPage() {
    return (
    <div className="space-y-8 max-w-lg mx-auto">
        <h1 className="h2-bold">Create User</h1>
        <UserForm type="Create" />
    </div>
    )
}