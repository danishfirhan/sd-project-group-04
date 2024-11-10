// app/admin/events/page.tsx

import Link from 'next/link';
import DeleteDialog from '@/components/shared/delete-dialog';
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
import { deleteEvent, getAllEvents } from '@/lib/actions/event.actions';
import { formatId } from '@/lib/utils';

export default async function AdminEventsPage({
    searchParams,
}: {
    searchParams: {
        page: string;
        query: string;
    };
}) {
    const page = Number(searchParams.page) || 1;
    const searchText = searchParams.query || '';
    const events = await getAllEvents({
        query: searchText,
        page,
    });

    return (
        <div className="space-y-2">
            <div className="flex-between">
                <h1 className="h2-bold">Events</h1>
                <Button asChild variant="default">
                    <Link href="/admin/events/create">Create Event</Link>
                </Button>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {events?.data.map((event) => (
                            <TableRow key={event.id}>
                                <TableCell>{formatId(event.id)}</TableCell>
                                <TableCell>{event.name}</TableCell>
                                <TableCell className="text-right">{event.date.toLocaleDateString()}</TableCell>
                                <TableCell>{event.venue}</TableCell>
                                <TableCell className="flex gap-1">
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={`/admin/events/${event.id}`}>Edit</Link>
                                    </Button>
                                    <DeleteDialog id={event.id} action={deleteEvent} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {events?.totalPages! > 1 && (
                    <Pagination page={page} totalPages={events?.totalPages!} />
                )}
            </div>
        </div>
    );
}