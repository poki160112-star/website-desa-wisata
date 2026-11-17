import { useState } from 'react';
import { Compass, Mountain, Search, SlidersHorizontal } from 'lucide-react';
import {
  DESTINATIONS,
  DestinationCategory,
  DestinationItem,
  TRAIL_ROUTES,
} from '../data/tourismData';
import { DestinationCard } from './DestinationCard';

interface TrailExplorerViewProps {
  onSelectDestination: (item: DestinationItem) => void;
  onBookDestination: (item: DestinationItem) => void;
}

const CATEGORIES: ('Semua' | DestinationCategory)[] = [
  'Semua',
  'Wisata Alam',
  'Trekking',
  'Desa Wisata',
  'Kuliner',
];

export function TrailExplorerView({
  onSelectDestination,
  onBookDestination,
}: TrailExplorerViewProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'Semua' | DestinationCategory>('Semua');
  const [statusFilter, setStatusFilter] = useState<'Semua' | 'Buka' | 'Terbatas'>('Semua');
  const [activeRouteId, setActiveRouteId] = useState<string>(TRAIL_ROUTES[0].id);

  const activeRoute =
    TRAIL_ROUTES.find((r) => r.id === activeRouteId) ?? TRAIL_ROUTES[0];

  const filtered = DESTINATIONS.filter((dest) => {
    const matchesQuery =
      query.trim() === '' ||
      dest.title.toLowerCase().includes(query.toLowerCase()) ||
      dest.locationLabel.toLowerCase().includes(query.toLowerCase()) ||
      dest.summary.toLowerCase().includes(query.toLowerCase());
    const matchesCat = category === 'Semua' || dest.category === category;
    const matchesStatus = statusFilter === 'Semua' || dest.status === statusFilter;
    return matchesQuery && matchesCat && matchesStatus;
  });

  // Build SVG elevation polyline points
  const minElev = Math.min(...activeRoute.profilePoints) - 30;
  const maxElev = Math.max(...activeRoute.profilePoints) + 30;
  const range = Math.max(1, maxElev - minElev);
  const svgPoints = activeRoute.profilePoints
    .map((val, idx) => {
      const x = (idx / (activeRoute.profilePoints.length - 1)) * 320;
      const y = 90 - ((val - minElev) / range) * 72;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <div className="space-y-8">
      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-[24px] border border-[#1b4d3e]/[0.08] p-5 sm:p-6 card-ambient space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-[30px] font-bold tracking-tight text-[#191c1a]">
              Direktori Destinasi &amp; Peta Jalur
            </h1>
            <p className="text-sm text-[#404945] mt-1">
              Pantau jam buka harian, tingkat kesulitan jalur, dan estimasi jarak tempuh dari Balai Desa.
            </p>
          </div>

          {/* Search Input (50px height, focus ring) */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-[#707974] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari curug, kopi, atau puncak..."
              aria-label="Cari destinasi wisata"
              className="w-full h-[50px] pl-11 pr-4 rounded-2xl bg-[#f8faf5] border-[1.5px] border-[#e1e3de] text-sm text-[#191c1a] placeholder:text-[#707974] focus:outline-none focus:bg-white focus:border-[#1b4d3e] focus:ring-[3px] focus:ring-[#1b4d3e]/15"
            />
          </div>
        </div>

        {/* Category + Status Filter Chips */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#1b4d3e]/[0.08]">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`min-h-[38px] px-4 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
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

          <div className="flex items-center gap-1.5 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#404945] mr-1" />
            {(['Semua', 'Buka', 'Terbatas'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`min-h-[36px] px-3 py-1 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  statusFilter === st
                    ? 'bg-[#ecefea] text-[#1b4d3e] border border-[#1b4d3e]/25'
                    : 'text-[#404945] hover:bg-[#f2f4ef]'
                }`}
              >
                {st === 'Semua' ? 'Semua Jam' : st === 'Buka' ? 'Sedang Buka' : 'Jam Terbatas'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Trail Route & Elevation Explorer */}
      <section className="bg-white rounded-[24px] border border-[#1b4d3e]/[0.08] p-5 sm:p-6 card-ambient">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <p className="text-xs font-semibold text-[#97472e] mb-0.5">
              Peta Jalur &amp; Profil Elevasi
            </p>
            <h2 className="text-xl font-bold text-[#191c1a]">
              Pilih Rute Jalan Kaki Desa
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {TRAIL_ROUTES.map((route) => {
              const active = route.id === activeRoute.id;
              return (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => setActiveRouteId(route.id)}
                  className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#1b4d3e] text-white'
                      : 'bg-[#f2f4ef] text-[#404945] hover:bg-[#e7e9e4]'
                  }`}
                >
                  {route.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Elevation Curve & Route Metrics */}
          <div className="lg:col-span-5 bg-[#f8faf5] rounded-2xl border border-[#1b4d3e]/[0.08] p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b4d3e]">
                <Mountain className="w-4 h-4" />
                <span>{activeRoute.difficulty}</span>
              </span>
              <span
                className={`text-xs font-semibold ${
                  activeRoute.status === 'Buka' ? 'text-[#2e7d32]' : 'text-[#d97706]'
                }`}
              >
                {activeRoute.status} · {activeRoute.statusText}
              </span>
            </div>

            <div className="py-2">
              <svg
                viewBox="0 0 320 100"
                className="w-full h-28 overflow-visible"
                role="img"
                aria-label={`Grafik elevasi ${activeRoute.name}`}
              >
                <defs>
                  <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1b4d3e" stopOpacity="0.24" />
                    <stop offset="100%" stopColor="#1b4d3e" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <polygon
                  points={`0,96 ${svgPoints} 320,96`}
                  fill="url(#elevGrad)"
                />
                <polyline
                  fill="none"
                  stroke="#1b4d3e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={svgPoints}
                />
                {activeRoute.profilePoints.map((val, idx) => {
                  const x = (idx / (activeRoute.profilePoints.length - 1)) * 320;
                  const y = 90 - ((val - minElev) / range) * 72;
                  return (
                    <circle
                      key={idx}
                      cx={x}
                      cy={y}
                      r="3.5"
                      fill="#c86d51"
                      stroke="#f8faf5"
                      strokeWidth="1.5"
                    />
                  );
                })}
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#1b4d3e]/10 text-xs">
              <div>
                <p className="text-[#404945]">Jarak PP</p>
                <p className="font-bold text-[#191c1a] tabular-nums">
                  {activeRoute.distanceKm.toFixed(1).replace('.', ',')} km
                </p>
              </div>
              <div>
                <p className="text-[#404945]">Durasi</p>
                <p className="font-bold text-[#191c1a]">{activeRoute.duration}</p>
              </div>
              <div>
                <p className="text-[#404945]">Tanjakan</p>
                <p className="font-bold text-[#97472e] tabular-nums">
                  {activeRoute.elevationGain}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Waypoint List */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              {activeRoute.waypoints.map((wp, index) => (
                <div
                  key={wp.km}
                  className="bg-[#f8faf5] rounded-2xl border border-[#1b4d3e]/[0.08] p-3.5 flex items-start gap-3.5"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1b4d3e] text-white text-xs font-bold flex items-center justify-center shrink-0 tabular-nums">
                    0{index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-[#97472e] tabular-nums">{wp.km}</span>
                      <span className="text-[#404945] font-semibold tabular-nums">
                        {wp.altitude}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-[#191c1a] mt-0.5">{wp.name}</p>
                    <p className="text-xs text-[#404945] mt-0.5">{wp.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#404945] flex items-center gap-2 pt-1">
              <Compass className="w-4 h-4 text-[#1b4d3e] shrink-0" />
              <span>Permukaan jalur: {activeRoute.surface}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Filtered Destinations Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[24px] border border-[#1b4d3e]/[0.08] p-10 text-center space-y-3">
          <p className="text-base font-bold text-[#191c1a]">
            Belum ada destinasi yang cocok dengan pencarian Anda
          </p>
          <p className="text-sm text-[#404945]">
            Coba atur ulang kata kunci atau pilih kategori &ldquo;Semua&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('Semua');
              setStatusFilter('Semua');
            }}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1b4d3e] text-white text-xs font-semibold"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <DestinationCard
              key={item.id}
              item={item}
              onSelect={onSelectDestination}
              onBook={onBookDestination}
            />
          ))}
        </div>
      )}
    </div>
  );
}
