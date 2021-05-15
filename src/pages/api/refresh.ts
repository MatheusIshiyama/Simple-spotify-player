import { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> {
    if (request.method !== "POST") return;
    const redirectUri = process.env.REDIRECT_URI;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    const { refreshToken } = await request.body;
    const spotifyWebApi = new SpotifyWebApi({
        redirectUri,
        clientId,
        clientSecret,
        refreshToken,
    });

    spotifyWebApi
        .refreshAccessToken()
        .then((data) => {
            response.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in,
            });
        })
        .catch(() => {});
}
