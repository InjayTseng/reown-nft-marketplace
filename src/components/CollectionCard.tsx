import { Collection, formatNumber, formatImageUrl } from '../services/api'

interface Props {
  collection: Collection
  onClick: () => void
}

export function CollectionCard({ collection, onClick }: Props) {
  return (
    <div className="collection-card" onClick={onClick}>
      <div className="image-container">
        <img 
          src={formatImageUrl(collection.logoImageUrl)}
          alt={collection.name}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = '/placeholder.svg'
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