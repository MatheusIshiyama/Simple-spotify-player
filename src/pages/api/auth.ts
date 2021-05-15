import { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> {
    if (request.method !== "POST") return;
    const redirectUri: string = process.env.REDIRECT_URI;
    const clientId: string = process.env.CLIENT_ID;
    const clientSecret: string = process.env.CLIENT_SECRET;

    const { code } = await request.body;
    const spotifyWebApi = new SpotifyWebApi({
        redirectUri,
        clientId,
        clientSecret,
    });

    spotifyWebApi
        .authorizationCodeGrant(code)
        .then((data) => {
            response.json({
                accessToken: data.body["access_token"],
                refreshToken: data.body["refresh_token"],
                expiresIn: data.body["expires_in"],
            });
        })
        .catch(() => {});
}
