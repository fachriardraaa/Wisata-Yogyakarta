// ArtikelBudaya.jsx
import React from 'react';
import { budayaData } from '../../services/data/budayaData';
import '../../style/budaya-style/ArtikelBudaya.css';

const ArtikelBudaya = () => {
  return (
    <div className="budaya-container">
      {/* Header Halaman */}
      <div className="budaya-header-tag">
        <span>ARSIP BUDAYA & SEJARAH</span>
      </div>

      {/* List Artikel */}
      <div className="budaya-list">
        {budayaData.map((artikel) => (
          <div 
            key={artikel.id} 
            className={`budaya-card-wrapper ${artikel.layoutLeft ? 'layout-left' : 'layout-right'}`}
          >
            {/* Bagian Visual Gambar */}
            <div className="budaya-image-section">
              <img src={artikel.image} alt={artikel.title} className="budaya-photo" />
              {/* Efek Lingkaran/Aksen di background foto */}
              <div className="budaya-bg-shape"></div>
            </div>

            {/* Bagian Konten Teks */}
            <div className="budaya-content-section">
              <h2 className="budaya-title">{artikel.title}</h2>
              <h4 className="budaya-category">{artikel.category}</h4>
              <p className="budaya-excerpt">{artikel.excerpt}</p>

              {/* Tautan Media Sosial Informasi Terkait */}
              <div className="budaya-social-links">
                {artikel.socials.instagram && (
                  <a href={`https://instagram.com/${artikel.socials.instagram}`} target="_blank" rel="noreferrer" className="budaya-social-item">
                    <span className="budaya-icon">📷</span> {artikel.socials.instagram}
                  </a>
                )}
                {artikel.socials.youtube && (
                  <a href="#" target="_blank" rel="noreferrer" className="budaya-social-item">
                    <span className="budaya-icon">📺</span> {artikel.socials.youtube}
                  </a>
                )}
                {artikel.socials.tiktok && (
                  <a href={`https://tiktok.com/${artikel.socials.tiktok}`} target="_blank" rel="noreferrer" className="budaya-social-item">
                    <span className="budaya-icon">🎵</span> {artikel.socials.tiktok}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtikelBudaya;