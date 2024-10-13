import { Event } from '@/types';  // Assuming Event type is defined in your types
import EventCard from './event-card';  // Assuming an EventCard component for individual event display

const EventList = ({data }: { title: string, data: Event[] }) => {
    return (
        <>

            {data.length > 0 ? (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.map((event: Event) => (
                            <EventCard key={event.slug} event={event} />
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <p>No events found</p>
                </div>
            )}
        </>
    );
}

export default EventList;
