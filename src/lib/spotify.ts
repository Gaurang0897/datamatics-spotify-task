import axios from "axios";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;
const spotifyUrl = process.env.NEXT_PUBLIC_SPOTIFY_API_URL;

let accessToken = "";

// Fetch access token using Spotify API credentials
async function getAccessToken(): Promise<string> {
  if (accessToken) return accessToken;

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error("Failed to get access token from Spotify.");
  }
}

// Fetch data from Spotify API
export async function fetchSpotifyData<T>(endpoint: string): Promise<T | null> {
  const token = await getAccessToken();

  const url = `${spotifyUrl}${endpoint}`;

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(
        `Error fetching data from ${url}:`,
        error.response?.data || error.message
      );
    } else {
      console.log(`Unexpected error:`, error);
    }
    return null;
  }
}
