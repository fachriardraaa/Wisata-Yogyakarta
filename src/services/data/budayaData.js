import heroBg from '../../assets/images/heroSection-budaya.png';
import seniImg from '../../assets/images/seniPertunjukan-budaya.png';
import keratonImg from '../../assets/images/keratonSejarah-budaya.png';
import kearifanImg from '../../assets/images/kearifanLokal-budaya.png';

export const budayaHeroData = {
  subtitle: "Selamat Datang di",
  titleMain: "Jantung Budaya",
  titleSub: "di Tanah Mataram",
  description: "Daerah Istimewa Yogyakarta adalah cermin budaya Jawa yang hidup dan terus lestari. Temukan keindahan tradisi, kearifan lokal, dan warisan leluhur yang tak ternilai.",
  bgImage: heroBg,
  location: "Candi Prambanan, Sleman, DIY"
};

export const budayaCategories = [
  {
    id: "seni",
    title: "Seni Pertunjukan",
    description: "Wayang, tari, gamelan, dan berbagai bentuk seni yang penuh makna.",
    image: seniImg
  },
  {
    id: "keraton",
    title: "Keraton & Sejarah",
    description: "Pusat kebudayaan Jawa yang menjaga nilai-nilai luhur dan sejarah panjang.",
    image: keratonImg
  },
  {
    id: "kearifan",
    title: "Kearifan Lokal",
    description: "Tradisi, adat, dan filosofi hidup masyarakat Jawa yang menjadi pedoman.",
    image: kearifanImg
  }
];

export const budayaRegions = [
  { id: "all", label: "Semua" },
  { id: "sleman", label: "Sleman" },
  { id: "kulonprogo", label: "Kulon Progo" },
  { id: "bantul", label: "Bantul" },
  { id: "gunungkidul", label: "Gunung Kidul" },
  { id: "kota", label: "Kota" }
];

// =========================================================================
// 1. DATA UTAMA (Langsung Muncul di Halaman Awal)
// Masing-masing daerah minimal memiliki 1-2 perwakilan di baris utama
// =========================================================================
export const initialBudayaItems = [
  {
    id: "sendratari-ramayana",
    title: "Sendratari Ramayana Prambanan",
    region: "sleman",
    description: "Pertunjukan teater tari megah tanpa dialog yang menceritakan epos Ramayana dengan sorotan latar Candi Prambanan.",
    image: seniImg,
    tag: "Seni Tari"
  },
  {
    id: "candi-ijo",
    title: "Situs Suci Candi Ijo",
    region: "sleman",
    description: "Kompleks candi bercorak Hindu bersejarah peninggalan Mataram Kuno yang berada di dataran tertinggi Kabupaten Sleman.",
    image: heroBg,
    tag: "Arsitektur"
  },
  {
    id: "taman-sari",
    title: "Situs Sejarah Taman Sari",
    region: "kota",
    description: "Bekas taman pemandian air eksotis keluarga kerajaan Keraton Yogyakarta yang kaya akan lorong rahasia bawah tanah.",
    image: keratonImg,
    tag: "Sejarah"
  },
  {
    id: "geblek-renteng",
    title: "Batik Motif Geblek Renteng",
    region: "kulonprogo",
    description: "Motif batik khas Kulon Progo yang terinspirasi dari makanan tradisional geblek, melambangkan ikatan persatuan yang kokoh.",
    image: kearifanImg,
    tag: "Kerajinan"
  },
  {
    id: "gejog-lesung",
    title: "Kesenian Gejog Lesung",
    region: "bantul",
    description: "Seni musik tradisional instrumen pertanian berupa lesung dan alu yang dimainkan sebagai wujud syukur atas hasil panen.",
    image: seniImg,
    tag: "Musik Tradisional"
  },
  {
    id: "upacara-rasulan",
    title: "Upacara Adat Rasulan",
    region: "gunungkidul",
    description: "Ritual bersih desa tahunan masyarakat Gunung Kidul pasca-panen sebagai simbol keharmonisan manusia dengan alam.",
    image: keratonImg,
    tag: "Upacara Adat"
  }
];

// =========================================================================
// 2. DATA TAMBAHAN (Sembunyi di Dalam Tirai "Tampilkan Lebih Banyak")
// Saat tombol ditekan, konten-konten di bawah ini akan meluncur turun
// =========================================================================
export const extendedBudayaItems = [
  // --- KOTA ---
  {
    id: "upacara-sekaten",
    title: "Upacara Adat Sekaten",
    region: "kota",
    description: "Perayaan kultural dan keagamaan tahunan menyambut Maulid Nabi Muhammad SAW yang dipelopori langsung oleh pihak Kraton.",
    image: keratonImg,
    tag: "Tradisi Adat"
  },
  {
    id: "wayang-jogja-night",
    title: "Wayang Jogja Night Carnival",
    region: "kota",
    description: "Karnaval jalanan tahunan berskala masif di kawasan Tugu Jogja yang memadukan seni pewayangan dengan teknologi modern.",
    image: seniImg,
    tag: "Karnaval Pop"
  },

  // --- SLEMAN ---
  {
    id: "upacara-saparan-gamping",
    title: "Saparan Bekakak Gamping",
    region: "sleman",
    description: "Upacara tradisional penyembelihan sepasang boneka pengantin dari ketan berisi juruh (gula merah) untuk memohon keselamatan.",
    image: keratonImg,
    tag: "Ritual Adat"
  },
  {
    id: "tari-badui",
    title: "Seni Tari Badui Sleman",
    region: "sleman",
    description: "Seni tari rakyat bernuansa islami yang diiringi rebana, menggambarkan ketangkasan prajurit dalam olah keprajuritan.",
    image: seniImg,
    tag: "Seni Tari"
  },

  // --- BANTUL ---
  {
    id: "batik-giriloyo",
    title: "Kampung Batik Tulis Giriloyo",
    region: "bantul",
    description: "Sentra kerajinan pelestarian seni membatik tulis klasik gaya Yogyakarta tertua yang terletak di kawasan Imogiri Bantul.",
    image: kearifanImg,
    tag: "Kerajinan"
  },
  {
    id: "kirab-ngabean",
    title: "Kirab Budaya Upacara Ngabean",
    region: "bantul",
    description: "Kirab pusaka dan gunungan hasil bumi yang rutin digelar masyarakat pantai selatan sebagai wujud pelestarian warisan leluhur.",
    image: keratonImg,
    tag: "Tradisi Budaya"
  },

  // --- KULON PROGO ---
  {
    id: "tari-angguk",
    title: "Seni Tari Angguk Kulon Progo",
    region: "kulonprogo",
    description: "Tarian khas yang ditarikan secara berkelompok dengan kostum menyerupai serdadu Belanda, diiringi selawatan melayu.",
    image: seniImg,
    tag: "Seni Tari"
  },
  {
    id: "upacara-ngalap-berkah",
    title: "Upacara Adat Sendangsono",
    region: "kulonprogo",
    description: "Tradisi lokal masyarakat menoreh yang berpadu harmonis dengan alkulturasi religi spiritual di kawasan sendang suci.",
    image: kearifanImg,
    tag: "Akulturasi"
  },

  // --- GUNUNG KIDUL ---
  {
    id: "wayang-beber",
    title: "Wayang Beber Gelaran",
    region: "gunungkidul",
    description: "Seni pertunjukan wayang langka berupa lembaran kain/kertas bergambar yang dibeberkan oleh dalang, asli dari Gunung Kidul.",
    image: seniImg,
    tag: "Wayang Langka"
  },
  {
    id: "thiwul-kearifan",
    title: "Kuliner Historis Thiwul",
    region: "gunungkidul",
    description: "Makanan pokok pengganti nasi berbahan singkong yang menyimpan sejarah panjang perjuangan pangan masyarakat jaman dulu.",
    image: kearifanImg,
    tag: "Kuliner Tradisional"
  }
];