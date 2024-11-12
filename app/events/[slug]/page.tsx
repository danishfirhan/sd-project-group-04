// app/(root)/event/[slug]/page.tsx
import { notFound } from 'next/navigation';
import EventImages from '@/components/shared/event/event-images';
import EventPrice from '@/components/shared/event/event-price';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getEventBySlug } from '@/lib/actions/event.actions';
import { APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const event = await getEventBySlug(params.slug);
    if (!event) {
        return { title: 'Event not found' };
    }
    return {
        title: `${event.name} - ${APP_NAME}`,
        description: event.description,
    };
    }

    const EventDetails = async ({ params: { slug } }: { params: { slug: string } }) => {
    const event = await getEventBySlug(slug);
    if (!event) notFound();

    return (
        <>
        <section>
            <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="col-span-2">
                <EventImages images={event.images!} />
            </div>
            <div className="col-span-2 flex flex-col w-full gap-8 p-5">
                <div className="flex flex-col gap-6">
                <h1 className="h3-bold">{event.name}</h1>
                <p>{event.date.toLocaleDateString()}</p>
                <p>{event.venue}</p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="flex gap-3">
                    <EventPrice value={Number(event.ticketPrice)} className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700" />
                    </ div>
                </div>
                </div>
                <div>
                <p>Description:</p>
                <p>{event.description}</p>
                </div>
            </div>
            <div>
                <Card>
                <CardContent className="p-4">
                    <div className="mb-2 flex justify-between">
                    <div>Price</div>
                    <div>
                        <EventPrice value={Number(event.ticketPrice)} />
                    </div>
                    </div>
                    <div className="mb-2 flex justify-between">
                    <div>Status</div>
                    {event.availableTickets > 0 ? (
                        <Badge variant="outline">Available</Badge>
                    ) : (
                        <Badge variant="destructive">Sold Out</Badge>
                    )}
                    </div>
                    {event.availableTickets > 0 && (
                    <div className="flex-center">
                        <Button className="w-full">Book Now</Button>
                    </div>
                    )}
                </CardContent>
                </Card>
            </div>
            </div>
        </section>
        </>
    );
};

export default EventDetails;