declare interface SearchResult {
    title: string
    image: string | null
    href: string
}

declare interface ExtractedDetails {
    description: string | null
    aliases: string[] | null
    airdate: string | null
}

declare interface ExtractedEpisode {
    href: string
    number: number
}

declare type ExtractedStreamUrl = string
