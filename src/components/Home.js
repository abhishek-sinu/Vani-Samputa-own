import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const DAILY_QUOTES = [
  {
    language: 'English',
    title: 'Daily Quote',
    text: 'Chant the holy name and be happy.',
  },
  {
    language: 'हिंदी',
    title: 'आज का उद्धरण',
    text: 'हरे नाम का जप करें और प्रसन्न रहें।',
  },
  {
    language: 'ଓଡ଼ିଆ',
    title: 'ଆଜିର ଉଦ୍ଧୃତି',
    text: 'ହରିନାମ ଜପ କରନ୍ତୁ ଏବଂ ସୁଖୀ ରୁହନ୍ତୁ।',
  },
  {
    language: 'বাংলা',
    title: 'আজকের উক্তি',
    text: 'হরিনাম জপ করুন এবং সুখী থাকুন।',
  },
];

const daySeed = () => Math.floor(Date.now() / 86400000);

function Home() {
  const [quoteIndex, setQuoteIndex] = React.useState(() => daySeed() % DAILY_QUOTES.length);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % DAILY_QUOTES.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <div className="guru-photo">
            <img src="/icons/hindi-card.jpg" alt="HH Haladhara Svāmī Mahārāja" />
          </div>
          <div className="hero-text">
            <h1>Welcome to Vāṇī Saṃpuṭa</h1>
            <p className="hero-subtitle">
              Access spiritual lectures with transcriptions and organized video playlists
            </p>
            <p className="hero-author">
              Lectures given by HH Haladhara Svāmī Mahārāja
            </p>
          </div>
          <div className="radha-madhava-image">
            <img src="/RadhaMadhav.png" alt="Radha Madhava" />
          </div>
        </div>
      </div>

      <div className="daily-quote-section" aria-label="Daily quote">
        <div className="daily-quote-card">
          <div className="daily-quote-label">Daily Quote</div>

          <div className="daily-quote-viewport">
            <div
              className="daily-quote-track"
              style={{ transform: `translateX(-${quoteIndex * 100}%)` }}
            >
              {DAILY_QUOTES.map((quote) => (
                <div
                  key={`${quote.language}-${quote.title}`}
                  className="daily-quote-slide"
                  aria-label={`${quote.title} (${quote.language})`}
                >
                  <div className="daily-quote-meta">
                    <span className="daily-quote-title">{quote.title}</span>
                    <span className="daily-quote-language">{quote.language}</span>
                  </div>
                  <div className="daily-quote-text">“{quote.text}”</div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
            <div className="feature-icon">▶️</div>
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
          Our collection includes lectures on Bhagavad Gita, Srimad Bhagavatam, conversations, 
          and special festival lectures.
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
