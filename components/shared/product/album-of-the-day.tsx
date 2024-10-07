import Image from 'next/image';
import Link from 'next/link';

// Example album interface, modify according to your database structure
interface Album {
    id: number;
    title: string;
    description: string;
    rating: number;
    coverImage?: string; // Optional since we're using a temporary image
    spotifyUrl: string;
}

export default function AlbumOfTheDay({ album }: { album: Album }) {
    // Use the temporary image as a fallback
    const coverImage = album.coverImage || "/assets/images/is-this-it.webp";

    return (
        <div className="flex items-center space-x-8">
            {/* Album Cover */}
            <div className="w-1/3">
                <Image
                    src={coverImage} // Use the temporary cover image
                    alt={album.title}
                    width={300}
                    height={300}
                    className="rounded-lg"
                    priority // Optional: improves loading speed for featured images
                />
            </div>

            {/* Album Details */}
            <div className="w-2/3 space-y-4">
                <h2 className="text-3xl font-bold">{album.title}</h2>
                <p className="text-lg">{album.description}</p>

                {/* Rating (simple star rating representation) */}
                <div className="flex items-center space-x-1">
                    {[...Array(album.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                    ))}
                    {[...Array(5 - album.rating)].map((_, i) => (
                        <span key={i} className="text-gray-300">★</span>
                    ))}
                </div>

                {/* Spotify Embed */}
                <iframe
                    style={{ borderRadius: '12px' }}
                    src={album.spotifyUrl}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>

                {/* View Album Button */}
                <Link href={`/albums/${album.id}`}>
                    <a className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                        View Album
                    </a>
                </Link>
            </div>
        </div>
    );
}
