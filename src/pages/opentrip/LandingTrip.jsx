import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dataOpenTrip } from '../../services/data/OpenTrip';
import '../../style/OpenTrip/LandingTrip.css';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const LandingTrip = () => {
  const [index, setIndex] = useState(0);

  // Auto-slide dari kanan ke kiri
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % dataOpenTrip.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + dataOpenTrip.length) % dataOpenTrip.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % dataOpenTrip.length);
  };

  // Mengambil 3 item untuk ditampilkan (kiri, tengah/zoom, kanan)
  const getVisibleItems = () => {
    const items = [];
    for (let i = -1; i <= 1; i++) {
      let idx = (index + i + dataOpenTrip.length) % dataOpenTrip.length;
      items.push({ ...dataOpenTrip[idx], position: i });
    }
    return items;
  };

  return (
    <div className="landing-exclusive">
      {/* Hero Header */}
      <section className="hero-landing">
        <div className="hero-content-ex">
          <span className="badge-exclusive">EXCLUSIVE OPEN TRIP</span>
          <h1>Jelajahi Indonesia <br /><span>Bersama Kami</span></h1>
          <p>Temukan pengalaman terbaik menjelajahi destinasi menakjubkan bersama komunitas traveler lainnya.</p>

          <Link to="/trip" className="btn-gold-action">
            Lihat Open Trip →
          </Link>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="trip-carousel-section">
        <div className="section-title-center">
          <span className="gold-text">OPEN TRIP TERBARU</span>
          <h2>Open Trip Pilihan Untukmu</h2>
        </div>

        <div className="carousel-container">
          <div className="carousel-wrapper">
            <AnimatePresence mode='popLayout'>
              {getVisibleItems().map((item) => {
                const xOffset = item.position * 440; // Jarak antar card
                return (
                  <motion.div
                    key={`${item.id}-${item.position}`}
                    layout
                    initial={{ opacity: 0, x: xOffset + 200, scale: 0.7 }}
                    animate={{ 
                      opacity: item.position === 0 ? 1 : 0.6,
                      x: xOffset,
                      scale: item.position === 0 ? 1.1 : 0.85,
                      zIndex: item.position === 0 ? 10 : 1,
                      filter: item.position === 0 ? 'brightness(1)' : 'brightness(0.7)'
                    }}
                    exit={{ opacity: 0, x: xOffset - 200, scale: 0.7 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`trip-card-landing position-${item.position}`}
                  >
                    <div className="card-media-wrapper">
                      <img src={item.gambar} alt={item.nama} />
                      <div className="cat-badge-overlay">{item.kategori}</div>
                    </div>
                    <div className="card-info-landing">
                      <h3>{item.nama}</h3>
                      <div className="meta-grid-landing">
                        <span><i className="far fa-clock"></i> {item.durasi}</span>
                        <span><i className="fas fa-map-marker-alt"></i> {item.lokasi}</span>
                      </div>
                      <div className="price-row-landing">
                        <span className="price-label">Mulai dari</span>
                        <span className="price-val">Rp {item.harga.toLocaleString()}</span>
                      </div>
                      <div className="amenities-minimal">
                        {item.fasilitas.slice(0, 3).map((f, i) => (
                          <span key={i}>✓ {f}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button className="carousel-arrow carousel-arrow-left" onClick={handlePrev} aria-label="Previous">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="carousel-arrow carousel-arrow-right" onClick={handleNext} aria-label="Next">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="view-all-wrapper">
          
          <Link to="/trip" className="btn-outline-gold">
            Lihat Semua Open Trip →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingTrip;