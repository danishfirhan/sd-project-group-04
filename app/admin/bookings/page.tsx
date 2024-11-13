
import Pagination from '@/components/shared/pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { getAllBookings, deleteBooking } from '@/lib/actions/booking.actions'; // Adjust the import based on your file structure
import { formatId } from '@/lib/utils';
import DeleteDialog from '@/components/shared/delete-dialog';

export const metadata = {
    title: `Admin Bookings - ${process.env.APP_NAME}`,
};

export default async function AdminBookingsPage({
    searchParams,
}: {
    searchParams: { page: string };
}) {
    const page = Number(searchParams.page) || 1;
    const bookings = await getAllBookings();
    const totalPages = 1; // Adjust this if you have a way to get total pages

    return (
        <div className="space-y-2">
            <h1 className="h2-bold">Bookings</h1>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>EVENT NAME</TableHead>
                            <TableHead>NAME</TableHead>
                            <TableHead>EMAIL</TableHead>
                            <TableHead>TOTAL PRICE</TableHead>
                            <TableHead>STATUS</TableHead>
                            <TableHead>CREATED AT</TableHead>
                            <TableHead>ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell>{formatId(booking.id)}</TableCell>
                                <TableCell>{booking.eventName}</TableCell>
                                <TableCell>{booking.name}</TableCell>
                                <TableCell>{booking.email}</TableCell>
                                <TableCell>{Number(booking.totalPrice).toFixed(2)}</TableCell>
                                <TableCell>{booking.status}</TableCell>
                                <TableCell>{new Date(booking.createdAt).toLocaleString()}</TableCell>
                                <TableCell className="flex gap-1">
                                    <DeleteDialog id={booking.id} action={deleteBooking} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {totalPages > 1 && (
                    <Pagination page={page} totalPages={totalPages} />
                )}
            </div>
        </div>
    );
}