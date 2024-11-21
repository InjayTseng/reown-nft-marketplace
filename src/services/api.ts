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

const PINATA_GATEWAY = import.meta.env.VITE_PINATA_GATEWAY
const S3_OLD_DOMAIN = import.meta.env.VITE_S3_OLD_DOMAIN
const S3_NEW_DOMAIN = import.meta.env.VITE_S3_NEW_DOMAIN

// Handle IPFS URLs
const formatIpfsUrl = (url: string): string => {
  if (!url) return url
  return url
    .replace(/^ipfs:\/\//, `${PINATA_GATEWAY}/`)
    .replace(/^ipfs:\/\/ipfs\//, `${PINATA_GATEWAY}/`)
    .replace(/^https:\/\/gateway.pinata.cloud\/ipfs/, PINATA_GATEWAY)
    .replace(/^https:\/\/maticpunks.mypinata.cloud\/ipfs/, PINATA_GATEWAY)
    .replace(/^https:\/\/ipfs.infura.io\/ipfs/, PINATA_GATEWAY)
    .replace(/^https:\/\/ipfs.moralis.io:2053\/ipfs/, PINATA_GATEWAY)
    .replace(/^https:\/\/(.*)\.ipfs\.nftstorage\.link/, `${PINATA_GATEWAY}/$1`)
}

// Handle S3 URLs
const formatS3Url = (url: string): string => {
  if (!url) return url
  if (url.startsWith(S3_OLD_DOMAIN)) {
    return url.replace(S3_OLD_DOMAIN, S3_NEW_DOMAIN)
  }
  return url
}

export const formatImageUrl = (url: string): string => {
  if (!url || url.trim() === '') return '/placeholder.svg'
  
  try {
    // First handle IPFS URLs
    let formattedUrl = formatIpfsUrl(url)
    // Then handle S3 URLs
    formattedUrl = formatS3Url(formattedUrl)
    
    // Validate URL
    new URL(formattedUrl)
    return formattedUrl
  } catch {
    return '/placeholder.svg'
  }
}

const getApiDomain = (): string => {
//   const hostname = window.location.hostname
//   return hostname === 'localhost' || hostname === '127.0.0.1'
//     ? 'https://dex-v3-api-aws.lootex.dev'
//     : 'https://v3-api.lootex.io'
return 'https://v3-api.lootex.io'
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