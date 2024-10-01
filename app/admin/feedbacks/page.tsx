import Pagination from '@/components/shared/pagination';
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from '@/components/ui/table';
import { getAllFeedbacks, deleteFeedback } from '@/lib/actions/feedback.actions';
import { formatId } from '@/lib/utils';
import DeleteDialog from '@/components/shared/delete-dialog';

export const metadata = {
title: `Admin Feedback - ${process.env.APP_NAME}`,
};

export default async function AdminFeedbackPage({
searchParams,
}: {
searchParams: { page: string };
}) {
const page = Number(searchParams.page) || 1;
const feedbacks = await getAllFeedbacks({
page,
});
return (
<div className="space-y-2">
    <h1 className="h2-bold">Feedback</h1>
    <div>
    <Table>
        <TableHeader>
        <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead>EMAIL</TableHead>
            <TableHead>MESSAGE</TableHead>
            <TableHead>CREATED AT</TableHead>
            <TableHead>ACTIONS</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
        {feedbacks?.data.map((feedback) => (
            <TableRow key={feedback.id}>
            <TableCell>{formatId(feedback.id)}</TableCell>
            <TableCell>{feedback.name}</TableCell>
            <TableCell>{feedback.email}</TableCell>
            <TableCell>{feedback.message}</TableCell>
            <TableCell>{new Date(feedback.createdAt).toLocaleString()}</TableCell>
            <TableCell className="flex gap-1">
                <DeleteDialog id={feedback.id} action={deleteFeedback} />
            </TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
    {feedbacks?.totalPages! > 1 && (
        <Pagination page={page} totalPages={feedbacks?.totalPages!} />
    )}
    </div>
</div>
);
}