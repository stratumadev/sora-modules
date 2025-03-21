export async function searchResults(query: string): Promise<SearchResult[] | null> {
    return [
        {
            title: 'Demo', // (STRING) REQUIRED -> Title of the Series/Movie
            image: null, // (STRING/NULL) OPTIONAL -> Cover Image (PNG/JPEG/JPG SUPPORTED)
            href: 'https://demo.demo/s/1' // (STRING) REQUIRED -> Href to Series/Movie
        }
    ]
}

export async function extractDetails(query: string): Promise<ExtractedDetails | null> {
    return {
        description: 'Demo Description', // (STRING/NULL) OPTIONAL
        aliases: ['alias1', 'alias2'], // (STRINGARRAY/NULL) OPTIONAL
        airdate: '01.01.2024' // (STRING/NULL) OPTIONAL
    }
}

export async function extractEpisodes(query: string): Promise<ExtractedEpisode[] | null> {
    return [
        {
            number: 1, // (INT) REQUIRED -> if movie 0 otherwise episode number
            href: 'https://demo.demo/s/1/1' // (STRING) REQUIRED -> Href to Episode
        }
    ]
}

export async function extractStreamUrl(query: string): Promise<ExtractedStreamUrl | null> {
    return 'https://demo.demo/s/1/1/stream.m3u8' // (STRING) REQUIRED -> M3U8 Playlist or MP4 Url
}
