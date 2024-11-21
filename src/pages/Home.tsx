import { useState, useEffect } from 'react'
import { CollectionCard } from '../components/CollectionCard'
import { fetchHotCollections, Collection } from '../services/api'

function Home() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [period, setPeriod] = useState('today')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCollections = async () => {
      try {
        setLoading(true)
        const data = await fetchHotCollections(period)
        setCollections(data)
      } catch (error) {
        console.error('Error loading collections:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCollections()
  }, [period])

  const timeFilters = [
    { id: 'today', label: '24H' },
    { id: '7days', label: '7D' },
    { id: '30days', label: '30D' },
    { id: 'alldays', label: 'All Time' }
  ]

  return (
    <div className="home">
      <div className="header">
      </div>

      <div className="time-filter">
        {timeFilters.map(({ id, label }) => (
          <button
            key={id}
            className={period === id ? 'active' : ''}
            onClick={() => setPeriod(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">Loading collections...</div>
      ) : (
        <div className="collections-grid">
          {collections.map(collection => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              onClick={() => console.log('Collection clicked:', collection.slug)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home 