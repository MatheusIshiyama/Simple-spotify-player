import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";

import { SearchResults } from "../interfaces";

import { TrackSearchResult } from "../components";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
});

export default function Dashboard() {
    const [search, setSearch] = useState<string>("");
    const [searchResults, setSearchResults] = useState<SearchResults[]>([]);

    const router = useRouter();
    const { code } = router.query;

    const accessToken = useAuth(String(code));

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;

        spotifyApi.searchTracks(search).then((response) => {
            setSearchResults(
                response.body.tracks.items.map((track) => {
                    const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                        if (image.height < smallest.height) return image;
                        return smallest;
                    }, track.album.images[0]);

                    const data: SearchResults = {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage,
                    };

                    return data;
                })
            );
        });
    }, [search, accessToken]);

    return (
        <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
            <Form.Control
                type="search"
                placeholder="Search Songs/Artists"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                {searchResults.map((track) => (
                    <TrackSearchResult track={track} key={track.uri} />
                ))}
            </div>
            <div>bottom</div>
        </Container>
    );
}
