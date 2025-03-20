import type { HiAnimeExtractedDetails, HiAnimeExtractedEpisode, HiAnimeExtractedStreamUrl, HiAnimeSearchResult } from './types'

export async function searchResults(query: string): Promise<SearchResult[] | null> {
    try {
        const encodedKeyword = encodeURIComponent(query)
        const response = await fetch(`https://bshar1865-hianime.vercel.app/api/v2/hianime/search?q=${encodedKeyword}&language=dub`)
        const data: HiAnimeSearchResult = await response.json()
        if (!data) throw Error('Failed to get data from endpoint')

        return data.data.animes.map((anime) => ({
            title: anime.name,
            image: anime.poster,
            href: String(anime.id) // Not sure what the API returns, lets just be 100% sure
        }))
    } catch (error) {
        console.log('Fetch error:', error)
        return null
    }
}

export async function extractDetails(query: string): Promise<ExtractedDetails | null> {
    try {
        const response = await fetch(`https://bshar1865-hianime.vercel.app/api/v2/hianime/anime/${query}`)
        const data: HiAnimeExtractedDetails = await response.json()
        if (!data) throw Error('Failed to get data from endpoint')

        const animeInfo = data.data.anime.info
        const moreInfo = data.data.anime.moreInfo

        return {
            description: animeInfo.description ?? null,
            aliases: null,
            airdate: moreInfo && moreInfo.aired ? moreInfo.aired : null
        }
    } catch (error) {
        console.log('Details error:', error)
        return null
    }
}

export async function extractEpisodes(query: string): Promise<ExtractedEpisode[] | null> {
    try {
        const response = await fetch(`https://bshar1865-hianime.vercel.app/api/v2/hianime/anime/${query}/episodes`)
        const data: HiAnimeExtractedEpisode = await response.json()
        if (!data) throw Error('Failed to get data from endpoint')

        return data.data.episodes.map((episode) => ({
            href: episode.episodeId.split('?ep=')[1],
            number: episode.number
        }))
    } catch (error) {
        console.log('Episodes error:', error)
        return null
    }
}

export async function extractStreamUrl(query: string): Promise<ExtractedStreamUrl | null> {
    try {
        const response = await fetch(`https://bshar1865-hianime.vercel.app/api/v2/hianime/episode/sources?animeEpisodeId=${query}&category=dub`)
        const data: HiAnimeExtractedStreamUrl = await response.json()

        const hlsSource = data.data.sources.find((source) => source.type === 'hls')
        if (!hlsSource) throw Error('No streaming source found')

        return hlsSource.url
    } catch (error) {
        console.log('Fetch error:', error)
        return null
    }
}
