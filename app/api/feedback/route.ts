// app/api/feedback/route.ts

import { NextResponse } from 'next/server';
import db from '@/db/drizzle';
import { feedbacks } from '@/db/schema';

export async function POST(req: Request) {
const { name, email, message } = await req.json();

try {
await db.insert(feedbacks).values({
    id: crypto.randomUUID(),
    name,
    email,
    message,
});

return NextResponse.json({ success: true, message: 'Feedback saved successfully' });
} catch (error) {
return NextResponse.json({ success: false, message: 'Failed to save feedback' });
}
}
