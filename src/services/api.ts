export interface Collection {
  id: string
  name: string
  slug: string
  chainId: number
  chainShortName: string
  logoImageUrl: string
  totalVolume: number
  totalTradingCount: number
}

export const formatNumber = (num: number): string => {
  if (!num) return '0'
  if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(2) + 'K'
  return num.toFixed(2)
}

export const formatImageUrl = (url: string): string => {
  if (!url) return '/placeholder.svg'
  return url
}

const getApiDomain = (): string => {
  const hostname = window.location.hostname
  return hostname === 'localhost' || hostname === '127.0.0.1'
    ? 'https://dex-v3-api-aws.lootex.dev'
    : 'https://v3-api.lootex.io'
}

export const fetchHotCollections = async (period = 'today', page = 1): Promise<Collection[]> => {
  try {
    const apiDomain = getApiDomain()
    const response = await fetch(
      `${apiDomain}/api/v3/explore/collections?limit=30&sortBy=-tradingVolume&tradingDays=${period}&isSimple=true&page=${page}`
    )
    const data = await response.json()
    return data.collections || []
  } catch (error) {
    console.error('Error fetching collections:', error)
    return []
  }
} 