import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnnouncementModal from './components/AnnouncementModal';
import './styles/global.css';

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Starting Popup / Announcement Modal */}
      <AnnouncementModal />

      {/* 1. Navbar Component */}
      <Navbar />

      {/* 2. Homepage Hero Section */}
      <Hero />

      {/* 3. About Us Section */}
      <About />

      {/* 4. Menu Section */}
      <Menu />

      {/* 5. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 6. Photo Gallery Section */}
      <Gallery />

      {/* 7. Contact Us Section */}
      <Contact />

      {/* 8. Footer Section */}
      <Footer />
    </div>
  );
}

export default App;
