import React from 'react'

function NFTCard({ nft }) {
  return (
    <div className="nft-card">
      <img src={nft.image} alt={nft.name} />
      <div className="nft-info">
        <h3>{nft.name}</h3>
        <p>{nft.collection}</p>
        <div className="price-info">
          <span>{nft.price} ETH</span>
          <button className="buy-button">Buy Now</button>
        </div>
      </div>
    </div>
  )
}

export default NFTCard 