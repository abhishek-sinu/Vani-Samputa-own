import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import './App.css';
import Home from './components/Home';
import AudioLibrary from './components/AudioLibrary';
import VideoLibrary from './components/VideoLibrary';
import AudioDetail from './components/AudioDetail';
import VideoPlaylist from './components/VideoPlaylist';
import Admin from './components/Admin';
import Live from './components/Live';
import CryingSchoolLibrary from './components/CryingSchoolLibrary';
import CryingSchoolPlaylist from './components/CryingSchoolPlaylist';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const Router = Capacitor.isNativePlatform() ? HashRouter : BrowserRouter;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <Link to="/" className="header-branding">
              <div className="logo-circle">
                <img src="/logo-vs.png" alt="Vāṇī Saṃpuṭa Logo" className="site-logo" />
              </div>
              <div className="brand-text">
                <h1>Vāṇī Saṃpuṭa</h1>
                <div className="header-subtitle">HH Haladhara Svāmī Mahārāja</div>
              </div>
            </Link>
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
              <span className={mobileMenuOpen ? "hamburger open" : "hamburger"}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            <nav className={mobileMenuOpen ? "main-nav mobile-open" : "main-nav"}>
              <Link to="/" onClick={closeMobileMenu}>Home</Link>
              <Link to="/audio" onClick={closeMobileMenu}>Audio Lectures</Link>
              <Link to="/video" onClick={closeMobileMenu}>Video Playlists</Link>
              <Link to="/crying-school" onClick={closeMobileMenu}>Crying School Videos</Link>
              <Link to="/live" onClick={closeMobileMenu}>Live</Link>
            </nav>
          </div>
        </header>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/audio" element={<AudioLibrary />} />
            <Route path="/audio/:id" element={<AudioDetail />} />
            <Route path="/video" element={<VideoLibrary />} />
            <Route path="/video/:playlistId" element={<VideoPlaylist />} />
            <Route path="/crying-school" element={<CryingSchoolLibrary />} />
            <Route path="/crying-school/:playlistId" element={<CryingSchoolPlaylist />} />
            <Route path="/live" element={<Live />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>&copy; 2026 Vāṇī Saṃpuṭa. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
