import React from 'react'
import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import Navbar from './components/Navbar.jsx'
import NFTCard from './components/NFTCard.jsx'
import './App.css'

// Create QueryClient instance
const queryClient = new QueryClient()

// IMPORTANT: Replace with your actual project ID from Reown Cloud
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || 'YOUR_PROJECT_ID'

const metadata = {
  name: 'Marketplace',
  description: 'NFT Marketplace powered by Reown',
  url: window.location.origin,
  icons: [`${window.location.origin}/vite.svg`]
}

const networks = [mainnet, arbitrum]

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false // Changed to false for browser environment
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

// Sample NFT data
const sampleNFTs = [
  {
    id: 1,
    name: "Cool NFT #1",
    collection: "Cool Collection",
    price: "0.1",
    image: "https://picsum.photos/300/300?random=1"
  },
  {
    id: 2,
    name: "Awesome NFT #2",
    collection: "Awesome Collection",
    price: "0.2",
    image: "https://picsum.photos/300/300?random=2"
  }
].concat(Array.from({ length: 6 }, (_, i) => ({
  id: i + 3,
  name: `NFT #${i + 3}`,
  collection: "Featured Collection",
  price: (Math.random() * 2).toFixed(2),
  image: `https://picsum.photos/300/300?random=${i + 3}`
})))

function App() {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <Navbar />
          
          <main>
            <section className="hero-section">
              <h1>Discover Unique NFTs</h1>
              <p>Explore, collect, and trade extraordinary NFTs on our marketplace</p>
            </section>

            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Search NFTs, collections, and creators..."
              />
            </div>

            <div className="marketplace-grid">
              {sampleNFTs.map(nft => (
                <NFTCard key={nft.id} nft={nft} />
              ))}
            </div>
          </main>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
