export type DestinationCategory =
  | 'Wisata Alam'
  | 'Trekking'
  | 'Desa Wisata'
  | 'Kuliner';

export type OperationalStatus = 'Buka' | 'Terbatas';

export interface TrailPoint {
  time: string;
  title: string;
  elevation: string;
  note: string;
}

export interface DestinationItem {
  id: string;
  kind: 'destination';
  title: string;
  category: DestinationCategory;
  distanceKm: number;
  locationLabel: string;
  rating: number;
  reviewCount: number;
  pricePerPerson: number;
  status: OperationalStatus;
  jamBuka: string;
  statusNote: string;
  difficulty: 'Santai' | 'Menengah' | 'Menanjak';
  elevationMdpl: number;
  durationLabel: string;
  image: string;
  summary: string;
  highlights: string[];
  localTip: string;
  guideName: string;
  itineraryPreview: TrailPoint[];
}

export interface HomestayItem {
  id: string;
  kind: 'homestay';
  title: string;
  villageZone: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  maxGuests: number;
  roomsLabel: string;
  status: OperationalStatus;
  checkInOut: string;
  image: string;
  summary: string;
  amenities: string[];
  hostName: string;
  unavailableDays: number[];
}

export interface ItineraryStop {
  id: string;
  time: string;
  title: string;
  area: string;
  duration: string;
  description: string;
  localTip: string;
  destinationId: string;
}

export interface TrailRoute {
  id: string;
  name: string;
  difficulty: 'Santai' | 'Menengah' | 'Menanjak';
  distanceKm: number;
  duration: string;
  elevationGain: string;
  surface: string;
  status: OperationalStatus;
  statusText: string;
  profilePoints: number[];
  waypoints: {
    km: string;
    name: string;
    altitude: string;
    detail: string;
  }[];
}

export interface BookingRecord {
  id: string;
  code: string;
  itemId: string;
  itemTitle: string;
  kind: 'destination' | 'homestay';
  image: string;
  dateLabel: string;
  guests: number;
  nights: number;
  packageLabel: string;
  totalPrice: number;
  guestName: string;
  whatsapp: string;
  statusText: string;
  jamBuka: string;
  createdAt: string;
}

export const HERO_IMAGE = '/src/assets/images/lereng_hero_terrace_1794886537870.jpg';

export const DESTINATIONS: DestinationItem[] = [
  {
    id: 'terasering-kabut',
    kind: 'destination',
    title: 'Terasering Sawah & Gardu Pandang Kabut',
    category: 'Wisata Alam',
    distanceKm: 1.2,
    locationLabel: 'Dusun Krajan Atas',
    rating: 4.9,
    reviewCount: 328,
    pricePerPerson: 25000,
    status: 'Buka',
    jamBuka: '05:30 – 17:30 WIB',
    statusNote: 'Kabut pagi terbaik pukul 05:45 – 07:15',
    difficulty: 'Santai',
    elevationMdpl: 1240,
    durationLabel: '2 – 3 jam',
    image: HERO_IMAGE,
    summary:
      'Anjungan kayu ulin menghadap terasering padi organik berundak dengan pemandangan kabut lembah dan deretan pinus gunung.',
    highlights: [
      'Akses jalan setapak batu ramah keluarga',
      'Spot matahari terbit dari anjungan timur',
      'Teh jahe hangat gratis di pos jaga desa',
    ],
    localTip:
      'Datang sebelum pukul 06:00 WIB dan bawa jaket windbreaker; suhu pagi berkisar 16–18°C.',
    guideName: 'Pak Darmawan',
    itineraryPreview: [
      {
        time: '05:30',
        title: 'Check-in Pos Gardu Timur',
        elevation: '1.210 mdpl',
        note: 'Pembagian senter kepala bila kabut masih tebal.',
      },
      {
        time: '06:00',
        title: 'Matahari Terbit di Anjungan Terasering',
        elevation: '1.240 mdpl',
        note: 'Nikmati seduhan teh jahe gula aren hangat.',
      },
      {
        time: '07:15',
        title: 'Jalan Santai Pematang Sawah Organik',
        elevation: '1.190 mdpl',
        note: 'Interaksi langsung dengan petani padi varietas lokal.',
      },
    ],
  },
  {
    id: 'curug-pinusan',
    kind: 'destination',
    title: 'Curug Pinusan Tujuh Tingkat',
    category: 'Wisata Alam',
    distanceKm: 2.8,
    locationLabel: 'Lembah Hutan Pinus',
    rating: 4.8,
    reviewCount: 214,
    pricePerPerson: 35000,
    status: 'Buka',
    jamBuka: '07:00 – 16:30 WIB',
    statusNote: 'Debit air jernih dan aman untuk berendam di kolam bawah',
    difficulty: 'Menengah',
    elevationMdpl: 1120,
    durationLabel: '3 – 4 jam',
    image: '/src/assets/images/lereng_waterfall_pine_1794886538466.jpg',
    summary:
      'Air terjun bertingkat di tengah hutan pinus dan pakis purba dengan jembatan kayu alami serta kolam batu vulkanik jernih.',
    highlights: [
      '7 tingkat aliran air jernih dari mata air gunung',
      'Jalur trekking teduh di bawah kanopi pinus',
      'Ruang bilas bambu & loker barang tersedia',
    ],
    localTip:
      'Gunakan sandal gunung atau sepatu anti-selip karena bebatuan di dekat jembatan kayu cenderung lembap.',
    guideName: 'Mas Rendra',
    itineraryPreview: [
      {
        time: '07:30',
        title: 'Mulai Trekking Gerbang Hutan Pinus',
        elevation: '1.180 mdpl',
        note: 'Jalur landai melewati kebun kapulaga warga.',
      },
      {
        time: '08:20',
        title: 'Jembatan Kayu & Kolam Tingkat Tiga',
        elevation: '1.120 mdpl',
        note: 'Istirahat, foto, dan nikmati air pegunungan.',
      },
    ],
  },
  {
    id: 'puncak-watu-lintang',
    kind: 'destination',
    title: 'Jalur Puncak Awan Watu Lintang',
    category: 'Trekking',
    distanceKm: 4.1,
    locationLabel: 'Punggungan Bukit Timur',
    rating: 4.9,
    reviewCount: 189,
    pricePerPerson: 75000,
    status: 'Terbatas',
    jamBuka: '04:30 – 11:00 WIB',
    statusNote: 'Kuota 40 pendaki/hari · Tutup saat angin kencang',
    difficulty: 'Menanjak',
    elevationMdpl: 1680,
    durationLabel: '4 – 5 jam',
    image: '/src/assets/images/lereng_sunrise_ridge_1794886539958.jpg',
    summary:
      'Rute punggungan bukit berpadu lautan awan pagi dengan panorama dua puncak gunung berapi dan padang edelweis liar.',
    highlights: [
      'Termasuk pemandu lokal bersertifikat Pokdarwis',
      'Pemandangan lautan awan 360 derajat',
      'Sarapan bekal nasi bakar di Pos 2',
    ],
    localTip:
      'Wajib mendaftar minimal H-1 agar pemandu menyiapkan surat izin jalur dan logistik sarapan pagi.',
    guideName: 'Kang Bagus',
    itineraryPreview: [
      {
        time: '04:30',
        title: 'Briefing & Doa Bersama di Basecamp',
        elevation: '1.260 mdpl',
        note: 'Pengecekan headlamp dan air minum minimal 1,5 L.',
      },
      {
        time: '05:45',
        title: 'Puncak Punggungan Watu Lintang',
        elevation: '1.680 mdpl',
        note: 'Menyambut matahari terbit di atas lautan awan.',
      },
    ],
  },
  {
    id: 'kampung-kopi-gerabah',
    kind: 'destination',
    title: 'Kampung Kopi Arabika & Sangrai Gerabah',
    category: 'Desa Wisata',
    distanceKm: 0.6,
    locationLabel: 'Dusun Tengah',
    rating: 4.9,
    reviewCount: 162,
    pricePerPerson: 85000,
    status: 'Buka',
    jamBuka: '08:00 – 17:00 WIB',
    statusNote: 'Sesi sangrai tradisional setiap pukul 09:00 & 14:00',
    difficulty: 'Santai',
    elevationMdpl: 1215,
    durationLabel: '2 jam',
    image: '/src/assets/images/lereng_coffee_village_1794886539833.jpg',
    summary:
      'Belajar memetik ceri kopi merah di kebun warga dan menyangrai biji Arabika ketinggian dengan tungku tanah liat bersama pengrajin desa.',
    highlights: [
      'Cicipi 3 metode seduh kopi Lereng Asri',
      'Bawa pulang 100g biji sangrai hasil sendiri',
      'Jajanan singkong keju & pisang rebus hangat',
    ],
    localTip:
      'Sesi pagi pukul 09:00 biasanya bertepatan dengan penjemuran ceri kopi di beranda kayu Ibu Sari.',
    guideName: 'Ibu Sari',
    itineraryPreview: [
      {
        time: '09:00',
        title: 'Petik Ceri Merah Kebun Belakang',
        elevation: '1.215 mdpl',
        note: 'Memilih buah kopi matang sempurna.',
      },
      {
        time: '09:45',
        title: 'Menyangrai dengan Kuali Gerabah',
        elevation: '1.215 mdpl',
        note: 'Mengatur bara kayu kopi hingga tingkat medium roast.',
      },
    ],
  },
  {
    id: 'kebun-teh-jamu',
    kind: 'destination',
    title: 'Kebun Teh Organik & Sentra Jamu Lereng',
    category: 'Desa Wisata',
    distanceKm: 1.8,
    locationLabel: 'Lereng Barat',
    rating: 4.7,
    reviewCount: 94,
    pricePerPerson: 45000,
    status: 'Buka',
    jamBuka: '07:30 – 16:00 WIB',
    statusNote: 'Panen pucuk teh berlangsung pagi hari',
    difficulty: 'Santai',
    elevationMdpl: 1310,
    durationLabel: '2 jam',
    image: HERO_IMAGE,
    summary:
      'Menyusuri hamparan kebun teh tanpa pestisida sekaligus meracik wedang rempah dan jamu kunyit asam hangat di rumah produksi desa.',
    highlights: [
      'Tur kebun teh & pengenalan tanaman toga',
      'Workshop meracik wedang uwuh khas lereng',
      'Suasana sejuk dan minim tanjakan curam',
    ],
    localTip:
      'Cocok untuk kunjungan siang hari karena udara kebun tetap sejuk di kisaran 21°C.',
    guideName: 'Mbak Ratna',
    itineraryPreview: [
      {
        time: '10:00',
        title: 'Jalan Pagi Blok Teh Hijau',
        elevation: '1.310 mdpl',
        note: 'Mengenal pucuk peko dan proses layu daun.',
      },
      {
        time: '11:00',
        title: 'Racik Wedang Rempah di Pendopo',
        elevation: '1.290 mdpl',
        note: 'Menyeduh langsung dengan gula semut organik.',
      },
    ],
  },
  {
    id: 'pasar-tani-subuh',
    kind: 'destination',
    title: 'Pasar Tani Subuh & Jajanan Ndeso',
    category: 'Kuliner',
    distanceKm: 0.3,
    locationLabel: 'Alun-Alun Balai Desa',
    rating: 4.8,
    reviewCount: 241,
    pricePerPerson: 15000,
    status: 'Terbatas',
    jamBuka: '05:30 – 10:30 WIB',
    statusNote: 'Buka setiap hari, paling ramai Sabtu & Minggu',
    difficulty: 'Santai',
    elevationMdpl: 1180,
    durationLabel: '1,5 jam',
    image: '/src/assets/images/lereng_coffee_village_1794886539833.jpg',
    summary:
      'Pasar tradisional beratap bambu dengan aneka nasi jagung, tiwul ayu, getuk lindri, serta sayuran segar hasil panen pagi petani setempat.',
    highlights: [
      'Transaksi langsung memakai koin kayu desa atau QRIS',
      'Lebih dari 25 lapak kuliner rumahan warga',
      'Bebas kemasan plastik sekali pakai',
    ],
    localTip:
      'Bawa tas belanja kain sendiri dan tukarkan uang kecil di loket pintu masuk pasar.',
    guideName: 'Ibu Warti',
    itineraryPreview: [
      {
        time: '06:30',
        title: 'Sarapan Nasi Jagung & Tempe Mendoan',
        elevation: '1.180 mdpl',
        note: 'Disajikan di atas pincuk daun pisang hangat.',
      },
    ],
  },
];

export const HOMESTAYS: HomestayItem[] = [
  {
    id: 'pondok-lembah-kabut',
    kind: 'homestay',
    title: 'Pondok Bambu Lembah Kabut',
    villageZone: 'Tepi Terasering Timur',
    distanceKm: 0.9,
    rating: 4.9,
    reviewCount: 118,
    pricePerNight: 480000,
    maxGuests: 4,
    roomsLabel: '2 Kamar Kayu Jati · Teras Valley View',
    status: 'Buka',
    checkInOut: 'Check-in 14:00 · Check-out 11:00 WIB',
    image: '/src/assets/images/lereng_bamboo_homestay_1794886539092.jpg',
    summary:
      'Pondok panggung anyaman bambu dan kayu jati dengan dek luas menghadap hamparan lembah berkabut, lengkap dengan sarapan rumahan dan kopi tubruk pagi.',
    amenities: [
      'Air hangat tenaga surya',
      'Sarapan desa untuk semua tamu',
      'Tungku perapian teras malam',
      'Wi-Fi Fiber Desa 30 Mbps',
    ],
    hostName: 'Keluarga Pak Hendro & Ibu Tutik',
    unavailableDays: [18, 21, 22, 28],
  },
  {
    id: 'omah-kayu-terasering',
    kind: 'homestay',
    title: 'Omah Kayu Terasering',
    villageZone: 'Dusun Krajan Atas',
    distanceKm: 1.1,
    rating: 4.8,
    reviewCount: 86,
    pricePerNight: 390000,
    maxGuests: 2,
    roomsLabel: '1 Kamar Loft · Balkon Sawah',
    status: 'Buka',
    checkInOut: 'Check-in 13:00 · Check-out 11:00 WIB',
    image: HERO_IMAGE,
    summary:
      'Kabin intim untuk pasangan atau pelancong solo dengan pintu geser kayu menghadap langsung petak sawah bertingkat.',
    amenities: [
      'Akses jalur sunrise pribadi',
      'Seduhan teh & kopi Arabika sepuasnya',
      'Water heater & selimut wol tebal',
      'Sepeda gunung pinjaman',
    ],
    hostName: 'Keluarga Mas Yoga',
    unavailableDays: [17, 20, 24, 29],
  },
  {
    id: 'bale-keluarga-cemara',
    kind: 'homestay',
    title: 'Bale Desa Keluarga Cemara',
    villageZone: 'Dekat Kebun Kopi Tengah',
    distanceKm: 0.5,
    rating: 4.9,
    reviewCount: 74,
    pricePerNight: 650000,
    maxGuests: 6,
    roomsLabel: '3 Kamar · Pendopo Keluarga',
    status: 'Terbatas',
    checkInOut: 'Check-in 14:00 · Check-out 12:00 WIB',
    image: '/src/assets/images/lereng_bamboo_homestay_1794886539092.jpg',
    summary:
      'Rumah limasan desa yang luas untuk rombongan atau keluarga besar, dilengkapi ruang makan pendopo terbuka dan dapur tungku tradisional.',
    amenities: [
      'Makan malam liwetan desa (opsional)',
      'Parkir mobil pribadi di halaman',
      'Pemandu wisata keluarga siaga',
      'Air panas & perlengkapan mandi alami',
    ],
    hostName: 'Keluarga Ibu Sumarni',
    unavailableDays: [16, 19, 21, 22, 23],
  },
];

export const VILLAGE_ITINERARY: ItineraryStop[] = [
  {
    id: 'step-1',
    time: '05:15 WIB',
    title: 'Kumpul di Gardu Pandang Kabut Timur',
    area: 'Terasering Krajan Atas',
    duration: '1 jam 30 menit',
    description:
      'Menyaksikan matahari terbit menembus kabut lembah dari dek kayu sambil menyeruput teh jahe gula aren.',
    localTip: 'Gunakan kaus kaki tebal dan jaket hangat; embun pagi di dek kayu terasa cukup dingin.',
    destinationId: 'terasering-kabut',
  },
  {
    id: 'step-2',
    time: '07:00 WIB',
    title: 'Sarapan Hangat di Pasar Tani Subuh',
    area: 'Balai Desa Lereng Asri',
    duration: '1 jam',
    description:
      'Mencicipi nasi jagung hangat, sayur lodeh pakis, dan jajanan pasar tradisional yang dimasak di atas tungku kayu.',
    localTip: 'Coba jenang ketan hitam buatan Bu Warti yang biasanya habis sebelum pukul 08:30 WIB.',
    destinationId: 'pasar-tani-subuh',
  },
  {
    id: 'step-3',
    time: '09:00 WIB',
    title: 'Sangrai Kopi Gerabah Bersama Ibu Sari',
    area: 'Dusun Tengah',
    duration: '1 jam 45 menit',
    description:
      'Memilih ceri kopi matang di kebun warga, menyangrai manual memakai kuali tanah liat, dan belajar seduh V60 atau tubruk.',
    localTip: 'Sebaiknya memakai baju gelap atau celemek yang disediakan karena asap kayu sangrai cukup wangi.',
    destinationId: 'kampung-kopi-gerabah',
  },
  {
    id: 'step-4',
    time: '11:30 WIB',
    title: 'Trekking Teduh ke Curug Pinusan',
    area: 'Lembah Hutan Pinus',
    duration: '2 jam 30 menit',
    description:
      'Menelusuri jalan setapak di bawah naungan pohon pinus tinggi menuju air terjun tujuh tingkat untuk beristirahat.',
    localTip: 'Siapkan baju ganti kering dan kantong tahan air untuk ponsel sebelum mendekati aliran curug.',
    destinationId: 'curug-pinusan',
  },
];

export const TRAIL_ROUTES: TrailRoute[] = [
  {
    id: 'jalur-sawah-kabut',
    name: 'Jalur Sawah & Kabut Pagi',
    difficulty: 'Santai',
    distanceKm: 2.6,
    duration: '1 jam 15 menit',
    elevationGain: '+95 m',
    surface: 'Batu tatah & pematang rumput',
    status: 'Buka',
    statusText: 'Jalur kering dan aman dilalui anak-anak',
    profilePoints: [1180, 1200, 1225, 1240, 1215, 1190, 1185],
    waypoints: [
      { km: '0,0 km', name: 'Balai Desa Lereng Asri', altitude: '1.180 mdpl', detail: 'Titik awal & parkiran utama' },
      { km: '1,2 km', name: 'Gardu Pandang Kabut', altitude: '1.240 mdpl', detail: 'Anjungan panorama terasering' },
      { km: '2,6 km', name: 'Kampung Kopi Tengah', altitude: '1.215 mdpl', detail: 'Tempat singgah seduh kopi' },
    ],
  },
  {
    id: 'jalur-curug-pinusan',
    name: 'Jalur Lembah Curug Pinusan',
    difficulty: 'Menengah',
    distanceKm: 4.4,
    duration: '2 jam 30 menit',
    elevationGain: '+210 m',
    surface: 'Tanah padat & tangga batu alami',
    status: 'Buka',
    statusText: 'Kondisi jalur teduh, beberapa anak tangga lembap',
    profilePoints: [1180, 1210, 1255, 1195, 1140, 1120, 1180],
    waypoints: [
      { km: '0,0 km', name: 'Gerbang Hutan Pinus', altitude: '1.180 mdpl', detail: 'Pos registrasi tiket rimba' },
      { km: '1,9 km', name: 'Pos Mata Air Pakis', altitude: '1.255 mdpl', detail: 'Bangku kayu istirahat' },
      { km: '2,8 km', name: 'Curug Pinusan Tujuh Tingkat', altitude: '1.120 mdpl', detail: 'Kolam alami & jembatan kayu' },
    ],
  },
  {
    id: 'jalur-watu-lintang',
    name: 'Jalur Puncak Watu Lintang',
    difficulty: 'Menanjak',
    distanceKm: 6.8,
    duration: '4 jam 15 menit',
    elevationGain: '+490 m',
    surface: 'Punggungan tanah vulkanik & bebatuan',
    status: 'Terbatas',
    statusText: 'Wajib pendampingan pemandu lokal · Mulai sebelum 05:00',
    profilePoints: [1240, 1320, 1410, 1510, 1620, 1680, 1520],
    waypoints: [
      { km: '0,0 km', name: 'Basecamp Krajan Atas', altitude: '1.240 mdpl', detail: 'Pengecekan perlengkapan wajib' },
      { km: '2,1 km', name: 'Pos 2 Sabana Angin', altitude: '1.480 mdpl', detail: 'Area istirahat & bekal nasi bakar' },
      { km: '3,4 km', name: 'Puncak Watu Lintang', altitude: '1.680 mdpl', detail: 'Panorama lautan awan 360°' },
    ],
  },
];

export const NOVEMBER_2026_CALENDAR: { day: number; weekday: string; available: boolean }[] = [
  { day: 16, weekday: 'Sen', available: true },
  { day: 17, weekday: 'Sel', available: true },
  { day: 18, weekday: 'Rab', available: true },
  { day: 19, weekday: 'Kam', available: true },
  { day: 20, weekday: 'Jum', available: true },
  { day: 21, weekday: 'Sab', available: false },
  { day: 22, weekday: 'Min', available: false },
  { day: 23, weekday: 'Sen', available: true },
  { day: 24, weekday: 'Sel', available: true },
  { day: 25, weekday: 'Rab', available: true },
  { day: 26, weekday: 'Kam', available: true },
  { day: 27, weekday: 'Jum', available: true },
  { day: 28, weekday: 'Sab', available: true },
  { day: 29, weekday: 'Min', available: true },
];

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'bk-init-1',
    code: 'LA-2611-842',
    itemId: 'terasering-kabut',
    itemTitle: 'Terasering Sawah & Gardu Pandang Kabut',
    kind: 'destination',
    image: HERO_IMAGE,
    dateLabel: 'Rab, 18 Nov 2026',
    guests: 2,
    nights: 1,
    packageLabel: 'Dengan Pemandu Desa',
    totalPrice: 125000,
    guestName: 'Nadia Kusuma',
    whatsapp: '0812-3489-2210',
    statusText: 'Terkonfirmasi · Pos Timur',
    jamBuka: '05:30 – 17:30 WIB',
    createdAt: '16 Nov 2026',
  },
];

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}
