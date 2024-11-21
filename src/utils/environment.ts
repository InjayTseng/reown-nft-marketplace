export const getApiDomain = (): string => {
  const hostname = window.location.hostname
  return hostname === 'localhost' || hostname === '127.0.0.1'
    ? 'https://dex-v3-api-aws.lootex.dev'
    : 'https://v3-api.lootex.io'
} 