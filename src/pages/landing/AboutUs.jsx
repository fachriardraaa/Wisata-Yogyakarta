// src/pages/landing/AboutUs.jsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';

// IMPORT CSS TERBARU
import '../../style/home-style/about.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamData = [
    {
      id: 1,
      nama: "Adit",
      posisi: "Project Manager & Ketua Team",
      tugas: "Memimpin jalannya koordinasi kelompok, menyusun timeline kerja, sekaligus menyajikan kekayaan warisan budaya Mataram pada halaman List, Detail, dan Artikel Budaya.",
      foto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600"
    },
    {
      id: 2,
      nama: "Ghaffan",
      posisi: "Landing Page Developer",
      tugas: "Bertanggung jawab atas wajah utama aplikasi, meliputi perancangan halaman Home, About Us, dan sistem Contact.",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600"
    },
    {
      id: 3,
      nama: "Tio",
      posisi: "Wisata Module Dev",
      tugas: "Mengembangkan ekosistem eksplorasi destinasi, mencakup halaman List, Kategori, hingga Detail Wisata.",
      foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600"
    },
    {
      id: 4,
      nama: "Fahcri",
      posisi: "Open Trip Engineer",
      tugas: "Membangun alur perjalanan dari awal hingga akhir, meliputi halaman List, Detail paket, dan sistem Booking.",
      foto: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600"
    },
    {
      id: 5,
      nama: "Buchori",
      posisi: "User Access & Auth",
      tugas: "Mengelola keamanan dan data pengguna dengan merancang sistem Login, Register, serta antarmuka Dashboard.",
      foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600"
    }
  ];

  return (
    <div className="about-root sans">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER ELEGAN */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="text-[#c9a452] uppercase tracking-[0.3em] text-xs mb-4 font-bold sans">Tentang Kami</div>
          <h1 className="text-5xl md:text-6xl font-bold serif text-white mb-6 leading-tight">
            Kreator di Balik <br /> <span className="text-[#b8963e]">Hiling Semata</span>
          </h1>
          <p className="text-gray-300 sans leading-relaxed text-lg">
            Sinergi lima talenta yang berdedikasi melestarikan warisan Mataram melalui inovasi digital.
          </p>
        </motion.div>

        {/* TEAM LIST */}
        <div className="rrq-inspired-list">
          {teamData.map((member, index) => (
            <motion.div 
              key={member.id}
              className="rrq-card-horiz"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="rrq-card-text">
                <div className="rrq-role-light sans font-bold">{member.posisi}</div>
                <h3 className="rrq-name-light serif">{member.nama}</h3>
                
                <div className="rrq-task-light sans">
                  <p className="border-l-2 border-[#c9a452] pl-3 italic text-gray-500">
                    {member.tugas}
                  </p>
                </div>
              </div>

              <div className="rrq-card-photo-wrapper">
                <img src={member.foto} alt={member.nama} className="rrq-image-light" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default AboutUs;