import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { audioData } from '../data/libraryData';
import './AudioLibrary.css';

function AudioLibrary() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryToAdd, setCategoryToAdd] = useState('');

  const categories = [
    'Bhagvad Gita',
    'Bhakti-rasamrta-sindhu',
    'Chaitanya-Charitamrita',
    'Srimad Bhagavatam',
    'Vaisnava Songs',
    'Festival Lecture',
    'Initiation Ceremony'
  ];

  const normalizeCategory = (value) =>
    String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');

  const playlistMatchesCategory = (playlist, category) => {
    if (!category) return true;

    const wanted = normalizeCategory(category);
    const raw = playlist?.category;
    const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
    return list.some((c) => normalizeCategory(c) === wanted);
  };

  const playlistMatchesCategories = (playlist, categoriesToMatch) => {
    if (!categoriesToMatch?.length) return true;
    return categoriesToMatch.some((c) => playlistMatchesCategory(playlist, c));
  };

  const languages = [
    { name: 'Odia', icon: '🕉️', color: '#ff6b6b', displayName: 'ଓଡ଼ିଆ', image: '/icons/odia-card.jpg' },
    { name: 'Hindi', icon: '🙏', color: '#4ecdc4', displayName: 'हिंदी', image: '/icons/hindi-card.jpg' },
    { name: 'English', icon: '📖', color: '#45b7d1', displayName: 'English', image: '/icons/english-card.jpg' }
  ];

  const filteredPlaylists = selectedLanguage
    ? audioData.filter((playlist) =>
        playlist.language === selectedLanguage &&
        playlist.playlistName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        playlistMatchesCategories(playlist, selectedCategories)
      )
    : [];

  const addCategory = (category) => {
    if (!category) return;
    setSelectedCategories((prev) => (prev.includes(category) ? prev : [...prev, category]));
  };

  const removeCategory = (category) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  const getPlaylistCount = (language) => {
    return audioData.filter(p => p.language === language).length;
  };

  return (
    <div className="audio-library-container">
      <div className={`library-header${selectedLanguage ? ' has-back' : ''}`}>
        {selectedLanguage && (
          <button onClick={() => setSelectedLanguage(null)} className="back-to-languages">
            <span className="back-arrow">←</span>
            <span className="back-text">Back to Languages</span>
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
              onClick={() => {
                setSelectedLanguage(lang.name);
                setSearchTerm('');
                setSelectedCategories([]);
                setCategoryToAdd('');
              }}
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

            <div className="category-filter">
              <select
                className="category-select"
                value={categoryToAdd}
                onChange={(e) => {
                  const next = e.target.value;
                  addCategory(next);
                  setCategoryToAdd('');
                }}
                aria-label="Add category filter"
              >
                <option value="">Add Category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              {selectedCategories.length > 0 && (
                <div className="category-chips" aria-label="Selected categories">
                  {selectedCategories.map((c) => (
                    <span key={c} className="category-chip">
                      {c}
                      <button
                        type="button"
                        className="chip-remove"
                        onClick={() => removeCategory(c)}
                        aria-label={`Remove ${c}`}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
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
