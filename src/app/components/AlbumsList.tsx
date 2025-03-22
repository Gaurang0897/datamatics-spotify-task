interface Album {
  id: string;
  name: string;
  images: { url: string }[];
}

interface AlbumsListProps {
  albums: Album[] | null;
}

const AlbumsList = ({ albums }: AlbumsListProps) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">New Releases</h2>
      {!albums ? (
        <p className="text-gray-500">
          Failed to load new releases. Please try again later.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {albums.map((album: Album) => (
            <div key={album.id} className="bg-gray-00 p-3 rounded-lg">
              <img
                className="rounded-md"
                src={album.images[0]?.url}
                alt={album.name}
              />
              <p className="mt-2 text-sm">{album.name}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AlbumsList;
