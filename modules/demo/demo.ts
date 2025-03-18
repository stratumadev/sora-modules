async function searchResults(query: string): Promise<SearchResult[]> {
    return [
        {
            title: 'Demo', // (STRING) REQUIRED -> Title of the Series/Movie
            image: null, // (STRING/NULL) OPTIONAL -> Cover Image (PNG/JPEG/JPG SUPPORTED)
            href: 'https://demo.demo/s/1' // (STRING) REQUIRED -> Href to Series/Movie
        }
    ]
}

async function extractDetails(href: string): Promise<ExtractedDetails> {
    return {
        description: 'Demo Description', // (STRING/NULL) OPTIONAL
        aliases: ['alias1', 'alias2'], // (STRINGARRAY/NULL) OPTIONAL
        airdate: '01.01.2024' // (STRING/NULL) OPTIONAL
    }
}

async function extractEpisodes(href: string): Promise<ExtractedEpisode[]> {
    return [
        {
            number: 1, // (INT) REQUIRED -> if movie 0 otherwise episode number
            href: 'https://demo.demo/s/1/1' // (STRING) REQUIRED -> Href to Episode
        }
    ]
}

async function extractStreamUrl(href: string): Promise<ExtractedStreamUrl> {
    return 'https://demo.demo/s/1/1/stream.m3u8' // (STRING) REQUIRED -> M3U8 Playlist or MP4 Url
}
