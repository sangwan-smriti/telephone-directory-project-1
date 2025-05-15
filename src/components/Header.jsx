import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import labs from '../data/labsData'
import allEmployees from '../data/employeesData'

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])

  const downloadAllData = () => {
    const doc = new jsPDF()
    
    // Title
    doc.setFontSize(20)
    doc.text('DRDO Laboratory Directory', 14, 20)
    
    // Date
    doc.setFontSize(10)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30)
    
    // Labs Table
    doc.setFontSize(16)
    doc.text('Laboratories', 14, 40)
    
    const labsTableColumns = ['Name', 'City', 'Head', 'Phone']
    const labsTableRows = labs.map(lab => [
      lab.name,
      lab.city,
      lab.head,
      lab.phone
    ])
    
    doc.autoTable({
      head: [labsTableColumns],
      body: labsTableRows,
      startY: 45,
      theme: 'grid',
      styles: { fontSize: 8 },
      headerStyles: { fillColor: [0, 115, 230] }
    })
    
    // Employees Table (start on new page)
    doc.addPage()
    doc.setFontSize(16)
    doc.text('All Employees', 14, 20)
    
    const employeesTableColumns = ['Name', 'Lab', 'Designation', 'City', 'Service Period']
    const employeesTableRows = allEmployees.map(employee => [
      employee.name,
      labs.find(lab => lab.id === employee.labId)?.name || '',
      employee.designation,
      employee.city,
      employee.servicePeriod
    ])
    
    doc.autoTable({
      head: [employeesTableColumns],
      body: employeesTableRows,
      startY: 25,
      theme: 'grid',
      styles: { fontSize: 8 },
      headerStyles: { fillColor: [0, 115, 230] }
    })
    
    doc.save('DRDO_Directory.pdf')
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img 
              src="https://raw.githubusercontent.com/DRDO/DRDO/main/drdo_logo.png" 
              alt="DRDO Logo" 
              className="h-16 w-16"
            />
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-[var(--primary-600)] font-bold text-2xl">DRDO</span>
              <span className="text-gray-700 font-medium hidden sm:inline">Laboratory Directory</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6">
            <button
              onClick={downloadAllData}
              className="btn btn-primary"
            >
              Download PDF
            </button>
            <Link to="/" className="text-gray-800 hover:text-[var(--primary-600)] font-medium">
              Home
            </Link>
            <a 
              href="https://www.drdo.gov.in/labs-and-establishments" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-[var(--primary-600)] font-medium"
            >
              Official DRDO
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header