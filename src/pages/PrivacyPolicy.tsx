import Layout from '../components/Layout';
import './LegalPages.css';

function PrivacyPolicy() {
    return (
        <Layout>
            <div className="legal-page">
                <div className="container">
                    <h1>Privacy Policy</h1>
                    <p className="last-updated">Effective Date: January 14, 2026</p>

                    <section>
                        <p>
                            LocalFix ("we", "our", "us") respects your privacy and is committed to protecting the personal
                            information you share with us. This Privacy Policy explains how we collect, use, store, and protect
                            your information when you use our website, mobile application, or services.
                        </p>
                    </section>

                    <section>
                        <h2>1. Information We Collect</h2>
                        <p>We may collect the following information:</p>
                        <ul>
                            <li>Name</li>
                            <li>Phone number</li>
                            <li>Email address</li>
                            <li>Location details (only for service availability)</li>
                            <li>Service requests and preferences</li>
                            <li>Device and usage information (for app performance and security)</li>
                        </ul>
                        <p>We do not collect sensitive personal data unless required to provide our services.</p>
                    </section>

                    <section>
                        <h2>2. How We Use Your Information</h2>
                        <p>Your information is used to:</p>
                        <ul>
                            <li>Connect you with relevant local service providers</li>
                            <li>Communicate service updates and confirmations</li>
                            <li>Improve our platform and user experience</li>
                            <li>Ensure safety, security, and fraud prevention</li>
                            <li>Comply with legal requirements</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Sharing of Information</h2>
                        <p>We may share limited information with:</p>
                        <ul>
                            <li>Verified service providers to fulfill your request</li>
                            <li>Technology partners who support platform operations</li>
                            <li>Legal authorities if required by law</li>
                        </ul>
                        <p>We do not sell your personal information to third parties.</p>
                    </section>

                    <section>
                        <h2>4. Data Security</h2>
                        <p>
                            We use reasonable technical and organizational measures to protect your data against unauthorized
                            access, loss, or misuse.
                        </p>
                    </section>

                    <section>
                        <h2>5. Data Retention</h2>
                        <p>
                            We retain your information only for as long as necessary to provide services or comply with legal
                            obligations.
                        </p>
                    </section>

                    <section>
                        <h2>6. Your Rights</h2>
                        <p>You may:</p>
                        <ul>
                            <li>Request access to your data</li>
                            <li>Request correction or deletion</li>
                            <li>Withdraw consent where applicable</li>
                            <li>Contact us to exercise these rights</li>
                        </ul>
                    </section>

                    <section>
                        <h2>7. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. Updates will be posted on this page.
                        </p>
                    </section>

                    <section>
                        <h2>8. Contact Us</h2>
                        <ul>
                            <li>📧 Email: support@localfix.app</li>
                            <li>📍 Address: 28, Savadi Street, Surakudy, Karaikal</li>
                        </ul>
                    </section>
                </div>
            </div>
        </Layout>
    );
}

export default PrivacyPolicy;
