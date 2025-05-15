import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">DRDO Laboratory Directory</h3>
            <p className="text-gray-400">
              A comprehensive directory of Defence Research and Development Organisation laboratories and their employees.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.drdo.gov.in/labs-and-establishments" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  Official DRDO Website
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">
              Director<br />
              DESIDOC, DRDO<br />
              Metcalfe House,<br />
              New Delhi-110054<br />
              Tele: 011-23902403/2466
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {currentYear} DRDO Laboratory Directory. This is a demo application.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer