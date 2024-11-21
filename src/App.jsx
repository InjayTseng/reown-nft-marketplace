import React from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'
import { wagmiAdapter, queryClient } from './config/appkit'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import './App.css'
import NFTCard from './components/NFTCard.jsx'

function App() {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <Navbar />
          <main>
            <Home />
          </main>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
