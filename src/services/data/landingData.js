// src/services/data/landingData.js

// IMPORT GAMBAR LOKAL (PASTI AMAN 100% ANTI HILANG)
import imgBatik from '../../assets/images/keratonSejarah-budaya.png'; 
import imgWayang from '../../assets/images/seniPertunjukan-budaya.png';

// DATA WISATA POPULER 
export const previewWisata = [
  { 
    id: 'W01',
    judul: 'Candi Prambanan', 
    lokasi: 'Sleman, DIY',
    gambar: 'https://www.worldhistory.org/img/r/p/1500x1500/9249.jpg.webp?v=1755704431'
  },
  { 
    id: 'W02',
    judul: 'Pantai Parangtritis', 
    lokasi: 'Bantul, DIY',
    gambar: 'https://assets.telkomsel.com/public/2024-11/Pantai-Parangtritis-Surga-Tersembunyi-di-Yogyakarta.png'
  },
  { 
    id: 'W04',
    judul: 'Tebing Breksi', 
    lokasi: 'Sleman, DIY',
    gambar: 'https://assets.telkomsel.com/public/2024-11/tebing-breksi.jpg'
  },
];

// DATA PREVIEW WARISAN BUDAYA (SUDAH DISESUAIKAN DENGAN ID ADIT & GAMBAR LOKAL)
export const previewBudaya = [
  { 
    id: 1, // ID WAYANG KULIT PUNYA ADIT
    judul: 'Wayang Kulit', 
    desc: 'Mahakarya seni pertunjukan pewayangan Jawa yang sarat akan petuah dan filosofi pedoman hidup manusia.', 
    img: imgWayang // Menggunakan gambar lokal
  },
  { 
    id: 2, // ID BATIK JOGJA PUNYA ADIT
    judul: 'Batik Jogja', 
    desc: 'Mahakarya seni tekstil tradisional yang sarat akan makna filosofis dan keindahan corak klasik warisan leluhur.', 
    img: imgBatik // Menggunakan gambar lokal
  },
];