/*
import { auth } from '@/auth';
import Pagination from '@/components/shared/pagination';
import { Button } from '@/components/ui/button';
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from '@/components/ui/table';
import { deleteFeedback, getAllFeedbacks } from '@/lib/actions/feedback.actions';
import { APP_NAME } from '@/lib/constants';
import { formatDateTime, formatId } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
title: `Admin Feedbacks - ${APP_NAME}`,
};

export default async function FeedbackPage({
searchParams: { page = '1' },
}: {
searchParams: { page: string };
}) {
const session = await auth();
if (session?.user.role !== 'admin') throw new Error('admin permission required');

const feedbacks = await getAllFeedbacks({
page: Number(page),
});

return (
<div className="space-y-2">
    <h1 className="h2-bold">Feedbacks</h1>
    <div className="overflow-x-auto">
    <Table>
        <TableHeader>
        <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead>EMAIL</TableHead>
            <TableHead>MESSAGE</TableHead>
            <TableHead>SENT AT</TableHead>
            <TableHead>ACTIONS</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
        {feedbacks.data.map((feedback) => (
            <TableRow key={feedback.id}>
            <TableCell>{formatId(feedback.id)}</TableCell>
            <TableCell>{feedback.name}</TableCell>
            <TableCell>{feedback.email}</TableCell>
            <TableCell>{feedback.message}</TableCell>
            <TableCell>
                {formatDateTime(feedback.createdAt).dateTime}
            </TableCell>
            <TableCell className="flex gap-1">
                <Button asChild variant="outline" size="sm">
                <a href={`mailto:${feedback.email}`}>Reply</a>
                </Button>
                <Button asChild variant="outline" size="sm">
                <DeleteDialog id={feedback.id} action={deleteFeedback} />
                </Button>
            </TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
    {feedbacks.totalPages > 1 && (
        <Pagination page={page} totalPages={feedbacks.totalPages!} />
    )}
    </div>
</div>
);
}
*/