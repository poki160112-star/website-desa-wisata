import { useState } from 'react';
import { Calendar, Check, Clock, MapPin, Star, Users } from 'lucide-react';
import {
  HOMESTAYS,
  HomestayItem,
  NOVEMBER_2026_CALENDAR,
  formatIDR,
} from '../data/tourismData';
import { ResilientImage } from './ResilientImage';

interface HomestaySectionProps {
  onSelectHomestay: (item: HomestayItem, mode: 'detail' | 'book', selectedDay: number) => void;
}

export function HomestaySection({ onSelectHomestay }: HomestaySectionProps) {
  const [selectedDay, setSelectedDay] = useState<number>(18);
  const [guestFilter, setGuestFilter] = useState<number>(2);

  const filteredHomestays = HOMESTAYS.filter((h) => h.maxGuests >= guestFilter);

  return (
    <div className="space-y-8">
      {/* Header & Interactive Date + Guest Availability Strip */}
      <div className="bg-white rounded-[24px] border border-[#1b4d3e]/[0.08] p-5 sm:p-6 card-ambient space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#97472e] mb-1">
              Ketersediaan Pondok Desa · November 2026
            </p>
            <h2 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#191c1a] text-balance">
              Menginap di Rumah Kayu &amp; Bambu Warga
            </h2>
          </div>

          {/* Guest count filter buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#404945] flex items-center gap-1.5 mr-1">
              <Users className="w-4 h-4 text-[#1b4d3e]" />
              <span>Tamu:</span>
            </span>
            {[2, 4, 6].map((count) => {
              const active = guestFilter === count;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => setGuestFilter(count)}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#1b4d3e] text-white'
                      : 'bg-[#f2f4ef] text-[#404945] hover:bg-[#e7e9e4]'
                  }`}
                >
                  Min. {count} org
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Calendar Availability Strip */}
        <div>
          <div className="flex items-center justify-between text-xs text-[#404945] mb-2.5">
            <span className="font-semibold text-[#191c1a] inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#1b4d3e]" />
              <span>Pilih Tanggal Check-in</span>
            </span>
            <span className="tabular-nums">
              Dipilih: <strong className="text-[#1b4d3e]">{selectedDay} Nov 2026</strong>
            </span>
          </div>

          <div className="grid grid-cols-7 sm:grid-cols-14 gap-1.5">
            {NOVEMBER_2026_CALENDAR.map((slot) => {
              const isSelected = selectedDay === slot.day;
              const isVillageClosed = !slot.available;
              return (
                <button
                  key={slot.day}
                  type="button"
                  disabled={isVillageClosed}
                  onClick={() => setSelectedDay(slot.day)}
                  className={`min-h-[48px] rounded-xl flex flex-col items-center justify-center text-xs transition-colors ${
                    isVillageClosed
                      ? 'bg-[#f2f4ef] text-[#707974] line-through cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#1b4d3e] text-white font-bold'
                      : 'bg-[#f8faf5] border border-[#1b4d3e]/10 text-[#191c1a] hover:bg-[#ecefea]'
                  }`}
                >
                  <span className="text-[10px] opacity-80">{slot.weekday}</span>
                  <span className="tabular-nums">{slot.day}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Homestay Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHomestays.map((home) => {
          const isBookedOnSelectedDay = home.unavailableDays.includes(selectedDay);

          return (
            <article
              key={home.id}
              className="group bg-white rounded-[24px] border border-[#1b4d3e]/[0.08] card-ambient overflow-hidden flex flex-col"
            >
              <button
                type="button"
                onClick={() => onSelectHomestay(home, 'detail', selectedDay)}
                className="relative aspect-[16/10] w-full overflow-hidden text-left"
              >
                <ResilientImage
                  src={home.image}
                  alt={home.title}
                  fallbackTitle={home.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002117]/75 via-[#002117]/15 to-transparent" />

                <div className="absolute top-3.5 left-3.5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
                      isBookedOnSelectedDay
                        ? 'bg-[#f8faf5]/92 text-[#d97706]'
                        : 'bg-[#f8faf5]/92 text-[#2e7d32]'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      {isBookedOnSelectedDay
                        ? `Penuh Tgl ${selectedDay} Nov`
                        : `Tersedia Tgl ${selectedDay} Nov`}
                    </span>
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="inline-flex items-center gap-1 font-medium truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#a3e635] shrink-0" />
                    <span className="truncate">{home.villageZone}</span>
                  </span>
                  <span className="tabular-nums font-semibold shrink-0 ml-2">
                    Maks {home.maxGuests} tamu
                  </span>
                </div>
              </button>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between gap-2 text-xs text-[#404945] mb-1.5">
                  <span className="truncate font-medium text-[#1b4d3e]">
                    {home.roomsLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#191c1a] shrink-0">
                    <Star className="w-3.5 h-3.5 fill-[#d97706] text-[#d97706]" />
                    <span className="tabular-nums">{home.rating.toFixed(1)}</span>
                    <span className="font-normal text-[#404945] tabular-nums">
                      ({home.reviewCount})
                    </span>
                  </span>
                </div>

                <h3 className="text-[18px] leading-[24px] font-semibold text-[#191c1a] mb-2">
                  {home.title}
                </h3>

                <p className="text-sm text-[#404945] leading-[22px] line-clamp-2 mb-3">
                  {home.summary}
                </p>

                <ul className="space-y-1.5 mb-4">
                  {home.amenities.slice(0, 2).map((am) => (
                    <li
                      key={am}
                      className="flex items-center gap-2 text-xs text-[#404945]"
                    >
                      <Check className="w-3.5 h-3.5 text-[#2e7d32] shrink-0" />
                      <span>{am}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-3.5 border-t border-[#1b4d3e]/[0.08] flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold text-[#404945]">Tarif per malam</p>
                    <p className="text-base font-bold text-[#97472e] tabular-nums">
                      {formatIDR(home.pricePerNight)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectHomestay(home, 'detail', selectedDay)}
                      className="min-h-[44px] px-3.5 py-2 rounded-xl border-[1.5px] border-[#1b4d3e]/25 text-xs font-semibold text-[#1b4d3e] hover:border-[#1b4d3e] hover:bg-[#f2f4ef] transition-colors"
                    >
                      Detail
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectHomestay(home, 'book', selectedDay)}
                      className="min-h-[44px] px-4 py-2 rounded-xl bg-[#1b4d3e] text-white text-xs font-semibold hover:bg-[#14382d] active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
                    >
                      {isBookedOnSelectedDay ? 'Cek Tgl Lain' : 'Pesan'}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
