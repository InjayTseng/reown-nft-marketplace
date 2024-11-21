import React from 'react'
import { ConnectButton } from './ConnectButton'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Marketplace</h1>
      </div>
      <div className="navbar-menu">
        <a href="/">Explore</a>
        <a href="/collections">Collections</a>
        <a href="/create">Create</a>
        <ConnectButton />
      </div>
    </nav>
  )
}

export default Navbar 