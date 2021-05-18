export interface SearchResults {
    artist: string;
    title: string;
    uri: string;
    albumUrl: {
        width?: number;
        height?: number;
        url: string;
    };
}

export interface TrackSearchResult extends SearchResults {
    chooseTrack: (track: SearchResults) => void;
}