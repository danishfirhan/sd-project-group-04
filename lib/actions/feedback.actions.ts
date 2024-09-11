'use server'

import { auth } from '@/auth'
import db from '@/db/drizzle'
import { feedbacks } from '@/db/schema'
import { count, desc, eq } from 'drizzle-orm'
import { formatError } from '../utils'
import { PAGE_SIZE } from '../constants'
import { revalidatePath } from 'next/cache'

// GET
export async function getFeedbackById(feedbackId: string) {
return await db.query.feedbacks.findFirst({
where: eq(feedbacks.id, feedbackId),
})
}

export async function getAllFeedbacks({
limit = PAGE_SIZE,
page,
}: {
limit?: number
page: number
}) {
const data = await db.query.feedbacks.findMany({
orderBy: [desc(feedbacks.createdAt)],
limit,
offset: (page - 1) * limit,
})

const dataCount = await db.select({ count: count() }).from(feedbacks)

return {
data,
totalPages: Math.ceil(dataCount[0].count / limit),
}
}

// CREATE
// Define the type for the feedback object
type Feedback = {
name: string;
email: string;
message: string;
userId?: string; // Make userId optional
createdAt?: Date; // Make createdAt optional
};

export async function createFeedback({
name,
email,
message,
}: {
name: string;
email: string;
message: string;
}) {
try {
    const session = await auth();
    if (!session) throw new Error('User is not authenticated');

    // Ensure the values object matches the Feedback type
    const feedback: Feedback = {
    name,
    email,
    message,
    userId: session.user.id!,
    createdAt: new Date(),
    };

    await db.insert(feedbacks).values(feedback);

    revalidatePath('/admin/feedbacks');
    return { success: true, message: 'Feedback created successfully' };
} catch (error) {
    return { success: false, message: formatError(error) };
}
}

// DELETE
export async function deleteFeedback(id: string) {
try {
await db.delete(feedbacks).where(eq(feedbacks.id, id))
revalidatePath('/admin/feedbacks')
return { success: true, message: 'Feedback deleted successfully' }
} catch (error) {
return { success: false, message: formatError(error) }
}
}
