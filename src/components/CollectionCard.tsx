import { Collection } from '../services/api'

interface Props {
  collection: Collection
  onClick: () => void
}

// Internal format function
const formatNumber = (num: number): string => {
  if (!num) return '0'
  if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(2) + 'K'
  return num.toFixed(2)
}

export function CollectionCard({ collection, onClick }: Props) {
  return (
    <div className="collection-card" onClick={onClick}>
      <div className="image-container">
        <img 
          src={collection.logoImageUrl}
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