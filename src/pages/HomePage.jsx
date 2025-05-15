import { useState } from 'react'
import { Link } from 'react-router-dom'
import labs from '../data/labsData'

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredLabs = labs.filter(lab => 
    lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.city.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div className="container mx-auto px-4 py-10">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          DRDO Laboratories Directory
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore India's premier defence research laboratories and their specialized teams working on cutting-edge technologies
        </p>
        
        <div className="mt-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search labs by name or city..."
              className="w-full input px-4 py-3 pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
        </div>
      </section>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredLabs.length > 0 ? (
          filteredLabs.map(lab => (
            <Link 
              to={`/lab/${lab.id}`} 
              key={lab.id} 
              className="card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={lab.image} 
                  alt={lab.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">{lab.name}</h2>
                <p className="text-gray-500 mb-2">{lab.city}</p>
                <p className="text-gray-700 mb-4 line-clamp-2">{lab.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Director: {lab.head}</span>
                  <span className="text-sm font-medium text-[var(--primary-600)]">View Details</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <h3 className="text-xl font-medium text-gray-700">No laboratories found matching "{searchTerm}"</h3>
            <p className="mt-2 text-gray-500">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage