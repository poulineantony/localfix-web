import { useState, useEffect } from 'react';
import { Key, Copy, RefreshCw, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import './AdminSettings.css';

interface ApiKeyInfo {
    key: string;
    createdAt: string;
    lastUsed?: string;
    usageCount?: number;
}

export function AdminSettings() {
    const [apiKey, setApiKey] = useState<string>('');
    const [showKey, setShowKey] = useState(false);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Generate a secure API key
    const generateApiKey = () => {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    };

    // Load existing API key (in production, this would come from backend)
    useEffect(() => {
        // Simulate loading from backend
        const savedKey = localStorage.getItem('instant_booking_api_key');
        if (savedKey) {
            setApiKey(savedKey);
        }
    }, []);

    const handleGenerateKey = () => {
        setLoading(true);
        setMessage(null);

        // Simulate API call
        setTimeout(() => {
            const newKey = generateApiKey();
            setApiKey(newKey);
            localStorage.setItem('instant_booking_api_key', newKey);
            setLoading(false);
            setMessage({ type: 'success', text: 'New API key generated successfully!' });

            // Clear message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        }, 500);
    };

    const handleCopyKey = () => {
        if (apiKey) {
            navigator.clipboard.writeText(apiKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleRevoke = () => {
        if (confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
            setLoading(true);
            setTimeout(() => {
                setApiKey('');
                localStorage.removeItem('instant_booking_api_key');
                setLoading(false);
                setMessage({ type: 'success', text: 'API key revoked successfully.' });
                setTimeout(() => setMessage(null), 3000);
            }, 500);
        }
    };

    return (
        <div className="admin-settings">
            <div className="settings-container">
                <div className="settings-header">
                    <div className="header-icon">
                        <Key size={32} />
                    </div>
                    <h1>Instant Booking API Settings</h1>
                    <p>Manage your API key for external integrations and instant booking</p>
                </div>

                {message && (
                    <div className={`message ${message.type}`}>
                        {message.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
                        <span>{message.text}</span>
                    </div>
                )}

                <div className="settings-card">
                    <div className="card-header">
                        <h2>API Key Configuration</h2>
                        <span className="badge">Admin Only</span>
                    </div>

                    <div className="card-content">
                        {apiKey ? (
                            <>
                                <div className="api-key-display">
                                    <label>Your API Key</label>
                                    <div className="key-input-group">
                                        <input
                                            type={showKey ? 'text' : 'password'}
                                            value={apiKey}
                                            readOnly
                                            className="key-input"
                                        />
                                        <button
                                            onClick={() => setShowKey(!showKey)}
                                            className="btn-icon"
                                            title={showKey ? 'Hide key' : 'Show key'}
                                        >
                                            {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                        <button
                                            onClick={handleCopyKey}
                                            className="btn-icon"
                                            title="Copy to clipboard"
                                        >
                                            {copied ? <Check size={18} /> : <Copy size={18} />}
                                        </button>
                                    </div>
                                    {copied && <span className="copy-success">✓ Copied to clipboard!</span>}
                                </div>

                                <div className="key-info">
                                    <div className="info-item">
                                        <span className="label">Status:</span>
                                        <span className="value active">Active</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Created:</span>
                                        <span className="value">{new Date().toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="action-buttons">
                                    <button
                                        onClick={handleGenerateKey}
                                        className="btn btn-secondary"
                                        disabled={loading}
                                    >
                                        <RefreshCw size={18} />
                                        Regenerate Key
                                    </button>
                                    <button
                                        onClick={handleRevoke}
                                        className="btn btn-danger"
                                        disabled={loading}
                                    >
                                        Revoke Key
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="no-key">
                                <div className="no-key-icon">
                                    <Key size={48} />
                                </div>
                                <h3>No API Key Generated</h3>
                                <p>Generate an API key to enable instant booking integrations</p>
                                <button
                                    onClick={handleGenerateKey}
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    <Key size={18} />
                                    Generate API Key
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="settings-card">
                    <div className="card-header">
                        <h2>API Documentation</h2>
                    </div>
                    <div className="card-content">
                        <div className="doc-section">
                            <h3>Endpoint</h3>
                            <code className="code-block">POST /api/v1/bookings/instant</code>
                        </div>

                        <div className="doc-section">
                            <h3>Authentication</h3>
                            <p>Include your API key in the request header:</p>
                            <code className="code-block">x-api-key: your-api-key-here</code>
                        </div>

                        <div className="doc-section">
                            <h3>Example Request</h3>
                            <pre className="code-block">
                                {`curl -X POST https://api.localfix.com/api/v1/bookings/instant \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: ${apiKey || 'your-api-key-here'}" \\
  -d '{
    "customerId": "507f1f77bcf86cd799439011",
    "service": "507f1f77bcf86cd799439012",
    "provider": "507f1f77bcf86cd799439013",
    "scheduledDate": "2026-01-20T00:00:00.000Z",
    "scheduledTime": {
      "startTime": "10:00 AM"
    },
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001"
    }
  }'`}
                            </pre>
                        </div>

                        <div className="doc-section">
                            <h3>Security Notes</h3>
                            <ul className="security-list">
                                <li>Never share your API key publicly</li>
                                <li>Store the key securely in environment variables</li>
                                <li>Regenerate the key if compromised</li>
                                <li>Monitor API usage regularly</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
