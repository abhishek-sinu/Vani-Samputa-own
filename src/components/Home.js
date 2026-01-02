import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Vāṇī Saṃpuṭa</h1>
        <p className="hero-subtitle">
          Access spiritual lectures with transcriptions and organized video playlists
        </p>
      </div>

      <div className="features-grid">
        <Link to="/audio" className="feature-card-link">
          <div className="feature-card">
            <div className="feature-icon">🎵</div>
            <h2>Audio Lectures</h2>
            <p>
              Browse our extensive collection of audio lectures organized by category. 
              Many lectures include detailed transcriptions for easy reference and study.
            </p>
          </div>
        </Link>

        <Link to="/video" className="feature-card-link">
          <div className="feature-card">
            <div className="feature-icon">📹</div>
            <h2>Video Playlists</h2>
            <p>
              Watch organized video playlists on various topics. All videos are linked 
              to YouTube for seamless viewing experience.
            </p>
          </div>
        </Link>

        <div className="feature-card feature-card-disabled">
          <div className="feature-icon">📝</div>
          <h2>Transcriptions</h2>
          <p>
            Read along with audio lectures using our detailed transcriptions. 
            Perfect for study and reference.
          </p>
          <div className="feature-link-disabled">
            Available with audio lectures
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>About This Library</h2>
        <p>
          This platform provides access to spiritual knowledge through audio and video formats. 
          Our collection includes lectures on Bhagavad Gita, Srimad Bhagavatam, morning walk 
          conversations, and special festival lectures.
        </p>
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Audio Lectures</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">30+</div>
            <div className="stat-label">Video Playlists</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100+</div>
            <div className="stat-label">Transcriptions</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
