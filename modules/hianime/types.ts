export interface HiAnimeSearchResult {
    data: {
        animes: {
            id: string
            name: string
            poster: string
            episodes: {
                dub: string | null
            }
        }[]
    }
}

export interface HiAnimeExtractedDetails {
    data: {
        anime: {
            info: {
                description: string
                stats:
                    | {
                          duration: string | undefined
                      }
                    | undefined
            }
            moreInfo:
                | {
                      aired: string | undefined
                  }
                | undefined
        }
    }
}

export interface HiAnimeExtractedEpisode {
    data: {
        episodes: {
            episodeId: string
            number: number
        }[]
    }
}

export interface HiAnimeExtractedStreamUrl {
    data: {
        sources: {
            type: string
            url: string
        }[]
    }
}
