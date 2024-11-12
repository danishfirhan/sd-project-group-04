/* import { Metadata } from 'next';

import { auth } from '@/auth';
import { getUserById } from '@/lib/actions/user.actions';
import { APP_NAME } from '@/lib/constants';

import PaymentMethodForm from './payment-method-form';

export const metadata: Metadata = {
    title: `Payment Method - ${APP_NAME}`,
};

interface Params {
    eventId: string;
}

export default async function PaymentMethodPage({ params }: { params: Params }) {
    const session = await auth();
    const user = await getUserById(session?.user.id!);
    const { eventId } = params;

    return <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} eventId={eventId} />;
}
*/