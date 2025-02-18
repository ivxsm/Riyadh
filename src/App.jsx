import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSpot, setSelectedSpot] = useState(null)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate')
        } else {
          entry.target.classList.remove('animate')
        }
      })
    }, {
      threshold: [0, 0.5],
      rootMargin: '-50% 0px'
    })

    const timelineCards = document.querySelectorAll('.timeline-card')
    timelineCards.forEach(card => observer.observe(card))

    return () => observer.disconnect()
  }, [selectedCategory])

  const tourSpots = [
    {
      time: "09:00 AM",
      name: "Diriyah",
      duration: "3 hours",
      description: "Start your day at this UNESCO World Heritage site featuring mud-brick architecture and the historic At-Turaif district.",
      bestTime: "Early Morning",
      image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800",
      category: "moderate",
      price: "50 SAR"
    },
    {
      time: "12:30 PM",
      name: "Al-Masmak Fortress",
      duration: "1.5 hours",
      description: "Visit this historic clay and mud-brick fortress during the cooler lunch hours.",
      bestTime: "Midday",
      image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800",
      category: "free",
      price: "Free"
    },
    {
      time: "02:30 PM",
      name: "National Museum",
      duration: "2.5 hours",
      description: "Spend your afternoon exploring Saudi Arabia's rich history through interactive exhibits and artifacts.",
      bestTime: "Afternoon",
      image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800",
      category: "free",
      price: "Free"
    },
    {
      time: "05:30 PM",
      name: "Kingdom Centre Tower",
      duration: "2 hours",
      description: "End your day with stunning sunset views from the Sky Bridge at one of Riyadh's most iconic landmarks.",
      bestTime: "Sunset",
      image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800",
      category: "expensive",
      price: "150 SAR"
    }
  ]

  const categories = [
    { id: 'all', label: 'Full Day Tour' },
    { id: 'free', label: 'Free Activities' },
    { id: 'moderate', label: 'Moderate (20-100 SAR)' },
    { id: 'expensive', label: 'Premium (100+ SAR)' }
  ]

  const filteredSpots = selectedCategory === 'all' 
    ? tourSpots 
    : tourSpots.filter(spot => spot.category === selectedCategory)

  const handleCardClick = (spot) => {
    setSelectedSpot(spot)
    setIsClosing(false)
  }

  const closeModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setSelectedSpot(null)
      setIsClosing(false)
    }, 300) // Match this with animation duration
  }

  return (
    <div className="container">
      <header>
        <h1>Riyadh Tour Guide</h1>
        <p className="subtitle">A perfect day exploring Saudi Arabia's capital</p>
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

      <div className="timeline">
        {filteredSpots.map((spot, index) => (
          <div key={index} className="timeline-card fade-in">
            <div className="time-marker slide-in">{spot.time}</div>
            <div className="tour-card slide-in" onClick={() => handleCardClick(spot)}>
              <img src={spot.image} alt={spot.name} className="spot-image" />
              <div className="spot-info">
                <h2>{spot.name}</h2>
                <div className="price-tag">{spot.price}</div>
                <p className="duration">🕒 Duration: {spot.duration}</p>
                <p className="best-time">⏰ Best Time: {spot.bestTime}</p>
                <p className="description">{spot.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedSpot && (
        <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={closeModal}>
          <div 
            className={`modal-content ${isClosing ? 'closing' : ''}`} 
            onClick={e => e.stopPropagation()}
          >
            <button className="close-button" onClick={closeModal}>×</button>
            <div className="modal-info">
              <h2>{selectedSpot.name}</h2>
              <p className="modal-time">🕒 {selectedSpot.time} ({selectedSpot.duration})</p>
              <p className="modal-price">{selectedSpot.price}</p>
              <p className="modal-description">{selectedSpot.description}</p>
              <div className="facilities">
                <div className="facility" data-tooltip="Free Parking">
                  <i className="fas fa-parking"></i>
                </div>
                <div className="facility" data-tooltip="Wheelchair Accessible">
                  <i className="fas fa-wheelchair"></i>
                </div>
                <div className="facility" data-tooltip="Restaurant Available">
                  <i className="fas fa-utensils"></i>
                </div>
                <div className="facility" data-tooltip="Gift Shop">
                  <i className="fas fa-shopping-bag"></i>
                </div>
                <div className="facility" data-tooltip="Free WiFi">
                  <i className="fas fa-wifi"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer>
        <p>Plan your perfect day in Riyadh with our curated tour guide</p>
      </footer>
    </div>
  )
}

export default App
