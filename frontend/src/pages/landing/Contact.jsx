// src/pages/landing/Contact.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// IMPORT CSS KHUSUS CONTACT
import '../../style/home-style/contact.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // STATE UNTUK INPUT FORM
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    pesan: ''
  });

  // STATE UNTUK NOTIFIKASI SUKSES / CONDITIONAL RENDERING
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nama && formData.email && formData.pesan) {
      setIsSubmitted(true);
      // Reset form setelah submit
      setFormData({ nama: '', email: '', pesan: '' });
    }
  };

  return (
    <div className="contact-root sans">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER ELEGAN */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="text-[#c9a452] uppercase tracking-[0.3em] text-xs mb-4 font-bold">Hubungi Kami</div>
          <h1 className="text-5xl md:text-6xl font-bold serif text-white mb-6 leading-tight">
            Pusat <span className="text-[#b8963e]">Informasi</span>
          </h1>
          <p className="text-gray-300 leading-relaxed text-lg">
            Punya pertanyaan mengenai destinasi Mataram atau paket Open Trip? Kirimkan pesanmu sekarang.
          </p>
        </motion.div>

        {/* UTAMA: FORM & INFORMASI KARTU */}
        <div className="contact-grid">
          
          {/* SISI KIRI: INFORMASI KONTEN */}
          <motion.div 
            className="contact-info-card"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="serif text-3xl font-bold text-gray-900 mb-6">Saluran Resmi</h3>
            <div className="space-y-6 text-gray-600 text-sm">
              <div className="flex items-start gap-4">
                <span className="text-[#c9a452] text-xl">📍</span>
                <div>
                  <h4 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-1">Sekretariat</h4>
                  <p>Kraton, Kota Yogyakarta, Daerah Istimewa Yogyakarta</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-[#c9a452] text-xl">✉️</span>
                <div>
                  <h4 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-1">Surel Resmi</h4>
                  <p>kontak@hilingsemata.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-[#c9a452] text-xl">📞</span>
                <div>
                  <h4 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-1">Hotline Trip</h4>
                  <p>+62 812-3456-7890</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SISI KANAN: FORM INPUT */}
          <motion.div 
            className="contact-form-card"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* CONDITIONAL RENDERING NOTIFIKASI SUKSES */}
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="serif text-2xl font-bold text-gray-900 mb-2">Pesan Berhasil Dikirim!</h3>
                <p className="text-gray-500 text-sm mb-6">Terima kasih, tim Hiling Semata akan segera menghubungi Anda melalui email.</p>
                <button onClick={() => setIsSubmitted(false)} className="btn-form-submit">Kirim Pesan Baru</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#c9a452] mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    name="nama" 
                    value={formData.nama} 
                    onChange={handleChange} 
                    className="form-input-field" 
                    placeholder="Masukkan nama Anda"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#c9a452] mb-2">Alamat Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="form-input-field" 
                    placeholder="nama@email.com"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#c9a452] mb-2">Isi Pesan</label>
                  <textarea 
                    name="pesan" 
                    rows="4" 
                    value={formData.pesan} 
                    onChange={handleChange} 
                    className="form-input-field resize-none" 
                    placeholder="Tuliskan pertanyaan atau rencana perjalanan Anda..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn-form-submit">Kirim Pesan →</button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </div>
  );
}

export default Contact;