import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { audioData } from '../data/libraryData';
import './AudioLibrary.css';

function AudioLibrary() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const languages = [
    { name: 'Odia', icon: '🕉️', color: '#ff6b6b', displayName: 'ଓଡ଼ିଆ', image: '/icons/odia-card.jpg' },
    { name: 'Hindi', icon: '🙏', color: '#4ecdc4', displayName: 'हिंदी', image: '/icons/hindi-card.jpg' },
    { name: 'English', icon: '📖', color: '#45b7d1', displayName: 'English', image: '/icons/english-card.jpg' }
  ];

  const filteredPlaylists = selectedLanguage
    ? audioData.filter(playlist => 
        playlist.language === selectedLanguage &&
        playlist.playlistName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const getPlaylistCount = (language) => {
    return audioData.filter(p => p.language === language).length;
  };

  return (
    <div className="audio-library-container">
      <div className="library-header">
        {selectedLanguage && (
          <button onClick={() => setSelectedLanguage(null)} className="back-to-languages">
            ← Back to Languages
          </button>
        )}
        <h1>{selectedLanguage ? `${selectedLanguage} Audio Lectures` : 'Audio Lectures'}</h1>
        <p>{selectedLanguage ? `Browse ${selectedLanguage} spiritual lectures with transcriptions` : 'Listen to spiritual lectures organized by language with transcriptions'}</p>
      </div>

      {!selectedLanguage ? (
        <div className="language-categories">
          {languages.map(lang => (
            <div
              key={lang.name}
              className="language-card"
              onClick={() => setSelectedLanguage(lang.name)}
              style={{ 
                borderTop: `4px solid ${lang.color}`,
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${lang.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="playlist-count-badge">{getPlaylistCount(lang.name)}</div>
              <div className="language-card-content">
                <h2>{lang.displayName}</h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="search-container">
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search playlists by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {filteredPlaylists.length > 0 ? (
            <div className="playlists-grid">
              {filteredPlaylists.map(playlist => (
                <Link key={playlist.id} to={`/audio/${playlist.id}`} className="playlist-card-link">
                  <div className="playlist-card">
                    <div className="playlist-thumbnail">
                      <div className="thumbnail-overlay">
                        <span className="audio-count">{playlist.audios.length} Lectures</span>
                      </div>
                      {playlist.icon && playlist.icon.startsWith('/') ? (
                        <img src={playlist.icon} alt={playlist.playlistName} className="playlist-icon-img" />
                      ) : (
                        <span className="playlist-icon-emoji">{playlist.icon || '🎵'}</span>
                      )}
                    </div>
                    <div className="playlist-content">
                      <h3>{playlist.playlistName}</h3>
                      <p className="playlist-description">{playlist.description}</p>
                      {playlist.location && (
                        <p className="playlist-location">
                          📍 {playlist.location}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="no-playlists">
              <p>No audio playlists available in {selectedLanguage} yet.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AudioLibrary;
