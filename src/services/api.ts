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