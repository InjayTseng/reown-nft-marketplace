import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// Create QueryClient instance
const queryClient = new QueryClient()

// Get your project ID from https://cloud.reown.com
const projectId = 'YOUR_PROJECT_ID'

const metadata = {
  name: 'Your App Name',
  description: 'Your App Description',
  url: 'https://yourapp.com', // Replace with your domain
  icons: ['https://yourapp.com/icon.png'] // Replace with your icon
}

const networks = [mainnet, arbitrum]

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
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
    socials: ['google', 'discord', 'github'], // Add/remove social providers as needed
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