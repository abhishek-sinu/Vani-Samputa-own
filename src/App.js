import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import AudioLibrary from './components/AudioLibrary';
import VideoLibrary from './components/VideoLibrary';
import AudioDetail from './components/AudioDetail';
import VideoPlaylist from './components/VideoPlaylist';
import Admin from './components/Admin';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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
                <img src="/logo.png" alt="Vāṇī Saṃpuṭa Logo" className="site-logo" />
              </div>
              <h1>Vāṇī Saṃpuṭa</h1>
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
