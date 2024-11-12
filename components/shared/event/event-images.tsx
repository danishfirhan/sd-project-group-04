// components/shared/event/event-images.tsx
'use client'
import Image from 'next/image';
import * as React from 'react';
import { cn } from '@/lib/utils';

export default function EventImages({ images }: { images: string[] }) {
const [current, setCurrent] = React.useState(0);
return (
    <div className="space-y-4">
    <Image
        src={images[current]}
        alt="Event image"
        width={1000}
        height={1000}
        className="min-h-[300px] object-cover object-center"
    />
    <div className="flex">
        {images.map((image, index) => (
        <div
            key={image}
            className={cn(
            'border mr-2 cursor-pointer hover:border-orange-600',
            current === index && 'border-orange-500'
            )}
            onClick={() => setCurrent(index)}
        >
            <Image src={image} alt="Event thumbnail" width={100} height={100} />
        </div>
        ))}
    </div>
    </div>
);
}
