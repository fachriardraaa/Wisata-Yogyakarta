import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

// IMPORT CSS TERBARU
import '../../style/home-style/about.css';

// VARIABEL ANIMASI (Ini yang tadi terpotong bosku 🙏)
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function AboutUs() {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // MENGAMBIL DATA DARI BACKEND
    axios.get('http://localhost:3001/tim')
      .then(res => {
        setTeamData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal menarik data tim:", err);
        setLoading(false);
      });
  }, []);

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
        {loading ? (
          <div className="text-center text-[#c9a452] animate-pulse my-20 font-bold text-xl">
            Memuat profil tim Hiling Semata...
          </div>
        ) : (
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
        )}

      </div>
    </div>
  );
}

export default AboutUs;