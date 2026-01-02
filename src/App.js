import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import AudioLibrary from './components/AudioLibrary';
import VideoLibrary from './components/VideoLibrary';
import AudioDetail from './components/AudioDetail';
import VideoPlaylist from './components/VideoPlaylist';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <h1>Vāṇī Saṃpuṭa</h1>
            <nav className="main-nav">
              <Link to="/">Home</Link>
              <Link to="/audio">Audio Lectures</Link>
              <Link to="/video">Video Playlists</Link>
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
