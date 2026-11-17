import { useState } from 'react';
import {
  Calendar,
  Check,
  Clock,
  MessageCircle,
  QrCode,
  Trash2,
} from 'lucide-react';
import { BookingRecord, VILLAGE_ITINERARY, formatIDR } from '../data/tourismData';
import { ResilientImage } from './ResilientImage';
import { VillageItineraryList } from './VillageItineraryList';

interface TripsViewProps {
  bookings: BookingRecord[];
  onCancelBooking: (bookingId: string) => void;
  onExploreDestinations: () => void;
  onInspectDestination: (destinationId: string) => void;
  onOpenWhatsAppWithTopic: (topic: string) => void;
}

const DEFAULT_CHECKLIST = [
  { id: 'chk-1', label: 'Jaket hangat / windbreaker untuk kabut subuh', checked: true },
  { id: 'chk-2', label: 'Sepatu trekking atau sandal gunung anti-selip', checked: false },
  { id: 'chk-3', label: 'Botol minum isi ulang (tersedia isi ulang di Balai Desa)', checked: false },
  { id: 'chk-4', label: 'Uang tunai pecahan kecil untuk jajanan Pasar Tani', checked: false },
];

export function TripsView({
  bookings,
  onCancelBooking,
  onExploreDestinations,
  onInspectDestination,
  onOpenWhatsAppWithTopic,
}: TripsViewProps) {
  const [checklist, setChecklist] = useState(DEFAULT_CHECKLIST);

  const toggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-[#97472e] mb-1">
            Tiket Elektronik &amp; Jadwal Kunjungan
          </p>
          <h1 className="text-2xl sm:text-[30px] font-bold tracking-tight text-[#191c1a]">
            Perjalanan Saya di Lereng Asri
          </h1>
        </div>
        <button
          type="button"
          onClick={onExploreDestinations}
          className="min-h-[44px] px-4 py-2 rounded-xl border-[1.5px] border-[#1b4d3e] text-xs font-semibold text-[#1b4d3e] hover:bg-[#ecefea] self-start sm:self-auto whitespace-nowrap shrink-0"
        >
          Tambah Destinasi Baru
        </button>
      </div>

      {/* Active Tickets */}
      {bookings.length === 0 ? (
        <div className="bg-white rounded-[24px] border border-[#1b4d3e]/[0.08] p-8 text-center space-y-3 card-ambient">
          <p className="text-base font-bold text-[#191c1a]">
            Belum ada tiket wisata atau homestay yang dipesan
          </p>
          <p className="text-sm text-[#404945] max-w-md mx-auto">
            Pilih destinasi alam atau homestay warga untuk menyimpan kode reservasi dan panduan tiba di sini.
          </p>
          <button
            type="button"
            onClick={onExploreDestinations}
            className="min-h-[48px] px-6 py-3 rounded-xl bg-[#1b4d3e] text-white text-sm font-semibold hover:bg-[#14382d]"
          >
            Jelajahi Wisata &amp; Homestay
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bookings.map((bk) => (
            <article
              key={bk.id}
              className="bg-white rounded-[24px] border border-[#1b4d3e]/[0.08] overflow-hidden card-ambient flex flex-col"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-44 aspect-[16/10] sm:aspect-auto shrink-0">
                  <ResilientImage
                    src={bk.image}
                    alt={bk.itemTitle}
                    fallbackTitle={bk.itemTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-[#2e7d32]">{bk.statusText}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#191c1a] tabular-nums bg-[#f2f4ef] px-2.5 py-1 rounded-lg">
                      <QrCode className="w-3.5 h-3.5 text-[#1b4d3e]" />
                      {bk.code}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#191c1a] mb-2">{bk.itemTitle}</h3>

                  <div className="space-y-1 text-xs text-[#404945]">
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#97472e]" />
                      <span>
                        {bk.dateLabel} ·{' '}
                        <span className="tabular-nums">
                          {bk.guests} tamu{bk.kind === 'homestay' ? ` · ${bk.nights} malam` : ''}
                        </span>
                      </span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#1b4d3e]" />
                      <span>{bk.jamBuka}</span>
                    </p>
                    <p className="font-medium text-[#191c1a]">
                      Paket: {bk.packageLabel} · Pemesan: {bk.guestName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3.5 bg-[#f8faf5] border-t border-[#1b4d3e]/[0.08] flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-bold text-[#97472e] tabular-nums">
                  {formatIDR(bk.totalPrice)}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenWhatsAppWithTopic(
                        `Halo Pemandu Lereng Asri, konfirmasi kedatangan kode ${bk.code} (${bk.itemTitle}) pada ${bk.dateLabel}.`
                      )
                    }
                    className="min-h-[40px] px-3.5 py-2 rounded-xl bg-[#25d366]/15 text-[#003629] text-xs font-bold hover:bg-[#25d366]/25 inline-flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#2e7d32]" />
                    <span>Hubungi Pemandu</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onCancelBooking(bk.id)}
                    aria-label={`Batalkan pesanan ${bk.code}`}
                    className="min-h-[40px] px-3 py-2 rounded-xl text-xs font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/60 inline-flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Batalkan</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Split: Checklist Persiapan + Recommended Village Itinerary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 bg-white rounded-[24px] border border-[#1b4d3e]/[0.08] p-5 sm:p-6 card-ambient">
          <h2 className="text-lg font-bold text-[#191c1a] mb-1">
            Daftar Persiapan Pegunungan
          </h2>
          <p className="text-xs text-[#404945] mb-4">
            Centang perlengkapan sebelum berangkat menuju ketinggian 1.240 mdpl.
          </p>
          <div className="space-y-2.5">
            {checklist.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleChecklist(item.id)}
                className="w-full min-h-[48px] text-left p-3 rounded-2xl bg-[#f8faf5] hover:bg-[#f2f4ef] transition-colors flex items-center gap-3"
              >
                <span
                  className={`w-5 h-5 rounded-md flex items-center justify-center border-2 shrink-0 ${
                    item.checked
                      ? 'bg-[#1b4d3e] border-[#1b4d3e]'
                      : 'bg-white border-[#c0c9c3]'
                  }`}
                >
                  {item.checked && <Check className="w-3.5 h-3.5 text-[#a3e635] stroke-[3]" />}
                </span>
                <span
                  className={`text-sm ${
                    item.checked ? 'line-through text-[#707974]' : 'text-[#191c1a] font-medium'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-[#191c1a]">
              Panduan Itinerari Sehari Desa Lereng Asri
            </h2>
            <p className="text-xs text-[#404945] mt-0.5">
              Urutan kunjungan terbaik dari subuh hingga siang hari agar tidak tertinggal kabut pagi.
            </p>
          </div>
          <VillageItineraryList
            stops={VILLAGE_ITINERARY}
            onInspectDestination={onInspectDestination}
          />
        </div>
      </div>
    </div>
  );
}
