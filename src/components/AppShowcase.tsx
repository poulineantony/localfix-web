import { useState, useEffect, useRef } from 'react';

const showcaseSteps = [
    {
        id: 1,
        title: "Browse Services Near You",
        description: "See available service providers on an interactive map. Filter by category, distance, and ratings to find the perfect professional for your needs.",
        image: "/screen-home.png"
    },
    {
        id: 2,
        title: "Choose Your Service",
        description: "Select from a wide range of home services including plumbing, electrical, cleaning, painting, and more. Each category is verified and trusted.",
        image: "/screen-register.png"
    },
    {
        id: 3,
        title: "Book a Professional",
        description: "View detailed provider profiles with ratings, reviews, and pricing. Check availability and book instantly with transparent upfront costs.",
        image: "/screen-booking.png"
    },
    {
        id: 4,
        title: "Track in Real-Time",
        description: "Watch your service provider's arrival in real-time. Get live updates, communicate directly, and know exactly when help will arrive.",
        image: "/screen-service.png"
    },
    {
        id: 5,
        title: "Pay & Rate Securely",
        description: "Complete payment seamlessly through the app. Rate your experience and help others find quality service providers in your community.",
        image: "/screen-payment.png"
    }
];

export const AppShowcase = () => {
    const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'));
                        setVisibleSteps((prev) => Array.from(new Set([...prev, index])));
                    }
                });
            },
            { threshold: 0.2 } // Trigger when 20% of the row is visible
        );

        rowRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            rowRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    return (
        <section className="app-showcase">
            <div className="container">
                {showcaseSteps.map((step, index) => (
                    <div
                        key={step.id}
                        className={`showcase-row ${index % 2 === 0 ? 'row-normal' : 'row-reverse'} ${visibleSteps.includes(index) ? 'is-visible' : ''}`}
                        ref={(el) => rowRefs.current[index] = el}
                        data-index={index}
                    >
                        <div className="showcase-text">
                            <span className="step-badge">Step 0{index + 1}</span>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>

                        <div className="showcase-visual">
                            <img src={step.image} alt={step.title} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
