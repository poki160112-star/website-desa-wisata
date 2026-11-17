import { useState, useEffect } from 'react';
import {
  Calendar,
  Check,
  Clock,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  BookingRecord,
  DestinationItem,
  HomestayItem,
  NOVEMBER_2026_CALENDAR,
  formatIDR,
} from '../data/tourismData';
import { ResilientImage } from './ResilientImage';

export type BookableItem = DestinationItem | HomestayItem;

interface BookingSheetProps {
  item: BookableItem | null;
  initialMode: 'detail' | 'book';
  initialSelectedDay?: number;
  onClose: () => void;
  onConfirmBooking: (booking: BookingRecord) => void;
  onOpenWhatsAppWithTopic: (topic: string) => void;
}

const DESTINATION_TIERS = [
  {
    id: 'mandiri',
    label: 'Tiket Masuk Mandiri',
    desc: 'Akses lokasi, peta jalur, & teh hangat selamat datang',
    extraPerPerson: 0,
  },
  {
    id: 'pemandu',
    label: 'Dengan Pemandu Desa',
    desc: 'Didampingi warga lokal bersertifikat + dokumentasi spot terbaik',
    extraPerPerson: 37500,
  },
  {
    id: 'lengkap',
    label: 'Paket Lengkap & Makan Siang',
    desc: 'Pemandu desa, jajanan pasar, & makan siang liwetan organik',
    extraPerPerson: 75000,
  },
];

const HOMESTAY_TIERS = [
  {
    id: 'reguler',
    label: 'Menginap + Sarapan Desa',
    desc: 'Termasuk sarapan rumahan & seduhan kopi sangrai pagi',
    extraPerNight: 0,
  },
  {
    id: 'penuh',
    label: 'Menginap + Makan Malam Liwetan',
    desc: 'Ditambah makan malam hangat tungku kayu bersama tuan rumah',
    extraPerNight: 120000,
  },
];

export function BookingSheet({
  item,
  initialMode,
  initialSelectedDay = 18,
  onClose,
  onConfirmBooking,
  onOpenWhatsAppWithTopic,
}: BookingSheetProps) {
  const [step, setStep] = useState<'detail' | 'book' | 'success'>(initialMode);
  const [selectedDay, setSelectedDay] = useState<number>(initialSelectedDay);
  const [guests, setGuests] = useState<number>(2);
  const [nights, setNights] = useState<number>(1);
  const [tierId, setTierId] = useState<string>(
    item?.kind === 'homestay' ? 'reguler' : 'pemandu'
  );
  const [guestName, setGuestName] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [createdBooking, setCreatedBooking] = useState<BookingRecord | null>(null);

  useEffect(() => {
    if (!item) return;
    setStep(initialMode);
    setFormError('');
    setCreatedBooking(null);
    setTierId(item.kind === 'homestay' ? 'reguler' : 'pemandu');
    if (item.kind === 'homestay') {
      const firstAvailable =
        NOVEMBER_2026_CALENDAR.find(
          (d) => d.available && !item.unavailableDays.includes(d.day)
        )?.day ?? 18;
      setSelectedDay(
        item.unavailableDays.includes(initialSelectedDay)
          ? firstAvailable
          : initialSelectedDay
      );
      setGuests((prev) => Math.min(prev, item.maxGuests));
    } else {
      setSelectedDay(initialSelectedDay);
    }
  }, [item, initialMode, initialSelectedDay]);

  if (!item) return null;

  const isHomestay = item.kind === 'homestay';
  const selectedCal =
    NOVEMBER_2026_CALENDAR.find((d) => d.day === selectedDay) ??
    NOVEMBER_2026_CALENDAR[0];
  const dateLabel = `${selectedCal.weekday}, ${selectedCal.day} Nov 2026`;

  const destTier =
    DESTINATION_TIERS.find((t) => t.id === tierId) ?? DESTINATION_TIERS[1];
  const homeTier =
    HOMESTAY_TIERS.find((t) => t.id === tierId) ?? HOMESTAY_TIERS[0];

  const totalPrice = isHomestay
    ? (item.pricePerNight + homeTier.extraPerNight) * nights
    : (item.pricePerPerson + destTier.extraPerPerson) * guests;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = guestName.trim();
    const cleanWa = whatsapp.trim();

    if (cleanName.length < 2) {
      setFormError('Mohon isi nama lengkap pemesan (minimal 2 huruf).');
      return;
    }
    if (!/^[0-9+\-\s]{8,16}$/.test(cleanWa)) {
      setFormError('Mohon masukkan nomor WhatsApp aktif yang valid.');
      return;
    }

    const code = `LA-2611-${Math.floor(100 + Math.random() * 900)}`;
    const newBooking: BookingRecord = {
      id: `bk-${Date.now()}`,
      code,
      itemId: item.id,
      itemTitle: item.title,
      kind: item.kind,
      image: item.image,
      dateLabel,
      guests,
      nights: isHomestay ? nights : 1,
      packageLabel: isHomestay ? homeTier.label : destTier.label,
      totalPrice,
      guestName: cleanName,
      whatsapp: cleanWa,
      statusText: isHomestay
        ? `Check-in ${item.checkInOut.split('·')[0].replace('Check-in ', '')}`
        : 'Terkonfirmasi · Tunjukkan di Pos Desa',
      jamBuka: isHomestay ? item.checkInOut : item.jamBuka,
      createdAt: '16 Nov 2026',
    };

    onConfirmBooking(newBooking);
    setCreatedBooking(newBooking);
    setStep('success');
    setFormError('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-[#002117]/50 backdrop-blur-sm p-0 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-sheet-title"
    >
      <div className="bg-[#f8faf5] w-full md:max-w-2xl max-h-[92vh] rounded-t-[32px] md:rounded-[24px] overflow-hidden flex flex-col shadow-2xl border border-[#1b4d3e]/10">
        {/* Mobile grab handle */}
        <div className="md:hidden pt-2.5 pb-1 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-[#c0c9c3]" />
        </div>

        {/* Sticky Sheet Header */}
        <div className="px-5 sm:px-6 py-3.5 border-b border-[#1b4d3e]/10 flex items-center justify-between gap-4 bg-[#f8faf5]">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#97472e]">
              {step === 'success'
                ? 'Reservasi Berhasil'
                : isHomestay
                ? 'Detail & Reservasi Homestay'
                : 'Detail & Pemesanan Wisata'}
            </p>
            <h2
              id="booking-sheet-title"
              className="text-base sm:text-lg font-bold text-[#191c1a] truncate"
            >
              {item.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela"
            className="min-h-[44px] min-w-[44px] rounded-full bg-[#ecefea] hover:bg-[#e1e3de] flex items-center justify-center text-[#191c1a] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 px-5 sm:px-6 py-5 space-y-6">
          {step === 'detail' && (
            <>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#1b4d3e]/10">
                <ResilientImage
                  src={item.image}
                  alt={item.title}
                  fallbackTitle={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002117]/75 via-transparent to-transparent" />
                <div className="absolute bottom-3.5 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-white text-xs">
                  <span className="inline-flex items-center gap-1.5 font-semibold">
                    <MapPin className="w-4 h-4 text-[#a3e635]" />
                    {isHomestay ? item.villageZone : item.locationLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold">
                    <Clock className="w-4 h-4 text-[#a3e635]" />
                    {isHomestay ? item.checkInOut : item.jamBuka}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm sm:text-base text-[#404945] leading-[24px] mb-4">
                  {item.summary}
                </p>

                <div className="bg-white rounded-2xl border border-[#1b4d3e]/[0.08] p-4 space-y-2.5">
                  <h3 className="text-sm font-bold text-[#191c1a]">
                    {isHomestay ? 'Fasilitas Termasuk' : 'Yang Akan Anda Nikmati'}
                  </h3>
                  <ul className="space-y-2">
                    {(isHomestay ? item.amenities : item.highlights).map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-sm text-[#404945]"
                      >
                        <Check className="w-4 h-4 text-[#2e7d32] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {!isHomestay ? (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#191c1a]">
                    Alur Kunjungan & Tips Pemandu ({item.guideName})
                  </h3>
                  <div className="space-y-2.5">
                    {item.itineraryPreview.map((pt) => (
                      <div
                        key={pt.time}
                        className="bg-white rounded-xl border border-[#1b4d3e]/[0.08] p-3.5 flex items-start gap-3"
                      >
                        <span className="text-xs font-bold text-[#97472e] tabular-nums shrink-0 pt-0.5">
                          {pt.time}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[#191c1a]">{pt.title}</p>
                          <p className="text-xs text-[#404945] mt-0.5">{pt.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#f2f4ef] rounded-xl p-3.5 text-xs text-[#404945] leading-[18px]">
                    <span className="font-bold text-[#191c1a]">Catatan Lapangan: </span>
                    {item.localTip}
                  </div>
                </div>
              ) : (
                <div className="bg-[#f2f4ef] rounded-xl p-4 text-sm text-[#404945] flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[#191c1a]">{item.hostName}</p>
                    <p className="text-xs mt-0.5">{item.roomsLabel} · Maks {item.maxGuests} tamu</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenWhatsAppWithTopic(`Tanya ketersediaan ${item.title}`)}
                    className="min-h-[40px] px-3.5 py-2 rounded-xl bg-white border border-[#1b4d3e]/20 text-xs font-semibold text-[#1b4d3e] hover:bg-[#ecefea] whitespace-nowrap shrink-0"
                  >
                    Tanya Tuan Rumah
                  </button>
                </div>
              )}
            </>
          )}

          {step === 'book' && (
            <form id="lereng-booking-form" onSubmit={handleSubmit} className="space-y-5">
              {/* Calendar Date Picker */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-sm font-bold text-[#191c1a] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#1b4d3e]" />
                    <span>Pilih Tanggal Kunjungan (November 2026)</span>
                  </label>
                  <span className="text-xs font-semibold text-[#1b4d3e]">{dateLabel}</span>
                </div>
                <div className="grid grid-cols-7 gap-1.5 bg-white p-3 rounded-2xl border border-[#1b4d3e]/[0.08]">
                  {NOVEMBER_2026_CALENDAR.map((slot) => {
                    const isBlocked =
                      !slot.available ||
                      (isHomestay && item.unavailableDays.includes(slot.day));
                    const isSelected = selectedDay === slot.day;

                    return (
                      <button
                        key={slot.day}
                        type="button"
                        disabled={isBlocked}
                        onClick={() => setSelectedDay(slot.day)}
                        className={`min-h-[48px] rounded-xl flex flex-col items-center justify-center text-xs transition-colors ${
                          isBlocked
                            ? 'bg-[#f2f4ef] text-[#707974] line-through cursor-not-allowed opacity-70'
                            : isSelected
                            ? 'bg-[#1b4d3e] text-white font-bold'
                            : 'hover:bg-[#ecefea] text-[#191c1a]'
                        }`}
                      >
                        <span className="text-[10px] opacity-80">{slot.weekday}</span>
                        <span className="tabular-nums text-sm">{slot.day}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guests & Nights Stepper */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl border border-[#1b4d3e]/[0.08] p-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#191c1a]">Jumlah Tamu</p>
                    <p className="text-xs text-[#404945]">
                      {isHomestay ? `Maks ${item.maxGuests} orang` : 'Dewasa & anak'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      aria-label="Kurangi tamu"
                      className="w-10 h-10 rounded-full bg-[#f2f4ef] hover:bg-[#e1e3de] flex items-center justify-center text-[#191c1a]"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center font-bold tabular-nums text-sm">
                      {guests}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setGuests((g) =>
                          isHomestay ? Math.min(item.maxGuests, g + 1) : Math.min(20, g + 1)
                        )
                      }
                      aria-label="Tambah tamu"
                      className="w-10 h-10 rounded-full bg-[#f2f4ef] hover:bg-[#e1e3de] flex items-center justify-center text-[#191c1a]"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isHomestay && (
                  <div className="bg-white rounded-2xl border border-[#1b4d3e]/[0.08] p-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#191c1a]">Lama Menginap</p>
                      <p className="text-xs text-[#404945]">Check-out 11:00 WIB</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setNights((n) => Math.max(1, n - 1))}
                        aria-label="Kurangi malam"
                        className="w-10 h-10 rounded-full bg-[#f2f4ef] hover:bg-[#e1e3de] flex items-center justify-center text-[#191c1a]"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold tabular-nums text-sm">
                        {nights} mlm
                      </span>
                      <button
                        type="button"
                        onClick={() => setNights((n) => Math.min(7, n + 1))}
                        aria-label="Tambah malam"
                        className="w-10 h-10 rounded-full bg-[#f2f4ef] hover:bg-[#e1e3de] flex items-center justify-center text-[#191c1a]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Radio Package Tiers (#1B4D3E outer dial with #A3E635 inner check) */}
              <div>
                <p className="text-sm font-bold text-[#191c1a] mb-2.5">Pilih Paket Layanan</p>
                <div className="space-y-2.5">
                  {(isHomestay ? HOMESTAY_TIERS : DESTINATION_TIERS).map((tier) => {
                    const active = tierId === tier.id;
                    const unitCost = isHomestay
                      ? item.pricePerNight + (tier as (typeof HOMESTAY_TIERS)[number]).extraPerNight
                      : item.pricePerPerson +
                        (tier as (typeof DESTINATION_TIERS)[number]).extraPerPerson;

                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setTierId(tier.id)}
                        className={`w-full min-h-[56px] text-left p-3.5 rounded-2xl border transition-colors flex items-start gap-3 ${
                          active
                            ? 'bg-white border-[#1b4d3e] ring-2 ring-[#1b4d3e]/15'
                            : 'bg-white border-[#1b4d3e]/10 hover:border-[#1b4d3e]/30'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full mt-0.5 shrink-0 flex items-center justify-center border-2 ${
                            active
                              ? 'bg-[#1b4d3e] border-[#1b4d3e]'
                              : 'bg-white border-[#c0c9c3]'
                          }`}
                        >
                          {active && <Check className="w-3 h-3 text-[#a3e635] stroke-[3]" />}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold text-[#191c1a]">{tier.label}</span>
                            <span className="text-xs font-bold text-[#97472e] tabular-nums shrink-0">
                              {formatIDR(unitCost)}
                              {isHomestay ? '/mlm' : '/org'}
                            </span>
                          </div>
                          <p className="text-xs text-[#404945] mt-0.5">{tier.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guest Info Form Fields (h-[50px], rounded-lg, focus glow) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="booking-guest-name"
                    className="block text-xs font-semibold text-[#191c1a] mb-1.5"
                  >
                    Nama Lengkap Pemesan
                  </label>
                  <input
                    id="booking-guest-name"
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Contoh: Bagas Pratama"
                    className="w-full h-[50px] px-4 rounded-2xl bg-white border-[1.5px] border-[#e1e3de] text-sm text-[#191c1a] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:ring-[3px] focus:ring-[#1b4d3e]/15"
                  />
                </div>
                <div>
                  <label
                    htmlFor="booking-whatsapp"
                    className="block text-xs font-semibold text-[#191c1a] mb-1.5"
                  >
                    Nomor WhatsApp Aktif
                  </label>
                  <input
                    id="booking-whatsapp"
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Contoh: 0812-3456-7890"
                    className="w-full h-[50px] px-4 rounded-2xl bg-white border-[1.5px] border-[#e1e3de] text-sm text-[#191c1a] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:ring-[3px] focus:ring-[#1b4d3e]/15"
                  />
                </div>
              </div>

              {formError && (
                <p
                  role="alert"
                  className="text-xs font-semibold text-[#ba1a1a] bg-[#ffdad6] px-3.5 py-2.5 rounded-xl"
                >
                  {formError}
                </p>
              )}
            </form>
          )}

          {step === 'success' && createdBooking && (
            <div className="py-2 space-y-5">
              <div className="bg-[#f2f4ef] rounded-2xl p-5 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#1b4d3e] text-[#a3e635] flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold text-[#2e7d32]">
                  Tiket Tersimpan di Menu Perjalanan
                </p>
                <h3 className="text-xl font-bold text-[#191c1a]">
                  Kode Booking: <span className="tabular-nums">{createdBooking.code}</span>
                </h3>
                <p className="text-sm text-[#404945]">
                  Tunjukkan kode ini kepada petugas pos desa atau pemandu lokal saat tiba.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#1b4d3e]/10 p-4 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#404945]">Tanggal</span>
                  <span className="font-semibold text-[#191c1a]">{createdBooking.dateLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#404945]">Paket</span>
                  <span className="font-semibold text-[#191c1a]">{createdBooking.packageLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#404945]">Peserta</span>
                  <span className="font-semibold text-[#191c1a] tabular-nums">
                    {createdBooking.guests} orang
                    {isHomestay ? ` · ${createdBooking.nights} malam` : ''}
                  </span>
                </div>
                <div className="pt-2.5 border-t border-[#1b4d3e]/10 flex justify-between items-center">
                  <span className="font-semibold text-[#191c1a]">Total Bayar di Pos Desa</span>
                  <span className="text-base font-bold text-[#97472e] tabular-nums">
                    {formatIDR(createdBooking.totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Sheet Footer */}
        <div className="px-5 sm:px-6 py-4 border-t border-[#1b4d3e]/10 bg-[#f8faf5] flex items-center justify-between gap-4">
          {step === 'detail' && (
            <>
              <div>
                <p className="text-xs text-[#404945]">
                  {isHomestay ? 'Tarif per malam' : 'Tiket per orang'}
                </p>
                <p className="text-lg font-bold text-[#97472e] tabular-nums">
                  {formatIDR(isHomestay ? item.pricePerNight : item.pricePerPerson)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep('book')}
                className="min-h-[48px] px-6 py-3 rounded-xl bg-[#1b4d3e] text-white text-sm font-semibold hover:bg-[#14382d] active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
              >
                Lanjut Pesan
              </button>
            </>
          )}

          {step === 'book' && (
            <>
              <div>
                <p className="text-xs text-[#404945]">Estimasi Total</p>
                <p className="text-lg font-bold text-[#97472e] tabular-nums">
                  {formatIDR(totalPrice)}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setStep('detail')}
                  className="min-h-[48px] px-4 py-3 rounded-xl border-[1.5px] border-[#1b4d3e]/30 text-sm font-semibold text-[#1b4d3e] hover:bg-[#ecefea]"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  form="lereng-booking-form"
                  className="min-h-[48px] px-6 py-3 rounded-xl bg-[#1b4d3e] text-white text-sm font-semibold hover:bg-[#14382d] active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
                >
                  Konfirmasi Pesanan
                </button>
              </div>
            </>
          )}

          {step === 'success' && createdBooking && (
            <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() =>
                  onOpenWhatsAppWithTopic(
                    `Halo Pemandu Lereng Asri, saya sudah booking kode ${createdBooking.code} untuk ${createdBooking.itemTitle} pada ${createdBooking.dateLabel}.`
                  )
                }
                className="min-h-[48px] px-5 py-3 rounded-xl bg-[#25d366] text-[#002117] text-sm font-bold hover:brightness-95 transition-all whitespace-nowrap"
              >
                Kirim ke WhatsApp Pemandu
              </button>
              <button
                type="button"
                onClick={onClose}
                className="min-h-[48px] px-6 py-3 rounded-xl bg-[#1b4d3e] text-white text-sm font-semibold hover:bg-[#14382d]"
              >
                Selesai
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
