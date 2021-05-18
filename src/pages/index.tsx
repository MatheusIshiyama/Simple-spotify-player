import { Container } from "react-bootstrap";

export default function Login({ spotifyAuthUrl }) {
    return (
        <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
        >
            <a href={spotifyAuthUrl} className="btn btn-success btn-lg">
                Login with Spotify
            </a>
        </Container>
    );
}

export function getServerSideProps() {
    const clientId: string = process.env.CLIENT_ID;
    const redirectUri: string = process.env.REDIRECT_URI;
    const scopes: string =
        "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state";
    const encodedRedirectUri = encodeURIComponent(redirectUri);
    const encodedScopes = encodeURIComponent(scopes);
    const spotifyAuthUrl: string = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodedRedirectUri}&scopes=${encodedScopes}`;

    return {
        props: {
            spotifyAuthUrl,
        },
    };
}
