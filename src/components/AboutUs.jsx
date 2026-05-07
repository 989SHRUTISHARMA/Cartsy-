import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
  const [count, setCount] = useState({
    customers: 0,
    products: 0,
    delivery: 0,
  });

  const [activeVideo, setActiveVideo] = useState(null);

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

  // ✅ WORKING YOUTUBE VIDEOS (NO BREAKAGE EVER)
  const videos = [
    {
      id: 1,
      title: "Product Showcase",
      embed: "https://www.youtube.com/embed/otej7WLdPh0",
    },
    {
      id: 2,
      title: "Delivery Experience",
      embed: "https://www.youtube.com/embed/CUdhRXFCsQE",
    },
  ];

  return (
    <div className="about-container">

      {/* HERO */}
      <div className="about-hero">
        <img
          src="https://images.unsplash.com/photo-1556742031-c6961e8560b0"
          className="about-img"
          alt="hero"
        />

        <div className="about-overlay">
          <h1>About Us</h1>
          <p>Building a modern & trusted shopping experience</p>
        </div>
      </div>

      {/* STORY */}
      <motion.section
        className="about-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2>Our Story</h2>
        <p>
          We started with a vision to make online shopping simple, fast, and
          reliable for everyone. Today, we serve thousands of happy customers.
        </p>
      </motion.section>

      {/* 🎥 VIDEO SECTION (FIXED - YOUTUBE EMBED) */}
      <section className="video-section">
        <h2>Experience Our Brand</h2>

        <div className="video-grid">
          {videos.map((video, i) => (
            <motion.div
              key={i}
              className="video-card"
              whileHover={{ scale: 1.03 }}
              onClick={() => setActiveVideo(video)}
            >
              <iframe
                src={video.embed}
                title={video.title}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* MISSION / VISION */}
      <motion.section className="about-grid">
        <div className="card">
          <h3>🎯 Mission</h3>
          <p>Deliver quality products at the best prices.</p>
        </div>

        <div className="card">
          <h3>🚀 Vision</h3>
          <p>Become India’s most loved shopping platform.</p>
        </div>
      </motion.section>

      {/* COUNTERS */}
      <motion.section className="counter-section">
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
      </motion.section>

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

      {/* TEAM */}
      <section className="team-section">
        <h2>Our Team</h2>

        <div className="team-grid">
          {[
            {
              name: "Rahul Sharma",
              role: "Founder & CEO",
              img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
            },
            {
              name: "Priya Verma",
              role: "UI/UX Designer",
              img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
            },
            {
              name: "Aman Gupta",
              role: "Frontend Developer",
              img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
            },
            {
              name: "Rohit Mehta",
              role: "Backend Developer",
              img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800",
            },
            {
              name: "Neha Singh",
              role: "Product Manager",
              img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
            },
            {
              name: "Simran Kaur",
              role: "Marketing Head",
              img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
            },
            {
              name: "Anjali Rao",
              role: "DevOps Engineer",
              img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800",
            },
            {
              name: "Vikram Joshi",
              role: "Customer Support",
              img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=800",
            },
          ].map((t, i) => (
            <div className="team-card" key={i}>
              <img src={t.img} alt={t.name} />
              <h4>{t.name}</h4>
              <p>{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL POPUP (YOUTUBE FULL VIEW) */}
      {activeVideo && (
        <div className="modal" onClick={() => setActiveVideo(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={activeVideo.embed}
              title={activeVideo.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}