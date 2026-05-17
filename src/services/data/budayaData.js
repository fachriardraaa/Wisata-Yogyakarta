// src/services/data/budayaData.js
// ─────────────────────────────────────────────────────────────────────────
// Data lengkap budaya Yogyakarta — Hiling Semata
// ─────────────────────────────────────────────────────────────────────────

// ══════════════════════════════════════════════════════════════════════════
// DATA BUDAYA UTAMA (untuk ListBudaya & DetailBudaya)
// ══════════════════════════════════════════════════════════════════════════
export const dataBudaya = [
  // ── 1. WAYANG KULIT ──────────────────────────────────────────────────
  {
    id: 1,
    nama: "Wayang Kulit",
    kategori: "Wayang",
    tagline: "Lebih dari Sekadar Boneka Kulit",
    deskripsi:
      "Wayang adalah cermin kehidupan. Setiap tokoh, setiap gerakan, dan setiap dialog mengajarkan tentang kebijaksanaan, keberanian, dan nilai-nilai luhur Jawa yang tak lekang oleh waktu.",
    gambar: "../src/assets/images/wayangkulit.png",
    featured: true,
    lokasi: "Seluruh Yogyakarta",
    waktu: "Malam hari, biasanya acara khusus & hajatan",
    tiket: "Gratis – Rp 50.000",
    paragraf: [
      "Wayang Kulit adalah seni pertunjukan tradisional Jawa yang menggunakan boneka pipih dari kulit kerbau yang diukir dengan detail. Pertunjukan ini dimainkan oleh seorang dalang yang merangkap sebagai narator, sutradara, dan pengisi suara ratusan karakter sekaligus — sebuah kemampuan luar biasa yang hanya bisa dicapai lewat puluhan tahun latihan.",
      "Pertunjukan wayang biasanya berlangsung semalam suntuk dari pukul 21.00 hingga fajar, dengan layar putih yang diterangi lampu blencong sebagai media. Para penonton dapat menyaksikan dari dua sisi: sisi bayangan untuk yang ingin menikmati estetika gelap-terang, atau sisi depan untuk melihat keindahan warna boneka secara langsung.",
      "Setiap lakon yang dibawakan — baik dari Mahabharata, Ramayana, maupun cerita Panji — selalu mengandung pesan moral yang mendalam. Tokoh-tokoh wayang bukan sekadar karakter fiksi, melainkan simbol dari sifat-sifat manusia: Arjuna melambangkan ksatria yang bijaksana, Semar mewakili rakyat jelata yang sejati, dan Rahwana menggambarkan ambisi yang melampaui batas.",
    ],
    fakta: [
      "Diakui UNESCO sebagai Warisan Budaya Takbenda Dunia sejak 7 November 2003",
      "Satu pertunjukan wayang bisa berlangsung 6 hingga 9 jam semalam suntuk",
      "Dalang harus hafal ribuan dialog dan mampu memainkan ratusan karakter berbeda",
      "Boneka wayang dibuat dari kulit kerbau yang dikeringkan dan diukir tangan",
      "Gamelan yang mengiringi wayang terdiri dari 20–40 instrumen berbeda",
      "Ada lebih dari 200 tokoh wayang dalam lakon Mahabharata dan Ramayana",
    ],
    relasi: [2, 4, 5],
  },

  // ── 2. BATIK YOGYAKARTA ───────────────────────────────────────────────
  {
    id: 2,
    nama: "Batik Yogyakarta",
    kategori: "Batik",
    tagline: "Setiap Motif Adalah Doa yang Terukir",
    deskripsi:
      "Batik Yogyakarta bukan sekadar kain — ia adalah filosofi hidup yang dituangkan dalam goresan canting. Setiap motif menyimpan makna mendalam tentang kehidupan, alam, dan hubungan manusia dengan Tuhan.",
    gambar: "../src/assets/images/batikyogyakarta.png",
    featured: false,
    lokasi: "Kampung Batik Taman Sari & Kotagede, Yogyakarta",
    waktu: "Setiap hari, 08.00 – 17.00 WIB",
    tiket: "Gratis melihat, workshop mulai Rp 75.000",
    paragraf: [
      "Batik Yogyakarta memiliki ciri khas yang berbeda dari batik daerah lain: warna dasarnya didominasi putih, biru indigo tua, dan hitam pekat — mencerminkan karakter Yogyakarta yang tegas, tenang, dan penuh kedalaman makna. Motif-motifnya pun bukan hasil imajinasi semata, melainkan lahir dari perenungan panjang para abdi dalem keraton.",
      "Proses pembuatan batik tulis sejati dimulai dengan ngemplong (mempersiapkan kain), kemudian nyanting (menggoreskan lilin panas menggunakan canting di atas kain mori putih), lalu mewarnai dengan napthol atau indigo alami, dan terakhir melorod (menghilangkan lilin dengan air mendidih). Proses ini bisa memakan waktu berbulan-bulan untuk satu lembar kain.",
      "Motif Parang — salah satu motif tertua dan paling sakral — dahulu hanya boleh dikenakan oleh Raja dan keluarga kerajaan. Motif ini menggambarkan ombak laut yang tak pernah berhenti: simbol kekuatan, semangat, dan keteguhan hati. Hingga kini, motif Parang masih dianggap keramat dan pantang dikenakan sembarangan dalam upacara adat.",
    ],
    fakta: [
      "Batik Indonesia diakui UNESCO sebagai Warisan Dunia pada 2 Oktober 2009",
      "Motif Parang adalah motif tertua, berusia lebih dari 400 tahun",
      "Satu lembar batik tulis halus bisa memakan waktu 3–6 bulan pembuatan",
      "Yogyakarta memiliki lebih dari 3.000 pengrajin batik aktif",
      "Harga batik tulis halus bisa mencapai jutaan hingga puluhan juta rupiah",
      "Setiap tanggal 2 Oktober diperingati sebagai Hari Batik Nasional",
    ],
    relasi: [1, 3, 6],
  },

  // ── 3. GAMELAN ────────────────────────────────────────────────────────
  {
    id: 3,
    nama: "Gamelan Jawa",
    kategori: "Kesenian",
    tagline: "Harmoni Bunyi yang Menyentuh Jiwa",
    deskripsi:
      "Gamelan bukan sekadar musik — ia adalah meditasi kolektif. Ketika 30 hingga 40 instrumen perunggu dimainkan bersama, yang tercipta bukan hanya suara, melainkan getaran yang menyentuh ruang terdalam jiwa manusia.",
    gambar: "../src/assets/images/gamelan.png",
    featured: false,
    lokasi: "Keraton Yogyakarta & sanggar seni seluruh DIY",
    waktu: "Latihan rutin Sabtu–Minggu, pertunjukan sesuai jadwal",
    tiket: "Gratis menyaksikan, kursus mulai Rp 150.000/bulan",
    paragraf: [
      "Gamelan Jawa adalah ansambel musik tradisional yang terdiri dari berbagai instrumen perkusi dan melodi: gong, kenong, kempul, bonang, saron, demung, gender, gambang, siter, suling, rebab, dan kendang. Tidak ada direktur atau konduktor yang memimpin — setiap pemain memahami perannya dan mendengarkan satu sama lain dalam harmoni yang sempurna.",
      "Filosofi di balik gamelan adalah 'memayu hayuning bawana' — memperindah dan merawat dunia. Setiap gending (komposisi gamelan) memiliki karakter dan fungsinya masing-masing: ada yang digunakan untuk upacara sakral keraton, ada untuk mengiringi wayang, ada pula yang dimainkan saat hajatan rakyat. Gending Ketawang Puspawarna biasanya dimainkan untuk menyambut tamu agung.",
      "Yang mengejutkan, pengaruh gamelan ternyata merentang jauh melewati batas Jawa. Komponis Prancis Claude Debussy pernah mendengar gamelan di Exposition Universelle Paris tahun 1889 dan mengaku terpengaruh oleh harmoninya dalam menciptakan musik impresionisme. Kini, gamelan diajarkan di ratusan universitas di seluruh dunia.",
    ],
    fakta: [
      "Satu set gamelan lengkap bisa terdiri dari 60–80 instrumen",
      "Gamelan diwariskan turun-temurun, beberapa berumur ratusan tahun",
      "Komponis Debussy terinspirasi gamelan dalam menciptakan musik impresionisme",
      "Gamelan kini diajarkan di lebih dari 200 universitas di seluruh dunia",
      "Setiap instrumen gamelan memiliki nama dan 'jiwa' tersendiri",
      "NASA memasukkan rekaman gamelan dalam Voyager Golden Record yang diluncurkan ke luar angkasa pada 1977",
    ],
    relasi: [1, 4, 5],
  },

  // ── 4. KERATON YOGYAKARTA ─────────────────────────────────────────────
  {
    id: 4,
    nama: "Keraton Yogyakarta",
    kategori: "Sejarah & Keraton",
    tagline: "Pusat Semesta Budaya Jawa yang Masih Berdenyut",
    deskripsi:
      "Keraton Ngayogyakarta Hadiningrat bukan sekadar bangunan bersejarah — ia adalah pusat kosmologi Jawa yang hidup. Di sinilah tradisi, seni, dan kearifan lokal dijaga dengan penuh kesungguhan oleh keturunan Sultan hingga hari ini.",
    gambar: "../src/assets/images/keraton.png",
    featured: false,
    lokasi: "Jl. Rotowijayan Blok No. 1, Yogyakarta",
    waktu: "Senin–Minggu, 08.30–14.00 WIB (Jumat tutup 14.00)",
    tiket: "Rp 15.000 (domestik), Rp 25.000 (mancanegara)",
    paragraf: [
      "Keraton Ngayogyakarta Hadiningrat dibangun pada tahun 1755 oleh Sri Sultan Hamengku Buwono I, setelah Perjanjian Giyanti yang memecah Kerajaan Mataram menjadi dua. Pembangunannya memakan waktu hampir satu tahun dan melibatkan ribuan tenaga ahli dari seluruh penjuru Jawa. Arsitekturnya bukan sekadar estetika — setiap ukuran, arah, dan ornamen mengandung makna kosmologis yang dalam.",
      "Konsep tata ruang keraton mencerminkan jagad kecil (microcosmos) yang sejajar dengan jagad besar (macrocosmos). Sumbu imajiner dari Gunung Merapi di utara, melewati tugu, keraton, panggung krapyak, hingga Laut Selatan di ujung selatan — adalah representasi dari Sangkan Paraning Dumadi: perjalanan jiwa dari asal menuju tujuan akhir kehidupan.",
      "Yang membuat Keraton Yogyakarta unik dibanding istana-istana dunia adalah: ia masih dihuni dan difungsikan. Sri Sultan Hamengku Buwono X beserta keluarga masih tinggal di dalamnya. Setiap hari Selasa dan Kamis, pertunjukan seni tradisional digelar untuk umum. Pada hari-hari besar, prosesi adat yang megah masih berlangsung persis seperti ratusan tahun yang lalu.",
    ],
    fakta: [
      "Dibangun pada tahun 1755 oleh Sri Sultan Hamengku Buwono I",
      "Kompleks keraton seluas 14.000 m² dengan tembok setinggi 3,5 meter",
      "Masih aktif didiami Sri Sultan Hamengku Buwono X hingga kini",
      "Pertunjukan tari tradisional digelar rutin setiap Selasa dan Kamis",
      "Memiliki koleksi museum lebih dari 5.000 benda pusaka bersejarah",
      "Menjadi salah satu situs warisan budaya yang dilindungi UNESCO",
    ],
    relasi: [1, 5, 6],
  },

  // ── 5. TARI BEDHAYA ───────────────────────────────────────────────────
  {
    id: 5,
    nama: "Tari Bedhaya",
    kategori: "Tari",
    tagline: "Sembilan Langkah Menuju Kesucian Jiwa",
    deskripsi:
      "Tari Bedhaya adalah tarian paling sakral di Keraton Yogyakarta. Dibawakan oleh sembilan penari wanita dalam gerakan yang lembut namun penuh daya, tarian ini bukan pertunjukan biasa — melainkan persembahan suci yang menghubungkan dunia manusia dengan dunia spiritual.",
    gambar: "../src/assets/images/tari-bedhaya.png",
    featured: false,
    lokasi: "Keraton Ngayogyakarta Hadiningrat",
    waktu: "Upacara khusus keraton, tidak dipentaskan sembarangan",
    tiket: "Hanya pada acara resmi keraton",
    paragraf: [
      "Bedhaya dipentaskan pertama kali pada masa Sultan Agung, Raja Mataram terbesar, sekitar abad ke-17. Konon, tarian ini lahir dari pertemuan mistis Sultan Agung dengan Kanjeng Ratu Kidul — penguasa gaib Laut Selatan — yang mengajarkan langsung gerakannya. Sejak saat itu, Bedhaya menjadi milik keraton, bukan milik rakyat biasa.",
      "Sembilan penari yang membawakan Bedhaya bukan dipilih sembarangan. Mereka harus menjalani latihan bertahun-tahun, berpuasa sebelum pentas, dan menjalani ritual pembersihan diri. Angka sembilan bukan kebetulan: ia melambangkan walisongo (sembilan wali penyebar Islam di Jawa) sekaligus sembilan lubang dalam tubuh manusia sebagai pintu keluar-masuk jiwa.",
      "Gerakan Bedhaya sangat berbeda dari tari Jawa lainnya: lambat, halus, hampir seperti bergerak dalam air. Setiap perpindahan posisi tangan, setiap langkah kaki, setiap lirikan mata — semua memiliki makna yang hanya dipahami oleh mereka yang telah belajar bertahun-tahun. Bagi penonton yang tidak mengerti, Bedhaya mungkin terlihat monoton. Tapi bagi yang paham, setiap momen adalah puisi yang bergerak.",
    ],
    fakta: [
      "Lahir pada masa Sultan Agung sekitar abad ke-17 Masehi",
      "Hanya dipentaskan dalam upacara besar seperti penobatan sultan",
      "Para penari wajib berpuasa dan menjalani ritual sebelum pentas",
      "Durasi satu pertunjukan Bedhaya bisa mencapai 1,5 hingga 2 jam",
      "Kostum dan riasan penari mengikuti aturan baku keraton yang ketat",
      "Bedhaya Ketawang adalah varian paling sakral, tidak boleh direkam",
    ],
    relasi: [1, 3, 4],
  },

  // ── 6. SEKATEN ────────────────────────────────────────────────────────
  {
    id: 6,
    nama: "Sekaten",
    kategori: "Tradisi & Upacara",
    tagline: "Perayaan Lima Abad yang Masih Hidup",
    deskripsi:
      "Sekaten adalah perayaan Maulid Nabi Muhammad SAW yang telah berlangsung sejak abad ke-15. Lebih dari sekadar peringatan keagamaan, Sekaten adalah perayaan rakyat yang memadukan nilai Islam, tradisi Jawa, dan kegembiraan bersama dalam satu festival megah.",
    gambar: "../src/assets/images/sekaten.png",
    featured: false,
    lokasi: "Alun-alun Utara Keraton Yogyakarta",
    waktu:
      "Setiap bulan Maulid (kalender Jawa Hijriah), sekitar Oktober–November",
    tiket: "Gratis untuk area utama, pasar malam mulai Rp 5.000",
    paragraf: [
      "Tradisi Sekaten bermula pada masa Kerajaan Demak di abad ke-15, ketika para Wali Songo menggunakan gamelan keraton sebagai media dakwah untuk menarik perhatian masyarakat Jawa yang saat itu masih banyak memeluk Hindu-Buddha. Nama 'Sekaten' dipercaya berasal dari kata 'syahadatain' — dua kalimat syahadat — yang menjadi inti ajaran Islam.",
      "Puncak perayaan Sekaten adalah Grebeg Maulud: prosesi agung keluarnya gunungan dari dalam keraton. Gunungan adalah tumpukan hasil bumi berbentuk kerucut setinggi 2 meter yang dihias indah — ada gunungan lanang (laki-laki) berbentuk kerucut panjang, dan gunungan wadon (perempuan) berbentuk lebih lebar. Ribuan warga berebut bagian dari gunungan ini karena diyakini membawa berkah.",
      "Selama tujuh hari sebelum Grebeg Maulud, Gamelan Pusaka Keraton — Kyai Gunturmadu dan Kyai Nagawilaga — ditabuh siang dan malam di Masjid Agung. Kedua gamelan ini hanya dikeluarkan setahun sekali saat Sekaten. Masyarakat percaya, mendengar suara gamelan pusaka dan melilitkan benang di gigi akan mendatangkan keselamatan dan keberkahan sepanjang tahun.",
    ],
    fakta: [
      "Sekaten telah berlangsung lebih dari 500 tahun sejak zaman Kerajaan Demak",
      "Gamelan pusaka Kyai Gunturmadu hanya dibunyikan setahun sekali saat Sekaten",
      "Gunungan Grebeg Maulud bisa setinggi 2 meter dan beratnya ratusan kilogram",
      "Ribuan warga dari seluruh Jawa datang hanya untuk merebut bagian gunungan",
      "Pasar malam Sekaten berlangsung selama satu bulan penuh",
      "Tradisi ini ditetapkan sebagai Warisan Budaya Takbenda Indonesia",
    ],
    relasi: [2, 4, 7],
  },

  // ── 7. GUDEG ─────────────────────────────────────────────────────────
  {
    id: 7,
    nama: "Gudeg Yogyakarta",
    kategori: "Kuliner",
    tagline: "Rasa Manis yang Menyimpan Sejarah Panjang",
    deskripsi:
      "Gudeg bukan hanya makanan — ia adalah identitas Yogyakarta. Dimasak dengan kesabaran semalam suntuk menggunakan nangka muda, santan, dan gula aren, gudeg adalah manifestasi filosofi Jawa: sabar, lembut, dan penuh cita rasa kehidupan.",
    gambar: "../src/assets/images/gudeg-budaya.png",
    featured: false,
    lokasi: "Sentra Gudeg Wijilan & seluruh Yogyakarta",
    waktu: "Tersedia sepanjang hari, terbaik saat pagi hingga siang",
    tiket: "Rp 15.000 – Rp 50.000 per porsi",
    paragraf: [
      "Gudeg dipercaya sudah ada sejak zaman Kerajaan Mataram pada abad ke-16, ketika pohon nangka banyak tumbuh di hutan-hutan sekitar Kotagede. Para abdi dalem keraton mulai memasak nangka muda bersama santan dan rempah-rempah untuk konsumsi istana. Lambat laun, resep ini menyebar ke masyarakat dan menjadi hidangan ikonik yang tak terpisahkan dari identitas Yogyakarta.",
      "Rahasia kelezatan gudeg sejati terletak pada waktu dan kesabaran. Nangka muda dipotong kecil-kecil, kemudian dimasak bersama santan kental, gula aren, daun salam, lengkuas, dan berbagai rempah dalam kendil tanah liat selama 4–8 jam. Api harus dijaga kecil dan stabil. Hasilnya adalah gudeg berwarna cokelat gelap, manis, gurih, dengan tekstur yang lembut berserat.",
      "Di Yogyakarta, gudeg terbagi menjadi dua jenis: gudeg basah dan gudeg kering. Gudeg basah memiliki kuah santan (areh) yang kental dan creamy, cocok dimakan langsung di tempat. Gudeg kering dipanaskan lebih lama hingga hampir tak berkuah — ia bisa bertahan 3–4 hari tanpa kulkas dan menjadi pilihan utama oleh-oleh. Sentra gudeg terenak ada di Kampung Wijilan, tak jauh dari pintu selatan Keraton.",
    ],
    fakta: [
      "Gudeg telah ada sejak zaman Kerajaan Mataram abad ke-16",
      "Proses memasak gudeg sejati membutuhkan waktu 4–8 jam tanpa henti",
      "Gudeg kering bisa bertahan 3–4 hari tanpa kulkas",
      "Sentra gudeg Wijilan memiliki lebih dari 30 warung berjajar",
      "Yogyakarta dijuluki 'Kota Gudeg' karena kuliner ini jadi ikon utamanya",
      "Gudeg biasanya disajikan dengan nasi, opor ayam, krecek, dan telur bacem",
    ],
    relasi: [4, 6, 8],
  },

  // ── 8. PRAMBANAN ─────────────────────────────────────────────────────
  {
    id: 8,
    nama: "Candi Prambanan",
    kategori: "Sejarah & Keraton",
    tagline: "Keajaiban Batu yang Mengangkasa",
    deskripsi:
      "Candi Prambanan adalah mahakarya arsitektur Hindu terbesar di Asia Tenggara. Dibangun pada abad ke-9 dengan lebih dari 240 candi, kompleks ini adalah bukti kejayaan peradaban Jawa kuno yang menempatkan manusia dalam hubungan harmonis dengan semesta.",
    gambar: "../src/assets/images/candi-prambanan.png",
    featured: false,
    lokasi: "Jl. Raya Solo KM 16, Sleman, Yogyakarta",
    waktu: "Setiap hari, 06.00 – 17.00 WIB",
    tiket: "Rp 50.000 (domestik), Rp 325.000 (mancanegara)",
    paragraf: [
      "Candi Prambanan atau Roro Jonggrang dibangun pada masa Kerajaan Mataram Kuno sekitar abad ke-9 Masehi oleh Raja Rakai Pikatan sebagai persembahan kepada Trimurti Hindu: Brahma (pencipta), Wisnu (pemelihara), dan Siwa (pemusnah). Tiga candi utama berdiri megah di tengah, masing-masing mencapai ketinggian 47 meter — menjulang ke langit seolah hendak menyentuh surga.",
      "Yang membuat para arkeolog terkagum-kagum adalah ketepatan teknis bangunan ini. Tanpa alat modern, tanpa semen Portland, para pembangun abad ke-9 berhasil menyusun jutaan batu andesit dengan presisi milimeter. Sistem interlock batu mereka — yang disebut 'teknik adu manis' — terbukti lebih tahan gempa dibanding bangunan beton modern. Ini terbukti ketika gempa 2006 merobohkan banyak bangunan di sekitarnya namun candi utama tetap berdiri.",
      "Setiap dinding candi dihiasi relief yang menceritakan kisah Ramayana dan Krishnayana secara berurutan — sebuah 'buku bergambar' dari batu yang dibaca dengan cara berjalan mengelilingi candi searah jarum jam (pradaksina). Jika dibaca seluruhnya, relief Prambanan sepanjang lebih dari 300 meter ini bercerita tentang cinta, pengkhianatan, kesetiaan, dan kemenangan kebenaran atas kejahatan.",
    ],
    fakta: [
      "Dibangun sekitar abad ke-9 oleh Raja Rakai Pikatan, Kerajaan Mataram Kuno",
      "Candi induk setinggi 47 meter, tertinggi di antara semua candi Hindu di Asia Tenggara",
      "Kompleks aslinya terdiri dari 240 candi, kini sebagian besar masih reruntuhan",
      "Ditetapkan sebagai Situs Warisan Dunia UNESCO pada tahun 1991",
      "Relief Ramayana di dindingnya sepanjang lebih dari 300 meter",
      "Setiap malam purnama, pertunjukan Sendratari Ramayana digelar di panggung terbuka",
    ],
    relasi: [4, 6, 5],
  },

  // ── 9. LUDRUK / KETOPRAK ─────────────────────────────────────────────
  {
    id: 9,
    nama: "Ketoprak",
    kategori: "Seni Pertunjukan",
    tagline: "Teater Rakyat yang Tak Pernah Sunyi",
    deskripsi:
      "Ketoprak adalah teater rakyat Jawa yang memadukan dialog, tembang, tari, dan humor dalam satu panggung. Berbeda dengan wayang yang sakral, ketoprak adalah milik semua orang — ia lahir di kampung, tumbuh di pasar malam, dan hidup dalam tawa bersama.",
    gambar: "../src/assets/images/ketoprak.png",
    featured: false,
    lokasi: "Taman Budaya Yogyakarta & gedung pertunjukan DIY",
    waktu: "Sesuai jadwal pertunjukan, biasanya akhir pekan",
    tiket: "Rp 25.000 – Rp 100.000",
    paragraf: [
      "Ketoprak lahir pada akhir abad ke-19 di Surakarta, kemudian berkembang pesat di Yogyakarta. Berbeda dengan wayang kulit yang menggunakan boneka, atau tari klasik yang penuh aturan, ketoprak dimainkan oleh manusia sungguhan dengan kostum teatrikal. Lakonnya diambil dari kisah sejarah kerajaan Jawa, legenda rakyat, hingga cerita fiktif karangan penulis naskah — semua dibawakan dengan gaya khas yang memadukan keseriusan dan kelucuan.",
      "Yang membuat ketoprak dicintai adalah karakternya yang luwes. Para pemain ketoprak terkenal dengan kemampuan improvisasi mereka — ketika naskah berbicara tentang raja yang murka, sang pemain bisa tiba-tiba mengubah suasana dengan lelucon yang membuat penonton tertawa terbahak-bahak. Humor dalam ketoprak bukan pelarian dari keseriusan, melainkan cara cerdas untuk menyampaikan kritik sosial dan kebenaran.",
      "Di era televisi, ketoprak sempat menemukan pamor barunya lewat siaran Ketoprak Humor di TVRI yang ditonton jutaan orang. Kini, ketoprak berjuang mempertahankan eksistensinya di tengah gempuran hiburan digital. Namun di Yogyakarta, semangat ketoprak tetap menyala — Taman Budaya Yogyakarta dan berbagai komunitas seni terus menggelar pertunjukan, membuktikan bahwa teater rakyat ini belum usai ceritanya.",
    ],
    fakta: [
      "Ketoprak lahir pada akhir abad ke-19 dan berkembang pesat di Yogyakarta",
      "Pemain ketoprak terkenal dengan kemampuan improvisasi yang tinggi",
      "Ketoprak Humor di TVRI pernah menjadi acara favorit jutaan penonton Indonesia",
      "Satu grup ketoprak profesional bisa terdiri dari 30–50 pemain dan kru",
      "Lakon ketoprak bisa berlangsung 3–5 jam tanpa jeda panjang",
      "Yogyakarta memiliki lebih dari 15 grup ketoprak aktif hingga kini",
    ],
    relasi: [1, 3, 5],
  },

  // ── 10. KERAJINAN PERAK KOTAGEDE ──────────────────────────────────────
  {
    id: 10,
    nama: "Kerajinan Perak Kotagede",
    kategori: "Kerajinan",
    tagline: "Kemewahan yang Lahir dari Tangan Pengrajin",
    deskripsi:
      "Kotagede adalah jantung kerajinan perak Yogyakarta — sebuah kampung tua yang menyimpan tradisi menempa logam mulia selama lebih dari empat abad. Di sinilah perhiasan, miniatur, dan ukiran perak terindah di Indonesia lahir dari tangan para seniman yang mewarisi ilmu leluhur.",
    gambar: "../src/assets/images/perak-kotagede.png",
    featured: false,
    lokasi: "Kampung Kotagede, Yogyakarta (15 menit dari pusat kota)",
    waktu: "Toko dan workshop buka setiap hari 08.00–17.00 WIB",
    tiket: "Gratis melihat, workshop mulai Rp 100.000",
    paragraf: [
      "Tradisi kerajinan perak di Kotagede dimulai sejak berdirinya Kerajaan Mataram pada abad ke-16. Para raja Mataram mempekerjakan pengrajin terbaik untuk membuat perhiasan, perlengkapan upacara, dan aksesori kerajaan dari perak murni. Keahlian ini kemudian turun-temurun kepada anak cucu, membentuk komunitas pengrajin perak yang solid dan terus berinovasi hingga hari ini.",
      "Proses pembuatan kerajinan perak Kotagede dimulai dari perak batangan yang dilebur, kemudian ditempa, ditarik menjadi kawat atau lembaran, dibentuk dengan tangan menggunakan tang dan pahat khusus, lalu disolder, dipoles, dan difinishing. Yang membedakan perak Kotagede adalah teknik filigree — seni menyusun kawat perak tipis menjadi pola ornamen yang sangat detail, seperti renda logam yang terkristalisasi.",
      "Hari ini, Kotagede adalah kampung kreatif yang bertransformasi tanpa kehilangan akarnya. Di antara workshop tradisional berjajar galeri kontemporer yang memamerkan perhiasan perak dengan desain modern tetapi tetap menggunakan teknik tangan warisan leluhur. Para pengrajin muda Kotagede tidak hanya melanjutkan tradisi — mereka mengangkatnya ke level seni internasional.",
    ],
    fakta: [
      "Tradisi kerajinan perak Kotagede telah berlangsung lebih dari 400 tahun",
      "Perak Kotagede menggunakan perak 925 (sterling silver) berkualitas tinggi",
      "Teknik filigree Kotagede adalah yang paling halus di Indonesia",
      "Produk perak Kotagede telah diekspor ke lebih dari 30 negara",
      "Kotagede memiliki lebih dari 100 usaha kerajinan perak aktif",
      "UNESCO mengakui kerajinan perak Kotagede sebagai warisan budaya penting",
    ],
    relasi: [2, 4, 7],
  },
];

// ══════════════════════════════════════════════════════════════════════════
// DATA ARTIKEL (untuk ArtikelBudaya)
// ══════════════════════════════════════════════════════════════════════════
export const dataArtikel = [
  {
    id: 1,
    judul:
      "Filosofi di Balik Motif Batik Parang: Kekuatan yang Tak Pernah Padam",
    kategori: "Batik",
    penulis: "Tim Hiling Semata",
    tanggal: "10 Mei 2025",
    menit: "5 menit",
    ringkasan:
      "Motif Parang bukan sekadar ornamen kain. Di balik garis diagonal yang berulang, tersimpan filosofi tentang ombak samudra yang tak pernah berhenti — simbol kekuatan, semangat, dan tekad yang pantang menyerah.",
    gambar: "../src/assets/images/batikyogyakarta.png",
    featured: true,
  },
  {
    id: 2,
    judul: "Semalam Bersama Dalang: Menyelami Dunia Wayang dari Balik Layar",
    kategori: "Wayang",
    penulis: "Tim Hiling Semata",
    tanggal: "3 Mei 2025",
    menit: "7 menit",
    ringkasan:
      "Kami menghabiskan satu malam penuh bersama Ki Seno Nugroho, salah satu dalang terbaik Yogyakarta. Dari persiapan sebelum pentas hingga momen magis saat wayang hidup di tangan sang maestro.",
    gambar: "../src/assets/images/wayangkulit.png",
    featured: false,
  },
  {
    id: 3,
    judul: "Keraton Bukan Museum: Mengapa Istana Tertua Ini Masih Berdenyut",
    kategori: "Sejarah & Keraton",
    penulis: "Tim Hiling Semata",
    tanggal: "25 Apr 2025",
    menit: "6 menit",
    ringkasan:
      "Banyak yang mengira Keraton Yogyakarta hanyalah museum bersejarah. Faktanya, di balik tembok putih setinggi 3,5 meter itu, kehidupan istana masih berjalan — dari latihan tari hingga upacara adat yang tak pernah berhenti.",
    gambar: "../src/assets/images/keraton.png",
    featured: false,
  },
  {
    id: 4,
    judul: "Gudeg Wijilan: Mencari Sepiring Sejarah di Sudut Kota Tua",
    kategori: "Kuliner",
    penulis: "Tim Hiling Semata",
    tanggal: "18 Apr 2025",
    menit: "4 menit",
    ringkasan:
      "Pukul 05.00 pagi, Kampung Wijilan sudah ramai. Asap mengepul dari kendil-kendil tanah liat yang memasak gudeg sejak tengah malam. Kami mencari tahu: apa yang membuat gudeg Yogyakarta berbeda dari semua masakan manis di dunia?",
    gambar: "../src/assets/images/gudeg-budaya.png",
    featured: false,
  },
  {
    id: 5,
    judul: "Gamelan dan NASA: Ketika Musik Jawa Meluncur ke Luar Angkasa",
    kategori: "Kesenian",
    penulis: "Tim Hiling Semata",
    tanggal: "10 Apr 2025",
    menit: "5 menit",
    ringkasan:
      "Pada 1977, NASA memasukkan rekaman gamelan Jawa ke dalam Voyager Golden Record yang diluncurkan ke luar angkasa. Ini bukan kebetulan. Ilmuwan NASA percaya gamelan adalah salah satu suara paling mewakili keindahan peradaban manusia.",
    gambar: "../src/assets/images/gamelan.png",
    featured: false,
  },
  {
    id: 6,
    judul: "Tari Bedhaya: Ketika Tubuh Menjadi Doa yang Bergerak",
    kategori: "Tari",
    penulis: "Tim Hiling Semata",
    tanggal: "1 Apr 2025",
    menit: "6 menit",
    ringkasan:
      "Sembilan penari wanita bergerak dalam kesatuan yang hampir supernatural. Tidak ada satu gerakan yang terburu-buru, tidak ada satu langkah yang sembarangan. Ini bukan pertunjukan — ini persembahan.",
    gambar: "../src/assets/images/tari-bedhaya.png",
    featured: false,
  },
  {
    id: 7,
    judul:
      "Prambanan di Fajar: Pengalaman Melihat Keajaiban Sebelum Dunia Bangun",
    kategori: "Sejarah & Keraton",
    penulis: "Tim Hiling Semata",
    tanggal: "22 Mar 2025",
    menit: "4 menit",
    ringkasan:
      "Kami tiba di Prambanan pukul 05.30 pagi, saat tiket belum buka dan matahari baru mulai mengintip. Yang kami temukan adalah versi Prambanan yang hampir tidak pernah dilihat wisatawan — sunyi, mistis, dan luar biasa indah.",
    gambar: "../src/assets/images/candi-prambanan.png",
    featured: false,
  },
  {
    id: 8,
    judul: "Kotagede: Kampung Tua yang Menempa Mimpi dari Perak",
    kategori: "Kerajinan",
    penulis: "Tim Hiling Semata",
    tanggal: "15 Mar 2025",
    menit: "5 menit",
    ringkasan:
      "Di balik gang-gang sempit Kotagede, ratusan pengrajin perak bekerja dari pagi hingga sore. Tangan-tangan terampil mereka mewarisi ilmu yang telah berumur empat abad — dan kini mengangkatnya ke panggung dunia.",
    gambar: "../src/assets/images/perak-kotagede.png",
    featured: false,
  },
  {
    id: 9,
    judul: "Sekaten 2025: Ketika Lima Abad Tradisi Bertemu Generasi Z",
    kategori: "Tradisi & Upacara",
    penulis: "Tim Hiling Semata",
    tanggal: "5 Mar 2025",
    menit: "6 menit",
    ringkasan:
      "Tahun ini, ribuan anak muda memenuhi alun-alun untuk menyaksikan Sekaten — bukan karena kewajiban, tapi karena penasaran. Kami berbicara dengan mereka: apa arti Sekaten bagi generasi yang tumbuh bersama TikTok?",
    gambar: "../src/assets/images/sekaten.png",
    featured: false,
  },
  {
    id: 10,
    judul: "Ketoprak di Abad 21: Teater Rakyat yang Menolak Mati",
    kategori: "Seni Pertunjukan",
    penulis: "Tim Hiling Semata",
    tanggal: "22 Feb 2025",
    menit: "7 menit",
    ringkasan:
      "Di era Netflix dan YouTube, ketoprak masih bertahan — bahkan berkembang. Komunitas-komunitas muda di Yogyakarta membuktikan bahwa teater rakyat warisan nenek moyang ini bisa berbicara dalam bahasa anak zaman.",
    gambar: "../src/assets/images/ketoprak.png",
    featured: false,
  },
];

// ══════════════════════════════════════════════════════════════════════════
// DATA HIGHLIGHT (Section Mengenal DIY di ListBudaya)
// ══════════════════════════════════════════════════════════════════════════
export const dataHighlight = [
  {
    id: 1,
    judul: "Seni Pertunjukan",
    deskripsi:
      "Wayang, tari, gamelan, ketoprak, dan berbagai bentuk seni yang telah hidup selama ratusan tahun dan terus menemukan penontonnya.",
    gambar: "../src/assets/images/wayangkulit.png",
    icon: "../src/assets/icons/icon-seni.png",
    fallbackIcon: "🎭",
  },
  {
    id: 2,
    judul: "Keraton & Sejarah",
    deskripsi:
      "Pusat kebudayaan Jawa yang menjaga nilai-nilai luhur, tradisi istana, dan sejarah panjang yang masih hidup hingga hari ini.",
    gambar: "../src/assets/images/keraton.png",
    icon: "../src/assets/icons/icon-keraton.png",
    fallbackIcon: "🏛️",
    featured: true,
  },
  {
    id: 3,
    judul: "Kearifan Lokal",
    deskripsi:
      "Tradisi, adat, kuliner, dan filosofi hidup masyarakat Jawa yang menjadi pedoman dan warisan untuk generasi mendatang.",
    gambar: "../src/assets/images/batikyogyakarta.png",
    icon: "../src/assets/icons/icon-kearifan.png",
    fallbackIcon: "🌸",
  },
];

// ══════════════════════════════════════════════════════════════════════════
// DATA KATEGORI GRID (6 ikon di ListBudaya)
// ══════════════════════════════════════════════════════════════════════════
export const dataKategoriGrid = [
  {
    id: 1,
    nama: "Seni & Pertunjukan",
    icon: "../src/assets/icons/icon-seni.png",
    fallbackIcon: "🎭",
    path: "/budaya?kategori=seni",
  },
  {
    id: 2,
    nama: "Tradisi & Adat",
    icon: "../src/assets/icons/icon-tradisi.png",
    fallbackIcon: "🌸",
    path: "/budaya?kategori=tradisi",
  },
  {
    id: 3,
    nama: "Bahasa & Sastra",
    icon: "../src/assets/icons/icon-bahasa.png",
    fallbackIcon: "📜",
    path: "/budaya?kategori=bahasa",
  },
  {
    id: 4,
    nama: "Kuliner Tradisional",
    icon: "../src/assets/icons/icon-kuliner.png",
    fallbackIcon: "🍲",
    path: "/budaya?kategori=kuliner",
  },
  {
    id: 5,
    nama: "Peninggalan Sejarah",
    icon: "../src/assets/icons/icon-sejarah.png",
    fallbackIcon: "🏛️",
    path: "/budaya?kategori=sejarah",
  },
  {
    id: 6,
    nama: "Agenda & Event",
    icon: "../src/assets/icons/icon-agenda.png",
    fallbackIcon: "📅",
    path: "/budaya?kategori=agenda",
  },
];

// ══════════════════════════════════════════════════════════════════════════
// DATA OPEN TRIP
// ══════════════════════════════════════════════════════════════════════════
export const dataOpenTrip = [
  {
    id: 1,
    nama: "Kraton Yogyakarta",
    harga: "Rp 150.000",
    gambar: "../src/assets/images/keraton-budaya.png",
    deskripsi:
      "Telusuri sejarah dan nilai-nilai luhur di pusat kerajaan Jawa bersama pemandu berpengalaman.",
  },
  {
    id: 2,
    nama: "Desa Wisata Kasongan",
    harga: "Rp 120.000",
    gambar: "../src/assets/images/kasongan-budaya.png",
    deskripsi:
      "Lihat langsung proses kerajinan gerabah khas Jogja dan coba membuat sendiri.",
  },
  {
    id: 3,
    nama: "Saksikan Wayang Kulit",
    harga: "Rp 200.000",
    gambar: "../src/assets/images/pertunjukan-wayang.png",
    deskripsi:
      "Nikmati pertunjukan wayang kulit semalam suntuk dengan dalang berpengalaman.",
  },
  {
    id: 4,
    nama: "Belajar Membatik",
    harga: "Rp 175.000",
    gambar: "../src/assets/images/membatik-budaya.png",
    deskripsi:
      "Pengalaman membatik langsung bersama pengrajin lokal di kampung batik.",
  },
];

// ══════════════════════════════════════════════════════════════════════════
// FILTER & NAVIGASI
// ══════════════════════════════════════════════════════════════════════════
export const kategoriList = [
  {
    nama: "Semua",
    svg: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z",
  },
  {
    nama: "Tari",
    svg: "M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2zm0 12c-5 0-9 2.5-9 4v2h18v-2c0-1.5-4-4-9-4z",
  },
  {
    nama: "Wayang",
    svg: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z",
  },
  { nama: "Batik", svg: "M12 3L2 12h3v9h6v-6h2v6h6v-9h3z" },
  {
    nama: "Kuliner",
    svg: "M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7H1v-2h15.03v2zm0-4H1v-2h15.03v2z",
  },
  {
    nama: "Sejarah & Keraton",
    svg: "M12 3L2 12h3v9h6v-6h2v6h6v-9h3L12 3zm0 12.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
  },
  {
    nama: "Tradisi & Upacara",
    svg: "M17 8C8 10 5.9 16.17 3.82 20.49L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c4-1 6-5 6-5s-4 1-5 3c0 0 3-8 9-10z",
  },
  {
    nama: "Kesenian",
    svg: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z",
  },
  {
    nama: "Arsitektur",
    svg: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  },
];

export const sidebarKat = [
  { nama: "Tari Tradisional", ikon: "💃" },
  { nama: "Wayang", ikon: "🎭" },
  { nama: "Batik", ikon: "🎨" },
  { nama: "Kuliner", ikon: "🍽️" },
  { nama: "Sejarah & Keraton", ikon: "🏛️" },
  { nama: "Tradisi & Upacara", ikon: "🌸" },
  { nama: "Kesenian", ikon: "🎶" },
  { nama: "Arsitektur", ikon: "🏯" },
];
