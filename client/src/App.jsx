import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Platform from './components/Platform'
import AIDemo from './components/AIDemo'
import Results from './components/Results'
import Pricing from './components/Pricing'
import WhyUs from './components/WhyUs'
import Footer from './components/Footer'
import AppointmentsPage from './pages/AppointmentsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Header />
          <main>
            <Hero />
            <Platform />
            <AIDemo />
            <Results />
            <Pricing />
            <WhyUs />
          </main>
          <Footer />
        </>
      } />
      <Route path="/appointments" element={<AppointmentsPage />} />
    </Routes>
  )
}
