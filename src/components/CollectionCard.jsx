import React from 'react'
import { formatNumber, formatImageUrl } from '../services/api'

const CollectionCard = ({ collection, onClick }) => {
  return (
    <div className="collection-card" onClick={onClick}>
      <div className="image-container">
        <img 
          src={formatImageUrl(collection.logoImageUrl)}
          alt={collection.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder.png';
          }}
        />
      </div>
      <div className="collection-details">
        <h3>{collection.name || 'Unnamed Collection'}</h3>
        <p>Chain: {collection.chainShortName.toUpperCase()}</p>
        <p className="volume">Volume: ${formatNumber(collection.totalVolume)}</p>
        <p>Trades: {collection.totalTradingCount}</p>
      </div>
    </div>
  )
}

export default CollectionCard 