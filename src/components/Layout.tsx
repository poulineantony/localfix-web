import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import '../App.css';

interface LayoutProps {
    children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
    useEffect(() => {
        const handleScroll = () => {
            // Scroll handler for future use
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="app">
            {/* Header */}
            <header className="header">
                <div className="container header-content">
                    <Link to="/" className="logo">
                        <div className="logo-icon">
                            <img src="/logo.png" alt="LocalFix Logo" style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
                        </div>
                        <span className="logo-text">LocalFix</span>
                    </Link>
                    <nav className="nav">
                        <a href="/#features">Features</a>
                        <a href="/#how-it-works">How it Works</a>
                        <a href="#" className="btn btn-outline-sm">Join as Provider</a>
                        <a href="/#download" className="btn btn-primary">Get the App</a>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="footer">
                <div className="container footer-content">
                    <div className="footer-col brand-col">
                        <div className="logo">
                            <div className="logo-icon">
                                <img src="/logo.png" alt="LocalFix Logo" style={{ width: '29px', height: '29px', objectFit: 'contain' }} />
                            </div>
                            <span className="logo-text">LocalFix</span>
                        </div>
                        <p>Connecting you with the best local professionals for all your home service needs.</p>
                    </div>

                    <div className="footer-col">
                        <h4>Company</h4>
                        <a href="#">About Us</a>
                        <a href="#">Careers</a>
                        <a href="#">Blog</a>
                        <a href="mailto:contact@localfix.app">Contact</a>
                    </div>

                    <div className="footer-col">
                        <h4>Services</h4>
                        <a href="#">Plumbing</a>
                        <a href="#">Electrical</a>
                        <a href="#">Cleaning</a>
                        <a href="#">Painting</a>
                    </div>

                    <div className="footer-col cta-col">
                        <h4>For Professionals</h4>
                        <p>Grow your business with LocalFix.</p>
                        <button className="btn btn-primary footer-btn">
                            Join as Provider
                        </button>
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
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/terms-of-service">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Layout;
