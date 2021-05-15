export default function Login({ spotifyAuthUrl }) {
    return (
        <div>
            <a href={spotifyAuthUrl}>Login</a>
        </div>
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
