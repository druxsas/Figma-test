import React from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Action from './components/Action'
import Carousel from './components/Carousel'
import Facilities from './components/Facilities'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import BackToTopButton from './components/BackToTopButton'
import './App.css'

function App() {

  return (
    <div className="app-wrapper">
      {/* Navigation bar from Figma design */}
      <NavBar />
      
      {/* Hero section */}
      <Hero />
      
      {/* Action section */}
      <Action />
      
      {/* Carousel section */}
      <Carousel />
      
      {/* Facilities section */}
      <Facilities />
      
      {/* Contact Form section */}
      <ContactForm />
      
      {/* Footer section */}
      <Footer />
      
      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  )
}

export default App
