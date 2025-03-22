import Image from "next/image";

interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface PlaylistsListProps {
  playlists: Playlist[] | null;
}

const PlaylistsList = ({ playlists }: PlaylistsListProps) => {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Featured Playlists</h2>
      {!playlists ? (
        <p className="text-gray-500">
          Failed to load featured playlists. Please try again later.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="bg-gray-800 p-3 rounded-lg">
              <Image
                className="rounded-md"
                src={playlist.images[0]?.url}
                alt={playlist.name}
                width={300}
                height={300}
                layout="responsive"
              />
              <p className="mt-2 text-sm">{playlist.name}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PlaylistsList;
