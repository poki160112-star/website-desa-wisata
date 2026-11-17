import { Clock, MapPin, Star } from 'lucide-react';
import { DestinationItem, formatIDR } from '../data/tourismData';
import { ResilientImage } from './ResilientImage';

interface DestinationCardProps {
  item: DestinationItem;
  onSelect: (item: DestinationItem) => void;
  onBook: (item: DestinationItem) => void;
}

export function DestinationCard({ item, onSelect, onBook }: DestinationCardProps) {
  const isOpen = item.status === 'Buka';

  return (
    <article className="group bg-white rounded-[24px] border border-[#1b4d3e]/[0.08] card-ambient overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5">
      {/* 16:10 Image Container */}
      <button
        type="button"
        onClick={() => onSelect(item)}
        className="relative aspect-[16/10] w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4d3e]"
      >
        <ResilientImage
          src={item.image}
          alt={item.title}
          fallbackTitle={item.title}
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#002117]/70 via-[#002117]/15 to-transparent"
          aria-hidden="true"
        />

        {/* Operational Status Indicator (Icon + explicit text, never hue-only) */}
        <div className="absolute top-3.5 left-3.5">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
              isOpen
                ? 'bg-[#f8faf5]/92 text-[#2e7d32]'
                : 'bg-[#f8faf5]/92 text-[#d97706]'
            }`}
          >
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>
              {item.status} · {item.jamBuka.replace(' WIB', '')}
            </span>
          </span>
        </div>

        {/* Bottom Caption inside Scrim */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/95">
          <span className="inline-flex items-center gap-1 font-medium truncate">
            <MapPin className="w-3.5 h-3.5 text-[#a3e635] shrink-0" />
            <span className="truncate">{item.locationLabel}</span>
          </span>
          <span className="tabular-nums font-semibold shrink-0 ml-2">
            {item.elevationMdpl.toLocaleString('id-ID')} mdpl
          </span>
        </div>
      </button>

      {/* Content Block */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Clean unboxed metadata row */}
        <div className="flex items-center justify-between gap-2 text-xs text-[#404945] mb-1.5">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-semibold text-[#1b4d3e]">{item.category}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{item.distanceKm.toFixed(1).replace('.', ',')} km</span>
            <span aria-hidden="true">·</span>
            <span>{item.difficulty}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 font-semibold text-[#191c1a]">
            <Star className="w-3.5 h-3.5 fill-[#d97706] text-[#d97706]" />
            <span className="tabular-nums">{item.rating.toFixed(1)}</span>
            <span className="text-[#404945] font-normal tabular-nums">({item.reviewCount})</span>
          </div>
        </div>

        <h3 className="text-[18px] leading-[24px] font-semibold text-[#191c1a] mb-2">
          <button
            type="button"
            onClick={() => onSelect(item)}
            className="text-left hover:text-[#1b4d3e] transition-colors focus-visible:outline-none focus-visible:underline"
          >
            {item.title}
          </button>
        </h3>

        <p className="text-sm text-[#404945] leading-[22px] line-clamp-2 mb-4">
          {item.summary}
        </p>

        {/* Footer: Price per person & Compact CTA */}
        <div className="mt-auto pt-3.5 border-t border-[#1b4d3e]/[0.08] flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold text-[#404945]">Mulai dari</p>
            <p className="text-base font-bold text-[#97472e] tabular-nums">
              {formatIDR(item.pricePerPerson)}
              <span className="text-xs font-normal text-[#404945]"> /orang</span>
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="min-h-[44px] px-3.5 py-2 rounded-xl border-[1.5px] border-[#1b4d3e]/25 text-xs font-semibold text-[#1b4d3e] hover:border-[#1b4d3e] hover:bg-[#f2f4ef] transition-colors whitespace-nowrap shrink-0"
            >
              Detail
            </button>
            <button
              type="button"
              onClick={() => onBook(item)}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-[#1b4d3e] text-white text-xs font-semibold hover:bg-[#14382d] active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
            >
              Pesan
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
