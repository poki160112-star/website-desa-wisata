import { Compass, Info } from 'lucide-react';
import { ItineraryStop } from '../data/tourismData';

interface VillageItineraryListProps {
  stops: ItineraryStop[];
  onInspectDestination: (destinationId: string) => void;
}

export function VillageItineraryList({
  stops,
  onInspectDestination,
}: VillageItineraryListProps) {
  return (
    <div className="relative pl-6 sm:pl-8">
      {/* Vertical connecting line (#C86D51 at 20% opacity) */}
      <div
        className="absolute left-[11px] sm:left-[15px] top-3 bottom-6 w-[2px] bg-[#c86d51]/20"
        aria-hidden="true"
      />

      <div className="space-y-6">
        {stops.map((stop) => (
          <div key={stop.id} className="relative">
            {/* Solid mini-circle with warm terracotta center */}
            <div
              className="absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full bg-[#ffdbd0] flex items-center justify-center ring-4 ring-[#f8faf5]"
              aria-hidden="true"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#c86d51]" />
            </div>

            <div className="bg-white rounded-2xl border border-[#1b4d3e]/[0.08] p-4 sm:p-5 card-ambient">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[#97472e] tabular-nums">{stop.time}</span>
                  <span aria-hidden="true" className="text-[#c0c9c3]">·</span>
                  <span className="font-medium text-[#404945]">{stop.area}</span>
                  <span aria-hidden="true" className="text-[#c0c9c3]">·</span>
                  <span className="text-[#404945]">{stop.duration}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onInspectDestination(stop.destinationId)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1b4d3e] hover:underline min-h-[36px] px-1 whitespace-nowrap shrink-0"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Lihat Lokasi</span>
                </button>
              </div>

              <h4 className="text-base sm:text-[18px] font-semibold text-[#191c1a] mb-1.5">
                {stop.title}
              </h4>
              <p className="text-sm text-[#404945] leading-[22px] mb-3">{stop.description}</p>

              {/* Local Tip Box */}
              <div className="bg-[#f2f4ef] rounded-xl px-3.5 py-2.5 flex items-start gap-2.5 text-xs text-[#404945]">
                <Info className="w-4 h-4 text-[#97472e] shrink-0 mt-0.5" />
                <p className="leading-[18px]">
                  <span className="font-semibold text-[#191c1a]">Tips Lokal: </span>
                  {stop.localTip}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
