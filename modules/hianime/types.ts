export interface HiAnimeSearchResult {
    success: boolean
    data: {
        animes: {
            id: string
            name: string
            jname: string
            poster: string
            duration: string
            type: string
            rating: any
            episodes: {
                sub: number
                dub: number
            }
        }[]
    }
}

export interface HiAnimeExtractedDetails {
    success: boolean
    data: {
        anime: {
            info: {
                id: string
                anilistId: number
                malId: number
                name: string
                poster: string
                description: string
                stats: {
                    rating: string
                    quality: string
                    episodes: {
                        sub: number
                        dub: number
                    }
                    type: string
                    duration: string
                }
                promotionalVideos: any[]
                charactersVoiceActors: any[]
            }
            moreInfo: {
                japanese: string
                synonyms: string
                aired: string
                premiered: string
                duration: string
                status: string
                malscore: string
                genres: string[]
                studios: string
                producers: string[]
            }
        }
    }
}

export interface HiAnimeExtractedEpisode {
    success: boolean
    data: {
        totalEpisodes: number
        episodes: {
            title: string
            episodeId: string
            number: number
            isFiller: boolean
        }[]
    }
}

export interface HiAnimeExtractedStreamUrl {
    success: boolean
    data: {
        tracks: {
            file: string
            label?: string
            kind: string
            default?: boolean
        }[]
        intro: {
            start: number
            end: number
        }
        outro: {
            start: number
            end: number
        }
        sources: {
            url: string
            type: string
        }[]
        anilistID: number
        malID: number
    }
}
