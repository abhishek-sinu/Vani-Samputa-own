import React from 'react';
import { Link } from 'react-router-dom';
import { audioData, videoData, cryingSchoolVideoData } from '../data/libraryData';
import './Home.css';

const DAILY_QUOTES = [
  {
    language: 'English',
    title: 'Daily Quote',
    text: 'With loving devotion, one can serve the Guru and Krishna (seva). When this deep love and affection is present, bhajan is performed; otherwise, whatever else one does is simply activity (karma).',
  },
  {
    language: 'हिंदी',
    title: 'आज का उद्धरण',
    text: 'ममता से गुरु- कृष्ण की सेवा होती हैं; ममता से भजन होता है, नहीं तो वह कर्म हो जाता है।',
  },
  {
    language: 'ଓଡ଼ିଆ',
    title: 'ଆଜିର ଉଦ୍ଧୃତି',
    text: 'ମମତାରେ ଗୁରୁ, କୃଷ୍ଣଙ୍କର ସେବା ହୁଏ, ମମତା ଭାବ ଥିଲେ ଭଜନ ହୁଏ ଅନ୍ୟଥା ଯାହା କିଛି କରିବା ସେସବୁ କର୍ମ।',
  },
  {
    language: 'বাংলা',
    title: 'আজকের উক্তি',
    text: 'ভক্তি ও প্রেম দিয়ে গুরু ও কৃষ্ণের সেবা করা যায়। যখন এই গভীর প্রেম ও স্নেহ থাকে, তখন ভজন হয়; অন্যথায় যা কিছু করা হয় তা শুধু কর্ম।',
  },
];

const daySeed = () => Math.floor(Date.now() / 86400000);

function Home() {
  const [quoteIndex, setQuoteIndex] = React.useState(() => daySeed() % DAILY_QUOTES.length);
  const [visitorStats, setVisitorStats] = React.useState({ count: 0, lastVisit: null });

  const { audioLectureCount, videoLectureCount, transcriptionCount } = React.useMemo(() => {
    const safeArray = (value) => (Array.isArray(value) ? value : []);

    const audioPlaylists = safeArray(audioData);
    const videoPlaylists = safeArray(videoData);
    const cryingSchoolPlaylists = safeArray(cryingSchoolVideoData);

    const allAudios = audioPlaylists.flatMap((p) => safeArray(p?.audios));
    const allVideos = [...videoPlaylists, ...cryingSchoolPlaylists].flatMap((p) => safeArray(p?.videos));

    const isRealTranscription = (audio) => {
      if (!audio?.hasTranscription) return false;
      const text = String(audio?.transcription || '').trim();
      if (!text) return false;
      if (/^coming\s+soon\.?\.?\.?$/i.test(text)) return false;
      if (/^your\s+transcription\s+text\.?\.?\.?$/i.test(text)) return false;
      return true;
    };

    return {
      audioLectureCount: allAudios.length,
      videoLectureCount: allVideos.length,
      transcriptionCount: allAudios.filter(isRealTranscription).length
    };
  }, []);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % DAILY_QUOTES.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    let cancelled = false;

    const increment = async () => {
      const localKey = 'vani_samputa_visits_local';

      try {
        const response = await fetch('/api/visits', { method: 'POST' });
        if (!response.ok) throw new Error('bad response');
        const data = await response.json();
        if (cancelled) return;
        setVisitorStats({
          count: typeof data?.count === 'number' ? data.count : Number(data?.count || 0),
          lastVisit: data?.lastVisit || null
        });
      } catch {
        // Local dev fallback (CRA doesn't run Vercel /api functions)
        try {
          const raw = window.localStorage.getItem(localKey);
          const parsed = raw ? JSON.parse(raw) : null;
          const next = {
            count: Number(parsed?.count || 0) + 1,
            lastVisit: new Date().toISOString()
          };
          window.localStorage.setItem(localKey, JSON.stringify(next));
          if (!cancelled) setVisitorStats(next);
        } catch {
          // ignore
        }
      }
    };

    increment();
    return () => {
      cancelled = true;
    };
  }, []);

  const formatLastVisit = (isoString) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleString();
  };

  const withPlus = (value) => {
    const n = Number(value || 0);
    if (!Number.isFinite(n) || n <= 0) return '0';
    return `${n}+`;
  };

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
              Lectures given by <span className="guru-name"></span>
              <span className="guru-name">HH Haladhara Svāmī Mahārāja</span>
            </p>
          </div>
          <div className="guru-photo guru-photo-right">
            <img src="/icons/ssggs1.jpg" alt="Śrī Śrīmad Goura Govinda Svāmī Mahārāja" />
          </div>
        </div>
      </div>

      <div className="daily-quote-section" aria-label="Daily quote">
        <div className="daily-quote-card">
          <div className="daily-quote-inner">
            <div className="daily-quote-image">
              <img src="/RadhaMadhav.png" alt="Radha Madhava" />
            </div>

            <div className="daily-quote-content">
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

            <div className="daily-quote-image daily-quote-image-right">
              <img src="/icons/Gopal.jpg" alt="Jagannath" />
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
          and special festival lectures given by{' '}
          <span className="guru-name">HH Haladhara Svāmī Mahārāja</span>.
        </p>
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">{withPlus(audioLectureCount)}</div>
            <div className="stat-label">Audio Lectures</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{withPlus(videoLectureCount)}</div>
            <div className="stat-label">Video Lectures</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{withPlus(transcriptionCount)}</div>
            <div className="stat-label">Transcriptions</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{withPlus(visitorStats.count)}</div>
            <div className="stat-label">Visitors</div>
            {visitorStats.lastVisit && (
              <div className="stat-subtext">Latest: {formatLastVisit(visitorStats.lastVisit)}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
