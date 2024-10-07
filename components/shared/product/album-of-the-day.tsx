import Image from 'next/image';
import Link from 'next/link';

// Example album interface, modify according to your database structure
interface Album {
    id: number;
    title: string;
    description: string;
    coverImage?: string; // Optional since we're using a temporary image
}

export default function AlbumOfTheDay({ album }: { album: Album }) {
    // Use the temporary image as a fallback
    const coverImage = album.coverImage || "/assets/images/is-this-it.webp";
    
    // Update productLink to go to a specific product page
    const productLink = `/product/the-strokes-is-this-it-cd`; 

    return (
        <div className="mt-6 mb-6"> {/* Margin for spacing */}
            <h2 className="text-2xl font-bold mb-3">Album Of The Day</h2> {/* Album title */}
            <div className="flex items-start space-x-6"> {/* Flex container */}
                {/* Album Link */}
                <Link href={productLink} className="w-1/3"> {/* Make the cover image clickable */}
                    <Image
                        src={coverImage} // Use the temporary cover image
                        alt={album.title}
                        width={400} // Adjusted width for the image
                        height={400} // Maintain aspect ratio
                        className="rounded-lg cursor-pointer" // Add cursor pointer for better UX
                        priority // Optional: improves loading speed for featured images
                    />
                </Link>

                {/* Album Details */}
                <div className="w-2/3 space-y-3"> {/* Adjusted width and spacing */}
                    <Link href={productLink}>
                        <h3 className="text-2xl font-semibold cursor-pointer">{album.title}</h3> {/* Make title clickable */}
                    </Link>
                    <p className="text-base">{album.description}</p> {/* Description text */}

                    {/* Spotify Embed */}
                    <iframe 
                        style={{ borderRadius: '12px' }} 
                        src="https://open.spotify.com/embed/album/2k8KgmDp9oHrmu0MIj4XDE?utm_source=generator" 
                        width="100%" 
                        height="152" 
                        frameBorder="0" 
                        allowFullScreen 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
