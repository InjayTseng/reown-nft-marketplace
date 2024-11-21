import React from 'react'

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
        <appkit-button />
      </div>
    </nav>
  )
}

export default Navbar 