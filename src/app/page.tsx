import { fetchSpotifyData } from "../lib/spotify";
import AlbumsList from "./components/AlbumsList";
import PlaylistsList from "./components/PlaylistsList";
import GenresList from "./components/GenresList";

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
}

interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface Category {
  id: string;
  name: string;
}

interface SpotifyData {
  albums: { items: Album[] };
  playlists: { items: Playlist[] };
  categories: { items: Category[] };
}

export default async function Home() {
  const newReleases = await fetchSpotifyData<SpotifyData>(
    "/browse/new-releases"
  );
  const featuredPlaylists = await fetchSpotifyData<SpotifyData>(
    "/browse/featured-playlists"
  );
  const categories = await fetchSpotifyData<SpotifyData>("/browse/categories");

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Spotify Clone</h1>

      {/* New Releases */}
      <AlbumsList albums={newReleases ? newReleases.albums.items : null} />

      {/* Featured Playlists */}
      <PlaylistsList
        playlists={featuredPlaylists ? featuredPlaylists.playlists.items : null}
      />

      {/* Browse Genres */}
      <GenresList
        categories={categories ? categories.categories.items : null}
      />
    </div>
  );
}
