import { useState } from 'react'
import './App.css'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const tourSpots = [
    {
      name: "Kingdom Centre Tower",
      duration: "2 hours",
      description: "One of Riyadh's most iconic landmarks. Visit the Sky Bridge for panoramic city views.",
      bestTime: "4:00 PM - 6:00 PM",
      image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800",
      category: "expensive",
      price: "150 SAR"
    },
    {
      name: "Diriyah",
      duration: "3 hours",
      description: "UNESCO World Heritage site featuring mud-brick architecture and the historic At-Turaif district.",
      bestTime: "9:00 AM - 12:00 PM",
      image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800",
      category: "moderate",
      price: "50 SAR"
    },
    {
      name: "National Museum",
      duration: "2.5 hours",
      description: "Explore Saudi Arabia's rich history through interactive exhibits and artifacts.",
      bestTime: "1:00 PM - 3:30 PM",
      image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800",
      category: "free",
      price: "Free"
    },
    {
      name: "Al-Masmak Fortress",
      duration: "1.5 hours",
      description: "Historic clay and mud-brick fortress representing the city's capture by King Abdul Aziz.",
      bestTime: "10:00 AM - 11:30 AM",
      image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800",
      category: "free",
      price: "Free"
    }
  ]

  const categories = [
    { id: 'all', label: 'All Places' },
    { id: 'free', label: 'Free' },
    { id: 'moderate', label: 'Moderate (20-100 SAR)' },
    { id: 'expensive', label: 'Expensive (100+ SAR)' }
  ]

  const filteredSpots = selectedCategory === 'all' 
    ? tourSpots 
    : tourSpots.filter(spot => spot.category === selectedCategory)

  return (
    <div className="container">
      <header>
        <h1>Riyadh Day Tour Guide</h1>
        <p className="subtitle">Explore the best attractions in Saudi Arabia's capital</p>
      </header>

      <div className="categories">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="tour-grid">
        {filteredSpots.map((spot, index) => (
          <div key={index} className="tour-card">
            <img src={spot.image} alt={spot.name} className="spot-image" />
            <div className="spot-info">
              <h2>{spot.name}</h2>
              <div className="price-tag">{spot.price}</div>
              <p className="duration">🕒 Duration: {spot.duration}</p>
              <p className="best-time">⏰ Best Time: {spot.bestTime}</p>
              <p className="description">{spot.description}</p>
            </div>
          </div>
        ))}
      </div>

      <footer>
        <p>Plan your perfect day in Riyadh with our curated tour guide</p>
      </footer>
    </div>
  )
}

export default App
