import { useState } from 'react';
import { Phone, ArrowRight, Smartphone, Download, Check, Key, Home } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import './InstantBooking.css';

interface User {
    id: string;
    phone: string;
    name: string;
    isOnboarded: boolean;
    hasCompletedProfile: boolean;
}

export function InstantBooking() {
    const [step, setStep] = useState<'phone' | 'otp' | 'download' | 'booking'>('phone');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Detect if user is on mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // App store links
    const APP_STORE_URL = 'https://apps.apple.com/app/localfix';
    const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.localfix';
    const DOWNLOAD_URL = isMobile
        ? (navigator.userAgent.includes('iPhone') ? APP_STORE_URL : PLAY_STORE_URL)
        : 'https://localfix.app/download';

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            setError('Please enter a valid 10-digit phone number');
            setLoading(false);
            return;
        }

        try {
            // Call API to send OTP (checks if user exists internally)
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://localfix.xyz'}/api/v1/web/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: phone }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // User exists and OTP sent
                setStep('otp');
            } else if (response.status === 404) {
                // User not found - needs to download app
                setStep('download');
            } else {
                setError(data.message || 'Unable to verify phone number.');
            }
        } catch (err) {
            console.error('Error sending OTP:', err);
            setError('Unable to reach server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://localfix.xyz'}/api/v1/web/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: phone, otp }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setUser(data.user);
                // Check if user has completed onboarding
                if (data.user.isOnboarded && data.user.hasCompletedProfile) {
                    setStep('booking');
                } else {
                    setStep('download');
                }
            } else {
                setError(data.message || 'Invalid OTP. Please try again.');
            }
        } catch (err) {
            console.error('Error verifying OTP:', err);
            setError('Unable to verify OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadRedirect = () => {
        if (isMobile) {
            window.location.href = DOWNLOAD_URL;
        }
    };

    const handleBack = () => {
        setStep('phone');
        setPhone('');
        setOtp('');
        setUser(null);
        setError('');
    };

    return (
        <div className="instant-booking-page">
            {/* Header */}
            <header className="booking-header">
                <div className="booking-header-content">
                    <a href="/" className="booking-logo">
                        <div className="booking-logo-icon">
                            <img src="/logo.png" alt="LocalFix Logo" />
                        </div>
                        <span className="booking-logo-text">LocalFix</span>
                    </a>
                    <a href="/" className="back-home" aria-label="Back to Home">
                        <Home size={24} />
                    </a>
                </div>
            </header>

            {/* Main Content with Blur Background */}
            <div className="booking-main">
                <div className="booking-background"></div>

                <div className="booking-content-wrapper">
                    <div className="booking-card">

                        {/* Step Indicator */}
                        <div className="step-indicator">
                            <div className={`step-dot ${step === 'phone' ? 'active' : 'completed'}`}>
                                {step !== 'phone' ? <Check size={16} /> : '1'}
                            </div>
                            <div className="step-line"></div>
                            <div className={`step-dot ${step === 'otp' ? 'active' : (step === 'booking' ? 'completed' : '')}`}>
                                {(step === 'booking') ? <Check size={16} /> : '2'}
                            </div>
                            <div className="step-line"></div>
                            <div className={`step-dot ${step === 'booking' ? 'active' : ''}`}>3</div>
                        </div>

                        {/* Phone Number Entry */}
                        {step === 'phone' && (
                            <div className="booking-step-content">
                                <div className="step-header">
                                    <div className="step-icon">
                                        <Phone size={32} />
                                    </div>
                                    <h1>Book a Service</h1>
                                    <p>Enter your mobile number to get started</p>
                                </div>

                                <form onSubmit={handlePhoneSubmit} className="booking-form">
                                    <div className="input-group">
                                        <label>Phone Number</label>
                                        <div className="phone-input-wrapper">
                                            <span className="country-code">🇮🇳 +91</span>
                                            <input
                                                type="tel"
                                                placeholder="Enter 10-digit number"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                className="phone-input"
                                                maxLength={10}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {error && <div className="error-alert">{error}</div>}

                                    <button
                                        type="submit"
                                        className="btn-submit"
                                        disabled={loading || phone.length !== 10}
                                    >
                                        {loading ? 'Sending OTP...' : 'Get OTP'}
                                        <ArrowRight size={20} />
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* OTP Verification Step */}
                        {step === 'otp' && (
                            <div className="booking-step-content">
                                <div className="step-header">
                                    <div className="step-icon">
                                        <Key size={32} />
                                    </div>
                                    <h1>Verify Phone</h1>
                                    <p>Enter the 6-digit OTP sent to +91 {phone}</p>
                                </div>

                                <form onSubmit={handleOtpSubmit} className="booking-form">
                                    <div className="input-group">
                                        <label>One-Time Password</label>
                                        <div className="phone-input-wrapper">
                                            <input
                                                type="text"
                                                placeholder="______"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                className="phone-input otp-input"
                                                maxLength={6}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {error && <div className="error-alert">{error}</div>}

                                    <button
                                        type="submit"
                                        className="btn-submit"
                                        disabled={loading || otp.length !== 6}
                                    >
                                        {loading ? 'Verifying...' : 'Verify & Continue'}
                                        <ArrowRight size={20} />
                                    </button>
                                </form>

                                <button onClick={handleBack} className="btn-secondary">
                                    Change Phone Number
                                </button>
                            </div>
                        )}

                        {/* Download App Step */}
                        {step === 'download' && (
                            <div className="booking-step-content">
                                <div className="step-header">
                                    <div className="step-icon download">
                                        <Smartphone size={32} />
                                    </div>
                                    <h1>Download LocalFix App</h1>
                                    <p>Complete your profile on mobile to start booking</p>
                                </div>

                                {isMobile ? (
                                    <div className="download-mobile">
                                        <button
                                            onClick={handleDownloadRedirect}
                                            className="btn-submit btn-download"
                                        >
                                            <Download size={24} />
                                            Download App
                                        </button>
                                        <p className="download-hint">
                                            You'll be redirected to the {navigator.userAgent.includes('iPhone') ? 'App Store' : 'Play Store'}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="download-desktop">
                                        <div className="qr-container">
                                            <QRCodeSVG
                                                value={DOWNLOAD_URL}
                                                size={180}
                                                level="H"
                                                includeMargin={true}
                                            />
                                        </div>
                                        <p className="qr-hint">Scan with your phone to download</p>
                                    </div>
                                )}

                                <button onClick={handleBack} className="btn-secondary">
                                    Try Different Number
                                </button>
                            </div>
                        )}

                        {/* Service Selection */}
                        {step === 'booking' && user && (
                            <div className="booking-step-content">
                                <div className="step-header">
                                    <h1>Welcome back, {user.name}!</h1>
                                    <p>Choose a service to book instantly</p>
                                </div>

                                <div className="services-list">
                                    <ServiceCard title="Plumbing" icon="🔧" phone={phone} />
                                    <ServiceCard title="Electrical" icon="⚡" phone={phone} />
                                    <ServiceCard title="Cleaning" icon="🧹" phone={phone} />
                                    <ServiceCard title="Painting" icon="🎨" phone={phone} />
                                    <ServiceCard title="Carpentry" icon="🪚" phone={phone} />
                                    <ServiceCard title="AC Repair" icon="❄️" phone={phone} />
                                </div>

                                <button onClick={handleBack} className="btn-secondary">
                                    Use Different Number
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface ServiceCardProps {
    title: string;
    icon: string;
    phone: string;
}

function ServiceCard({ title, icon, phone }: ServiceCardProps) {
    const [booking, setBooking] = useState(false);

    const handleBookService = async () => {
        setBooking(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://localfix.xyz'}/api/v1/web/instant`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: phone, // Send without +91
                    serviceType: title.toLowerCase(),
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert(`✅ Booking created! Check your mobile app. Booking ID: ${data.data.bookingNumber}`);
            } else {
                alert('❌ Unable to create booking. Please try again.');
            }
        } catch (err) {
            console.error('Booking error:', err);
            alert('❌ Unable to create booking. Please try again.');
        } finally {
            setBooking(false);
        }
    };

    return (
        <div className="service-item">
            <div className="service-info">
                <span className="service-emoji">{icon}</span>
                <span className="service-name">{title}</span>
            </div>
            <button
                onClick={handleBookService}
                className="btn-book"
                disabled={booking}
            >
                {booking ? 'Booking...' : 'Book'}
            </button>
        </div>
    );
}
