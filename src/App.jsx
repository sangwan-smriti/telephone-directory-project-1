import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LabDetailPage from './pages/LabDetailPage'
import Header from './components/Header'
import Footer from './components/Footer'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lab/:labId" element={<LabDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App