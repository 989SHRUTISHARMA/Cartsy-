import { useEffect, useState } from "react";

export default function AboutUs() {
  const [count, setCount] = useState({
    customers: 0,
    products: 0,
    delivery: 0,
  });

  useEffect(() => {
    let start = 0;
    const end = 10000;

    const timer = setInterval(() => {
      start += 200;

      setCount({
        customers: Math.min(start, 10000),
        products: Math.min(Math.floor(start / 20), 500),
        delivery: start >= 10000 ? 100 : Math.floor(start / 100),
      });

      if (start >= end) clearInterval(timer);
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="about-container">
      {/* HERO IMAGE */}
      <div className="about-hero">
        <img
          src="https://images.unsplash.com/photo-1556742031-c6961e8560b0"
          alt="shopping team"
          className="about-img"
        />

        <div className="about-overlay">
          <h1>About Us</h1>
          <p>Building a modern & trusted shopping experience</p>
        </div>
      </div>

      {/* STORY */}
      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          We started with a vision to make online shopping simple, fast, and
          reliable for everyone. Today, we serve thousands of happy customers.
        </p>
      </section>

      {/* MISSION / VISION */}
      <section className="about-grid">
        <div className="card">
          <h3>🎯 Mission</h3>
          <p>Deliver quality products at the best prices.</p>
        </div>

        <div className="card">
          <h3>🚀 Vision</h3>
          <p>Become India’s most loved shopping platform.</p>
        </div>
      </section>

      {/* COUNTERS */}
      <section className="counter-section">
        <div className="counter">
          <h2>{count.customers}+</h2>
          <p>Happy Customers</p>
        </div>

        <div className="counter">
          <h2>{count.products}+</h2>
          <p>Products</p>
        </div>

        <div className="counter">
          <h2>{count.delivery}%</h2>
          <p>Fast Delivery</p>
        </div>
      </section>

      {/* WHY US */}
      <section className="about-section">
        <h2>Why Choose Us</h2>
        <ul>
          <li>✔ Premium quality products</li>
          <li>✔ Fast & secure delivery</li>
          <li>✔ Easy returns</li>
          <li>✔ 24/7 customer support</li>
        </ul>
      </section>

      {/* TEAM (6 CLEAN PROFESSIONAL IMAGES) */}
      {/* TEAM */}
      <section className="team-section">
        <h2>Our Team</h2>

        <div className="team-grid">
          <div className="team-card">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800"
              alt="team"
            />
            <h4>Rahul Sharma</h4>
            <p>Founder & CEO</p>
          </div>

          <div className="team-card">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800"
              alt="team"
            />
            <h4>Priya Verma</h4>
            <p>UI/UX Designer</p>
          </div>

          <div className="team-card">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
              alt="team"
            />
            <h4>Aman Gupta</h4>
            <p>Frontend Developer</p>
          </div>

          <div className="team-card">
            <img
              src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800"
              alt="team"
            />
            <h4>Rohit Mehta</h4>
            <p>Backend Developer</p>
          </div>

          <div className="team-card">
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800"
              alt="team"
            />
            <h4>Neha Singh</h4>
            <p>Product Manager</p>
          </div>

          <div className="team-card">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800"
              alt="team"
            />
            <h4>Simran Kaur</h4>
            <p>Marketing Head</p>
          </div>

          <div className="team-card">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800"
              alt="team"
            />
            <h4>Anjali Mehra</h4>
            <p>DevOps Engineer</p>
          </div>

          <div className="team-card">
            <img
              src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=800"
              alt="team"
            />
            <h4>Vikram Joshi</h4>
            <p>Customer Support</p>
          </div>
        </div>
      </section>
    </div>
  );
}
