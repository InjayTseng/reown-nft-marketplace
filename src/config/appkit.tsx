import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// Create QueryClient instance
export const queryClient = new QueryClient()

// Get your project ID from https://cloud.reown.com
const projectId = '419281db8df7a77cd58b235a42ab2168'

const metadata = {
  name: 'Your App Name',
  description: 'Your App Description',
  url: 'https://yourapp.com',
  icons: ['https://yourapp.com/icon.png']
}

const networks = [mainnet, arbitrum]

// Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

// Create AppKit instance
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    email: true,
    socials: ['google', 'discord', 'github'],
    emailShowWallets: true,
    analytics: true
  },
  allWallets: 'SHOW'
})

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
} 