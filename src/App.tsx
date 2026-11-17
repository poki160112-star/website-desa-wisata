import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Compass,
  Home,
  Luggage,
  MessageCircle,
  Mountain,
  Search,
  Sparkles,
  Sun,
} from 'lucide-react';
import {
  BookingRecord,
  DESTINATIONS,
  DestinationCategory,
  DestinationItem,
  HERO_IMAGE,
  HOMESTAYS,
  HomestayItem,
  INITIAL_BOOKINGS,
  VILLAGE_ITINERARY,
} from './data/tourismData';
import { ResilientImage } from './components/ResilientImage';
import { DestinationCard } from './components/DestinationCard';
import { VillageItineraryList } from './components/VillageItineraryList';
import { HomestaySection } from './components/HomestaySection';
import { TrailExplorerView } from './components/TrailExplorerView';
import { TripsView } from './components/TripsView';
import { BookableItem, BookingSheet } from './components/BookingSheet';
import { WhatsAppConciergeSheet } from './components/WhatsAppConciergeSheet';

type ScreenTab = 'beranda' | 'destinasi' | 'homestay' | 'perjalanan';

const HOME_CATEGORIES: ('Semua' | DestinationCategory)[] = [
  'Semua',
  'Wisata Alam',
  'Trekking',
  'Desa Wisata',
  'Kuliner',
];

const VISITOR_REVIEWS = [
  {
    name: 'Rani & Dimas Wijaya',
    origin: 'Yogyakarta · Menginap di Pondok Bambu Lembah Kabut',
    quote:
      'Berangkat dari Pondok pukul 05:10, dalam 10 menit jalan kaki sudah sampai di anjungan kabut. Kopi sangrai Ibu Sari dan sarapan nasi jagung membuat akhir pekan kami terasa sangat hangat.',
  },
  {
    name: 'Hendra Gunawan',
    origin: 'Semarang · Trekking Puncak Watu Lintang',
    quote:
      'Jam buka dan kuota jalur jelas sejak awal, jadi tidak perlu khawatir antre di pos. Kang Bagus memandu dengan sabar dan tahu titik aman saat kabut mulai turun.',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ScreenTab>('beranda');
  const [homeCategory, setHomeCategory] = useState<'Semua' | DestinationCategory>('Semua');
  const [heroSearch, setHeroSearch] = useState('');
  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem('lereng_asri_bookings_v1');
      return saved ? (JSON.parse(saved) as BookingRecord[]) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [sheetState, setSheetState] = useState<{
    item: BookableItem | null;
    mode: 'detail' | 'book';
    selectedDay: number;
  }>({
    item: null,
    mode: 'detail',
    selectedDay: 18,
  });

  const [waState, setWaState] = useState<{
    open: boolean;
    topic: string;
  }>({
    open: false,
    topic: '',
  });

  useEffect(() => {
    try {
      localStorage.setItem('lereng_asri_bookings_v1', JSON.stringify(bookings));
    } catch {
      // Ignore storage quota issues
    }
  }, [bookings]);

  const navigateTo = (tab: ScreenTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openItem = (
    item: BookableItem,
    mode: 'detail' | 'book',
    selectedDay = 18
  ) => {
    setSheetState({ item, mode, selectedDay });
  };

  const inspectDestinationById = (destinationId: string) => {
    const found = DESTINATIONS.find((d) => d.id === destinationId);
    if (found) {
      openItem(found, 'detail');
    }
  };

  const handleConfirmBooking = (newBooking: BookingRecord) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  const openWhatsApp = (topic = '') => {
    setSheetState((prev) => ({ ...prev, item: null }));
    setWaState({ open: true, topic });
  };

  const homeFilteredDestinations = DESTINATIONS.filter((item) => {
    const matchesCat = homeCategory === 'Semua' || item.category === homeCategory;
    const q = heroSearch.trim().toLowerCase();
    const matchesSearch =
      q === '' ||
      item.title.toLowerCase().includes(q) ||
      item.locationLabel.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8faf5] text-[#191c1a] pb-24 md:pb-12">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-30 h-[52px] md:h-[68px] glass-nav border-b border-[#1b4d3e]/10">
        <div className="max-w-[1200px] mx-auto h-full px-4 md:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => navigateTo('beranda')}
            className="text-lg md:text-xl font-extrabold tracking-tight text-[#003629] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4d3e] rounded-lg px-1"
          >
            Lereng Asri
          </button>

          {/* Zone 2: 4 concise single-line nav links */}
          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex items-center gap-7 text-sm font-semibold"
          >
            {(
              [
                { id: 'beranda', label: 'Beranda' },
                { id: 'destinasi', label: 'Destinasi' },
                { id: 'homestay', label: 'Homestay' },
                { id: 'perjalanan', label: `Perjalanan (${bookings.length})` },
              ] as { id: ScreenTab; label: string }[]
            ).map((nav) => {
              const isActive = activeTab === nav.id;
              return (
                <button
                  key={nav.id}
                  type="button"
                  onClick={() => navigateTo(nav.id)}
                  className={`py-2 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                    isActive
                      ? 'border-[#1b4d3e] text-[#003629]'
                      : 'border-transparent text-[#404945] hover:text-[#191c1a] hover:border-[#c0c9c3]'
                  }`}
                >
                  {nav.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => openItem(DESTINATIONS[0], 'book')}
              className="min-h-[40px] md:min-h-[44px] px-4 md:px-5 py-2 rounded-xl bg-[#1b4d3e] text-white text-xs md:text-sm font-semibold hover:bg-[#14382d] active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
            >
              Pesan Wisata
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-[1200px] mx-auto px-4 md:px-10 pt-5 md:pt-8 space-y-10 md:space-y-14">
        {activeTab === 'beranda' && (
          <>
            {/* Hero Section */}
            <section className="relative rounded-[24px] overflow-hidden border border-[#1b4d3e]/10 card-ambient">
              <div className="relative min-h-[420px] md:min-h-[480px] flex items-end">
                <ResilientImage
                  src={HERO_IMAGE}
                  alt="Pemandangan pagi terasering sawah dan lembah berkabut di Desa Wisata Lereng Asri"
                  fallbackTitle="Desa Wisata Lereng Asri"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#002117]/90 via-[#002117]/45 to-[#002117]/20"
                  aria-hidden="true"
                />

                <div className="relative z-10 w-full p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                  <div className="lg:col-span-8 space-y-3">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-[#baeed9]">
                      <span className="inline-flex items-center gap-1.5">
                        <Sun className="w-3.5 h-3.5 text-[#a3e635]" />
                        <span>19°C Cerah Berkabut</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">1.240 mdpl</span>
                      <span aria-hidden="true">·</span>
                      <span>Jawa Tengah</span>
                    </div>

                    <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold leading-[1.15] tracking-[-0.03em] text-white text-balance max-w-2xl">
                      Jelajahi Harmoni Alam &amp; Keramahan Desa Lereng Asri
                    </h1>

                    <p className="text-sm sm:text-base text-[#eff1ec]/90 max-w-xl leading-[24px]">
                      Pesan tiket wisata alam, menginap di pondok kayu warga, dan temukan rute
                      pegunungan bersama pemandu lokal desa.
                    </p>

                    {/* Quick Search + Primary Action */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-xl">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-[#707974] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="search"
                          value={heroSearch}
                          onChange={(e) => setHeroSearch(e.target.value)}
                          placeholder="Cari curug, homestay, atau kopi..."
                          aria-label="Cari wisata di Lereng Asri"
                          className="w-full h-[50px] pl-11 pr-4 rounded-2xl bg-white text-sm text-[#191c1a] placeholder:text-[#707974] focus:outline-none focus:ring-[3px] focus:ring-[#a3e635]/40"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => navigateTo('destinasi')}
                        className="min-h-[50px] px-6 py-3 rounded-2xl bg-[#c86d51] hover:bg-[#97472e] text-white text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>Lihat Peta Jalur</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Quick Highlight Box on Desktop */}
                  <div className="lg:col-span-4 bg-[#f8faf5]/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-[#191c1a] space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#97472e]">
                      <span>Agenda Pagi Ini</span>
                      <span className="tabular-nums text-[#2e7d32]">Pos Desa Buka</span>
                    </div>
                    <p className="text-sm font-bold leading-snug">
                      Gardu Pandang Kabut &amp; Pasar Tani Subuh buka pukul 05:30 WIB
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-[#1b4d3e]/10 text-xs">
                      <span className="text-[#404945]">6 destinasi · 3 homestay</span>
                      <button
                        type="button"
                        onClick={() => navigateTo('homestay')}
                        className="font-bold text-[#1b4d3e] hover:underline whitespace-nowrap shrink-0"
                      >
                        Cek Homestay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Category Filter & Destinations Showcase */}
            <section className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#97472e] mb-1">
                    Destinasi Pilihan Warga
                  </p>
                  <h2 className="text-2xl sm:text-[30px] font-bold tracking-tight text-[#191c1a]">
                    Rekomendasi Wisata &amp; Jam Buka
                  </h2>
                </div>

                {/* Interactive Category Filter Chips */}
                <div
                  className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0"
                  role="tablist"
                  aria-label="Filter kategori wisata"
                >
                  {HOME_CATEGORIES.map((cat) => {
                    const active = homeCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setHomeCategory(cat)}
                        className={`min-h-[40px] px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
                          active
                            ? 'bg-[#1b4d3e] text-white'
                            : 'bg-[#f2f4ef] text-[#404945] hover:bg-[#e7e9e4]'
                        }`}
                      >
                        {active && (
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-[#a3e635]"
                            aria-hidden="true"
                          />
                        )}
                        <span>{cat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {homeFilteredDestinations.length === 0 ? (
                <div className="bg-white rounded-[24px] border border-[#1b4d3e]/[0.08] p-8 text-center space-y-3">
                  <p className="text-base font-bold text-[#191c1a]">
                    Destinasi untuk &ldquo;{heroSearch}&rdquo; tidak ditemukan
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setHeroSearch('');
                      setHomeCategory('Semua');
                    }}
                    className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1b4d3e] text-white text-xs font-semibold"
                  >
                    Tampilkan Semua Destinasi
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {homeFilteredDestinations.map((dest) => (
                    <DestinationCard
                      key={dest.id}
                      item={dest}
                      onSelect={(item) => openItem(item, 'detail')}
                      onBook={(item) => openItem(item, 'book')}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Featured Homestay Preview Banner */}
            <section className="bg-[#ecefea] rounded-[24px] border border-[#1b4d3e]/[0.08] p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 aspect-[16/10] rounded-2xl overflow-hidden">
                <ResilientImage
                  src={HOMESTAYS[0].image}
                  alt={HOMESTAYS[0].title}
                  fallbackTitle={HOMESTAYS[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-7 space-y-3">
                <p className="text-xs font-semibold text-[#97472e]">
                  Menginap Bersama Keluarga Desa
                </p>
                <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#191c1a] text-balance">
                  Bangun Pagi Menghadap Lembah Kabut di Pondok Kayu &amp; Bambu
                </h2>
                <p className="text-sm sm:text-base text-[#404945] leading-[24px]">
                  Semua homestay dikelola langsung oleh warga Dusun Krajan dan Tengah, lengkap dengan
                  air hangat tenaga surya, tungku kopi malam, serta sarapan hasil panen desa.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigateTo('homestay')}
                    className="min-h-[48px] px-6 py-3 rounded-xl bg-[#1b4d3e] text-white text-sm font-semibold hover:bg-[#14382d] whitespace-nowrap"
                  >
                    Lihat Semua Homestay
                  </button>
                  <button
                    type="button"
                    onClick={() => openItem(HOMESTAYS[0], 'book', 18)}
                    className="min-h-[48px] px-5 py-3 rounded-xl border-[1.5px] border-[#97472e] text-[#97472e] text-sm font-semibold hover:bg-[#ffdbd0]/40 whitespace-nowrap"
                  >
                    Cek Tarif Pondok Bambu
                  </button>
                </div>
              </div>
            </section>

            {/* Village Experience Itinerary + Visitor Testimonials */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-[#97472e] mb-1">
                      Rencana Perjalanan Sehari
                    </p>
                    <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#191c1a]">
                      Alur Pengalaman Desa Wisata
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo('perjalanan')}
                    className="text-xs font-semibold text-[#1b4d3e] hover:underline min-h-[36px] inline-flex items-center gap-1"
                  >
                    <span>Buka Tiket &amp; Checklist</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <VillageItineraryList
                  stops={VILLAGE_ITINERARY}
                  onInspectDestination={inspectDestinationById}
                />
              </div>

              <div className="lg:col-span-5 space-y-5">
                <div>
                  <p className="text-xs font-semibold text-[#97472e] mb-1">
                    Cerita Tamu &amp; Pengelola
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight text-[#191c1a]">
                    Pengalaman Wisatawan
                  </h2>
                </div>

                <div className="space-y-4">
                  {VISITOR_REVIEWS.map((rev) => (
                    <blockquote
                      key={rev.name}
                      className="bg-white rounded-2xl border border-[#1b4d3e]/[0.08] p-5 card-ambient space-y-2.5"
                    >
                      <p className="text-sm text-[#191c1a] leading-[22px]">
                        &ldquo;{rev.quote}&rdquo;
                      </p>
                      <footer className="pt-2 border-t border-[#1b4d3e]/[0.08]">
                        <p className="text-sm font-bold text-[#191c1a]">{rev.name}</p>
                        <p className="text-xs text-[#404945]">{rev.origin}</p>
                      </footer>
                    </blockquote>
                  ))}
                </div>

                {/* Direct Guide Card */}
                <div className="bg-[#1b4d3e] text-white rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#a3e635]">
                    <Sparkles className="w-4 h-4" />
                    <span>Layanan Informasi Pokdarwis</span>
                  </div>
                  <h3 className="text-lg font-bold leading-snug">
                    Butuh Penjemputan atau Rute Khusus Keluarga?
                  </h3>
                  <p className="text-xs text-[#baeed9] leading-[18px]">
                    Tim pemandu desa siap membantu mengecek cuaca puncak, mengatur ojek kebun,
                    atau menyesuaikan jadwal makan siang di pendopo warga.
                  </p>
                  <button
                    type="button"
                    onClick={() => openWhatsApp()}
                    className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#25d366] text-[#002117] text-sm font-bold inline-flex items-center justify-center gap-2 hover:brightness-95 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Hubungi Pemandu via WhatsApp</span>
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'destinasi' && (
          <TrailExplorerView
            onSelectDestination={(item: DestinationItem) => openItem(item, 'detail')}
            onBookDestination={(item: DestinationItem) => openItem(item, 'book')}
          />
        )}

        {activeTab === 'homestay' && (
          <HomestaySection
            onSelectHomestay={(item: HomestayItem, mode, day) =>
              openItem(item, mode, day)
            }
          />
        )}

        {activeTab === 'perjalanan' && (
          <TripsView
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            onExploreDestinations={() => navigateTo('destinasi')}
            onInspectDestination={inspectDestinationById}
            onOpenWhatsAppWithTopic={(topic) => openWhatsApp(topic)}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="max-w-[1200px] mx-auto px-4 md:px-10 mt-14 pt-8 border-t border-[#1b4d3e]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#404945]">
        <div>
          <p className="font-bold text-[#003629] text-sm">Desa Wisata Lereng Asri</p>
          <p className="mt-0.5">
            Balai Desa Krajan, Ketinggian 1.240 mdpl · Jam Pos Wisata 04:30 – 18:00 WIB
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => navigateTo('destinasi')}
            className="hover:text-[#1b4d3e] font-medium"
          >
            Peta Jalur
          </button>
          <button
            type="button"
            onClick={() => navigateTo('homestay')}
            className="hover:text-[#1b4d3e] font-medium"
          >
            Homestay Warga
          </button>
          <button
            type="button"
            onClick={() => openWhatsApp('Halo Balai Desa Lereng Asri, saya ingin bertanya info kunjungan.')}
            className="hover:text-[#1b4d3e] font-medium"
          >
            Kontak Pokdarwis
          </button>
        </div>
      </footer>

      {/* Floating WhatsApp Concierge Button (#25D366) */}
      <button
        type="button"
        onClick={() => openWhatsApp()}
        aria-label="Tanya Pemandu via WhatsApp"
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 h-14 px-4 md:px-5 rounded-full bg-[#25d366] text-[#002117] font-bold text-xs md:text-sm inline-flex items-center gap-2 whatsapp-glow hover:brightness-95 active:scale-[0.98] transition-all"
      >
        <MessageCircle className="w-5 h-5 shrink-0" />
        <span className="hidden sm:inline whitespace-nowrap">Tanya Pemandu</span>
      </button>

      {/* Mobile Bottom Tab Bar (56px high, well within 15% cap with 52px header) */}
      <nav
        aria-label="Navigasi seluler"
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 h-14 glass-nav border-t border-[#1b4d3e]/10 grid grid-cols-4 items-center"
      >
        {(
          [
            { id: 'beranda', label: 'Beranda', icon: Compass },
            { id: 'destinasi', label: 'Destinasi', icon: Mountain },
            { id: 'homestay', label: 'Homestay', icon: Home },
            { id: 'perjalanan', label: 'Perjalanan', icon: Luggage },
          ] as { id: ScreenTab; label: string; icon: typeof Compass }[]
        ).map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => navigateTo(tab.id)}
              className={`min-h-[44px] flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-colors relative ${
                active ? 'text-[#1b4d3e]' : 'text-[#404945]'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
              <span>{tab.label}</span>
              {tab.id === 'perjalanan' && bookings.length > 0 && (
                <span className="absolute top-1.5 right-5 w-4 h-4 rounded-full bg-[#c86d51] text-white text-[9px] font-bold flex items-center justify-center tabular-nums">
                  {bookings.length}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Detail & Booking Modal / Bottom Sheet */}
      <BookingSheet
        item={sheetState.item}
        initialMode={sheetState.mode}
        initialSelectedDay={sheetState.selectedDay}
        onClose={() => setSheetState((prev) => ({ ...prev, item: null }))}
        onConfirmBooking={handleConfirmBooking}
        onOpenWhatsAppWithTopic={openWhatsApp}
      />

      {/* WhatsApp Concierge Drawer */}
      <WhatsAppConciergeSheet
        isOpen={waState.open}
        initialTopic={waState.topic}
        onClose={() => setWaState({ open: false, topic: '' })}
      />
    </div>
  );
}
