import Layout from '../components/Layout';
import './LegalPages.css';

function TermsOfService() {
    return (
        <Layout>
            <div className="legal-page">
                <div className="container">
                    <h1>Terms & Conditions</h1>
                    <p className="last-updated">Effective Date: January 14, 2026</p>

                    <section>
                        <p>
                            Welcome to LocalFix. By accessing or using our platform, you agree to these Terms and Conditions.
                            Please read them carefully.
                        </p>
                    </section>

                    <section>
                        <h2>1. About LocalFix</h2>
                        <p>
                            LocalFix is a platform that connects users with independent local service providers. LocalFix does
                            not directly provide services and is not responsible for the execution of services.
                        </p>
                    </section>

                    <section>
                        <h2>2. User Responsibilities</h2>
                        <p>You agree to:</p>
                        <ul>
                            <li>Provide accurate information</li>
                            <li>Use the platform for lawful purposes only</li>
                            <li>Not misuse or attempt to disrupt the platform</li>
                            <li>Respect service providers and platform policies</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Service Providers</h2>
                        <ul>
                            <li>Service providers are independent professionals</li>
                            <li>LocalFix does not guarantee service quality, pricing, or timelines</li>
                            <li>Any agreement is directly between the user and the service provider</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Payments</h2>
                        <ul>
                            <li>Payments, if applicable, are processed through authorized payment partners</li>
                            <li>LocalFix is not responsible for payment disputes between users and providers unless explicitly stated</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Cancellations & Refunds</h2>
                        <ul>
                            <li>Cancellation and refund policies may vary by service</li>
                            <li>Any applicable refunds will be processed according to the stated policy at the time of booking</li>
                        </ul>
                    </section>

                    <section>
                        <h2>6. Limitation of Liability</h2>
                        <p>LocalFix is not liable for:</p>
                        <ul>
                            <li>Service delays or failures</li>
                            <li>Loss or damages arising from provider services</li>
                            <li>Indirect or consequential damages</li>
                        </ul>
                    </section>

                    <section>
                        <h2>7. Termination</h2>
                        <p>
                            We reserve the right to suspend or terminate access if these terms are violated.
                        </p>
                    </section>

                    <section>
                        <h2>8. Changes to Terms</h2>
                        <p>
                            We may update these Terms from time to time. Continued use of the platform means acceptance of
                            updated terms.
                        </p>
                    </section>

                    <section>
                        <h2>9. Governing Law</h2>
                        <p>These Terms are governed by the laws of India.</p>
                    </section>

                    <section>
                        <h2>10. Contact Information</h2>
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

export default TermsOfService;
