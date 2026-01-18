import { useState, useEffect } from 'react';
import { Download, MapPin, Shield, Star, Instagram, Facebook, Twitter, Zap, Home, Briefcase, Store } from 'lucide-react';
import { AppShowcase } from './components/AppShowcase';
import './components/AppShowcase.css';
import './App.css';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <div className="logo-icon">
              <img src="/logo.png" alt="LocalFix Logo" style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
            </div>
            <span className="logo-text">LocalFix™</span>
          </div>
          <button className="mobile-menu-btn" aria-label="Menu">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <nav className="nav">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it Works</a>
            <a href="#" className="btn btn-outline-sm">Join as Provider</a>
            <a href="/book" className="btn btn-primary">
              <Zap size={18} />
              Instant Booking
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div
            className="hero-text"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <h1>India’s #1 App for <span className="highlight">Home & Business</span></h1>
            <p>One stop solution for all your residential and commercial maintenance needs. Trusted professionals, instant booking.</p>

            <div className="sector-icons">
              <div className="sector-item" title="Home">
                <Home size={24} />
              </div>
              <div className="sector-item" title="Office">
                <Briefcase size={24} />
              </div>
              <div className="sector-item" title="Store">
                <Store size={24} />
              </div>
            </div>

            <div className="hero-btns">
              <button className="btn btn-primary">
                <Download size={20} />
                Download App
              </button>
            </div>
          </div>
          <div
            className="hero-image"
            style={{
              transform: `translateY(${scrollY * -0.2}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Phone Mockup with Scrolling Screens */}
            <div className="phone-mockup">
              <div className="screen">
                <img src="/screen-home.png" alt="LocalFix App Home" className="app-screen-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <span className="badge">Features</span>
            <h2 className="section-title">Why Choose LocalFix?</h2>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="icon-box">
                <Shield size={32} color="var(--primary)" />
              </div>
              <h3>Verified Pros</h3>
              <p>Every provider is vetted and background checked for your safety and peace of mind.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box">
                <MapPin size={32} color="var(--primary)" />
              </div>
              <h3>Local Talent</h3>
              <p>Support your community by hiring skilled neighbors near you for quick assistance.</p>
            </div>
            <div className="feature-card">
              <div className="icon-box">
                <Star size={32} color="var(--primary)" />
              </div>
              <h3>Top Rated</h3>
              <p>See real reviews and ratings before you book to ensure quality service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="badge">Workflow</span>
            <h2 className="section-title">How it Works</h2>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3>Choose a Service</h3>
              <p>Select from a wide range of services offered by local professionals.</p>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <h3>Book Instantly</h3>
              <p>Schedule a time that works for you with upfront pricing.</p>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <h3>Relax & Pay</h3>
              <p>Get the job done and pay securely through the app.</p>
            </div>
          </div>
        </div>
      </section>

      {/* App Showcase (Scrollytelling) */}
      <AppShowcase />

      {/* Stats / Trust */}
      <section className="stats-section">
        <div className="container">
          <div className="stat-item">
            <div className="stat-number">5k+</div>
            <div className="stat-label">Active Providers</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">20k+</div>
            <div className="stat-label">Jobs Completed</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">4.8</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-col brand-col">
            <div className="logo">
              <div className="logo-icon">
                <img src="/logo.png" alt="LocalFix Logo" style={{ width: '29px', height: '29px', objectFit: 'contain' }} />
              </div>
              <span className="logo-text">LocalFix™</span>
            </div>
            <p>Connecting you with the best local professionals for all your home service needs.</p>
          </div>

          <div className="footer-col company-col">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
            <a href="mailto:contact@localfix.app">Contact</a>
          </div>

          <div className="footer-col services-col">
            <h4>Services</h4>
            <a href="#">Plumbing</a>
            <a href="#">Electrical</a>
            <a href="#">Cleaning</a>
            <a href="#">Painting</a>
          </div>

          <div className="footer-col professionals-col">
            <h4>For Professionals</h4>
            <p>Grow your business with LocalFix.</p>
            <a href="#" className="btn btn-primary footer-btn">
              Download Provider App
            </a>
          </div>

          <div className="footer-col support-col">
            <h4>Need Help?</h4>
            <p>We are here for you 24/7.</p>
            <a href="mailto:support@localfix.app">support@localfix.app</a>
          </div>

        </div>
        <div className="container footer-bottom">
          <p>&copy; 2026 LocalFix. All rights reserved.</p>
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={20} />
            </a>
          </div>
          <div className="footer-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
