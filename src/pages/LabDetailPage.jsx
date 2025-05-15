import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { FiMove } from 'react-icons/fi'
import labs from '../data/labsData'
import allEmployees from '../data/employeesData'

function LabDetailPage() {
  const { labId } = useParams()
  const navigate = useNavigate()
  
  const [lab, setLab] = useState(null)
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    designation: '',
    address: '',
    city: '',
    contact: '',
    joinDate: '',
  })
  
  // Search states
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState({
    name: '',
    designation: '',
    city: '',
    servicePeriod: ''
  })
  
  useEffect(() => {
    const id = parseInt(labId)
    const foundLab = labs.find(l => l.id === id)
    
    if (foundLab) {
      setLab(foundLab)
      const labEmployees = allEmployees.filter(e => e.labId === id)
      setEmployees(labEmployees)
    }
    
    setLoading(false)
  }, [labId])
  
  // Handle new employee submission
  const handleAddEmployee = (e) => {
    e.preventDefault()
    const currentDate = new Date()
    const joinDate = new Date(newEmployee.joinDate)
    const yearsOfService = Math.floor((currentDate - joinDate) / (1000 * 60 * 60 * 24 * 365))
    
    const newEmployeeData = {
      id: Math.max(...employees.map(e => e.id)) + 1,
      ...newEmployee,
      labId: parseInt(labId),
      servicePeriod: `${yearsOfService} years`,
      joinDate: joinDate.toLocaleDateString('en-GB')
    }
    
    setEmployees(prevEmployees => {
      const newEmployees = [...prevEmployees, newEmployeeData]
      return newEmployees.sort((a, b) => {
        const aYears = parseInt(a.servicePeriod)
        const bYears = parseInt(b.servicePeriod)
        return bYears - aYears
      })
    })
    
    setShowAddForm(false)
    setNewEmployee({
      name: '',
      designation: '',
      address: '',
      city: '',
      contact: '',
      joinDate: ''
    })
  }
  
  // Filter employees based on search terms
  const filteredEmployees = employees.filter(employee => {
    // Global search across all fields
    if (globalFilter) {
      const searchTerm = globalFilter.toLowerCase()
      const searchableString = Object.values(employee).join(' ').toLowerCase()
      if (!searchableString.includes(searchTerm)) return false
    }
    
    // Column-specific filters
    for (const [key, value] of Object.entries(columnFilters)) {
      if (value && !employee[key].toLowerCase().includes(value.toLowerCase())) {
        return false
      }
    }
    
    return true
  })
  
  // Handle global filter change
  const handleGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value)
  }
  
  // Handle column filter change
  const handleColumnFilterChange = (column, value) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value
    }))
  }
  
  // Handle drag and drop
  const onDragEnd = (result) => {
    if (!result.destination) return
    
    const items = Array.from(employees)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    
    setEmployees(items)
  }
  
  // Generate PDF
  const exportToPDF = () => {
    const doc = new jsPDF()
    
    // Add title
    doc.setFontSize(18)
    doc.text(`${lab.name} - Employee Directory`, 14, 22)
    
    // Add metadata
    doc.setFontSize(11)
    doc.text(`Address: ${lab.address}`, 14, 30)
    doc.text(`Phone: ${lab.phone}`, 14, 36)
    doc.text(`Director: ${lab.head}`, 14, 42)
    doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, 14, 48)
    
    // Define the table
    const tableColumn = ["Name", "Designation", "City", "Contact", "Join Date", "Service Period"]
    const tableRows = filteredEmployees.map(employee => [
      employee.name,
      employee.designation,
      employee.city,
      employee.contact,
      employee.joinDate,
      employee.servicePeriod
    ])
    
    // Generate the table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      theme: 'grid',
      styles: {
        fontSize: 9,
        cellPadding: 3
      },
      headerStyles: {
        fillColor: [0, 115, 230]
      }
    })
    
    // Save the document
    doc.save(`${lab.name.replace(/\s+/g, '_')}_Employees.pdf`)
  }
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--primary-600)]"></div>
      </div>
    )
  }
  
  if (!lab) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Laboratory not found</h2>
        <p className="mb-6">The laboratory you are looking for does not exist or has been moved.</p>
        <button 
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          Return to Homepage
        </button>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Lab Header */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{lab.name}</h1>
            <p className="text-gray-600 mb-1">{lab.address}</p>
            <p className="text-gray-600 mb-1">Phone: {lab.phone}</p>
            <p className="text-gray-600">Director: {lab.head}</p>
          </div>
          <div className="mt-4 md:mt-0 space-x-4">
            <button 
              onClick={() => setShowAddForm(true)}
              className="btn btn-secondary"
            >
              Add Employee
            </button>
            <button 
              onClick={exportToPDF}
              className="btn btn-primary"
            >
              Export to PDF
            </button>
          </div>
        </div>
        <p className="mt-4 text-gray-700">{lab.description}</p>
      </div>
      
      {/* Add Employee Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4">Add New Employee</h2>
            <form onSubmit={handleAddEmployee}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="input w-full"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    required
                    className="input w-full"
                    value={newEmployee.designation}
                    onChange={(e) => setNewEmployee({...newEmployee, designation: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    className="input w-full"
                    value={newEmployee.address}
                    onChange={(e) => setNewEmployee({...newEmployee, address: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    className="input w-full"
                    value={newEmployee.city}
                    onChange={(e) => setNewEmployee({...newEmployee, city: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact
                  </label>
                  <input
                    type="text"
                    required
                    className="input w-full"
                    value={newEmployee.contact}
                    onChange={(e) => setNewEmployee({...newEmployee, contact: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Join Date
                  </label>
                  <input
                    type="date"
                    required
                    className="input w-full"
                    value={newEmployee.joinDate}
                    onChange={(e) => setNewEmployee({...newEmployee, joinDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Search Controls */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Employee Directory</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Global Search
          </label>
          <input
            type="text"
            placeholder="Search across all fields..."
            className="input w-full"
            value={globalFilter}
            onChange={handleGlobalFilterChange}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Filter by name..."
              className="input w-full"
              value={columnFilters.name}
              onChange={(e) => handleColumnFilterChange('name', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Designation
            </label>
            <input
              type="text"
              placeholder="Filter by designation..."
              className="input w-full"
              value={columnFilters.designation}
              onChange={(e) => handleColumnFilterChange('designation', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              placeholder="Filter by city..."
              className="input w-full"
              value={columnFilters.city}
              onChange={(e) => handleColumnFilterChange('city', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Period
            </label>
            <input
              type="text"
              placeholder="Filter by service period..."
              className="input w-full"
              value={columnFilters.servicePeriod}
              onChange={(e) => handleColumnFilterChange('servicePeriod', e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Employee Table */}
      <div className="bg-white shadow-md rounded-xl p-6 overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            {filteredEmployees.length} {filteredEmployees.length === 1 ? 'employee' : 'employees'} found
          </p>
          <p className="text-sm text-gray-500 italic">Drag and drop rows to reorder</p>
        </div>
        
        <div className="table-container">
          {filteredEmployees.length > 0 ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="w-10"></th>
                    <th className="w-10">#</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Contact</th>
                    <th>Join Date</th>
                    <th>Service Period</th>
                  </tr>
                </thead>
                <Droppable droppableId="employees">
                  {(provided) => (
                    <tbody
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {filteredEmployees.map((employee, index) => (
                        <Draggable 
                          key={employee.id.toString()} 
                          draggableId={employee.id.toString()} 
                          index={index}
                        >
                          {(provided) => (
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="hover:bg-gray-50"
                            >
                              <td {...provided.dragHandleProps} className="cursor-move">
                                <FiMove className="text-gray-400" />
                              </td>
                              <td className="font-medium">{index + 1}</td>
                              <td>{employee.name}</td>
                              <td>{employee.designation}</td>
                              <td>{employee.address}</td>
                              <td>{employee.city}</td>
                              <td>{employee.contact}</td>
                              <td>{employee.joinDate}</td>
                              <td>{employee.servicePeriod}</td>
                            </tr>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </tbody>
                  )}
                </Droppable>
              </table>
            </DragDropContext>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No employees match your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LabDetailPage