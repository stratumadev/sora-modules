import type { HiAnimeExtractedDetails, HiAnimeExtractedEpisode, HiAnimeExtractedStreamUrl, HiAnimeSearchResult } from './types'

async function searchResults(query: string): Promise<SearchResult[] | null> {
    try {
        const encodedKeyword = encodeURIComponent(query)
        const response = await fetch(`https://bshar1865-hianime.vercel.app/api/v2/hianime/search?q=${encodedKeyword}&language=dub`)
        const data: HiAnimeSearchResult = await response.json()
        if (!data) throw Error('Failed to get data from endpoint')

        return data.data.animes.map((anime) => ({
            title: anime.name,
            image: anime.poster,
            href: `https://hianime.to/watch/${anime.id}`
        }))
    } catch (error) {
        console.log('Fetch error:', error)
        return null // Maybe Sora accepts also null?
    }
}

async function extractDetails(href: string): Promise<ExtractedDetails | null> {
    try {
        const match = href.match(/https:\/\/hianime\.to\/watch\/(.+)$/)
        if (!match) throw Error('No match found')

        const encodedID = match[1]

        const response = await fetch(`https://bshar1865-hianime.vercel.app/api/v2/hianime/anime/${encodedID}`)
        const data: HiAnimeExtractedDetails = await response.json()
        if (!data) throw Error('Failed to get data from endpoint')

        const animeInfo = data.data.anime.info
        const moreInfo = data.data.anime.moreInfo

        return {
            description: animeInfo.description ?? 'No description available', // JUST DO NULL IF THERE IS NO DESCRIPTION, saves alot of code
            aliases: [`Duration: ${animeInfo.stats?.duration ?? 'Unknown'}`], // WTF??? SHOULD ONLY BE USED FOR ALIASES!!!!
            airdate: `Aired: ${moreInfo?.aired ?? 'Unknown'}` // ONLY DATE PLEASE
        }
    } catch (error) {
        console.log('Details error:', error)
        return null
    }
}

async function extractEpisodes(href: string): Promise<ExtractedEpisode[] | null> {
    try {
        const match = href.match(/https:\/\/hianime\.to\/watch\/(.+)$/)
        if (!match) throw Error('No match found')

        const encodedID = match[1]
        const response = await fetch(`https://bshar1865-hianime.vercel.app/api/v2/hianime/anime/${encodedID}/episodes`)
        const data: HiAnimeExtractedEpisode = await response.json()
        if (!data) throw Error('Failed to get data from endpoint')

        return data.data.episodes.map((episode) => ({
            href: `https://hianime.to/watch/${encodedID}?ep=${episode.episodeId.split('?ep=')[1]}`,
            number: episode.number
        }))
    } catch (error) {
        console.log('Episodes error:', error)
        return null
    }
}

async function extractStreamUrl(href: string): Promise<ExtractedStreamUrl | null> {
    try {
        const match = href.match(/https:\/\/hianime\.to\/watch\/(.+)$/)
        if (!match) throw Error('No match found')

        const encodedID = match[1]
        const response = await fetch(`https://bshar1865-hianime.vercel.app/api/v2/hianime/episode/sources?animeEpisodeId=${encodedID}&category=dub`)
        const data: HiAnimeExtractedStreamUrl = await response.json()

        const hlsSource = data.data.sources.find((source) => source.type === 'hls')
        if (!hlsSource) throw Error('No streaming source found')

        return hlsSource.url
    } catch (error) {
        console.log('Fetch error:', error)
        return null
    }
}
