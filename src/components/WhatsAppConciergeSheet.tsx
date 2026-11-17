import { useState, useEffect } from 'react';
import { Check, Copy, MessageCircle, Send, X } from 'lucide-react';

interface WhatsAppConciergeSheetProps {
  isOpen: boolean;
  initialTopic?: string;
  onClose: () => void;
}

const QUICK_PROMPTS = [
  'Cek kondisi kabut & cuaca puncak hari ini',
  'Tanya ketersediaan homestay untuk akhir pekan',
  'Pesan pemandu lokal & ojek desa ke Curug Pinusan',
  'Info jam buka Pasar Tani Subuh & parkir bus kecil',
];

export function WhatsAppConciergeSheet({
  isOpen,
  initialTopic = '',
  onClose,
}: WhatsAppConciergeSheetProps) {
  const [message, setMessage] = useState(initialTopic);
  const [copied, setCopied] = useState(false);
  const [sentNotice, setSentNotice] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMessage(
        initialTopic ||
          'Halo Pokdarwis Lereng Asri, saya ingin menanyakan info kunjungan dan ketersediaan pemandu lokal.'
      );
      setCopied(false);
      setSentNotice(false);
    }
  }, [isOpen, initialTopic]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
    }
  };

  const handleSendSimulation = () => {
    setSentNotice(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#002117]/50 backdrop-blur-sm p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wa-concierge-title"
    >
      <div className="bg-[#f8faf5] w-full sm:max-w-lg rounded-t-[32px] sm:rounded-[24px] overflow-hidden shadow-2xl border border-[#1b4d3e]/10">
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-[#c0c9c3]" />
        </div>

        <div className="px-5 py-4 bg-[#1b4d3e] text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25d366] text-[#002117] flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 id="wa-concierge-title" className="text-base font-bold leading-tight">
                Pusat Info Pemandu Lereng Asri
              </h2>
              <p className="text-xs text-[#baeed9]">
                Pak Darmawan (Pokdarwis) · Balas cepat 05:00–20:00 WIB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup concierge"
            className="min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <p className="text-xs font-semibold text-[#404945] mb-2">
              Pilih topik cepat atau tulis pertanyaan Anda:
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => {
                    setMessage(`Halo Pak Darmawan, ${prompt.toLowerCase()}.`);
                    setSentNotice(false);
                  }}
                  className="text-left text-xs font-medium px-3 py-2 rounded-xl bg-[#ecefea] hover:bg-[#e1e3de] text-[#191c1a] transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="wa-message-box"
              className="block text-xs font-semibold text-[#191c1a] mb-1.5"
            >
              Pesan untuk Pemandu Lokal (+62 812-2700-4411)
            </label>
            <textarea
              id="wa-message-box"
              rows={3}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setSentNotice(false);
              }}
              className="w-full p-3.5 rounded-2xl bg-white border-[1.5px] border-[#e1e3de] text-sm text-[#191c1a] focus:outline-none focus:border-[#1b4d3e] focus:ring-[3px] focus:ring-[#1b4d3e]/15"
            />
          </div>

          {sentNotice && (
            <div className="bg-[#f2f4ef] border border-[#2e7d32]/25 rounded-xl p-3.5 text-xs text-[#191c1a] flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#2e7d32] shrink-0 mt-0.5" />
              <p>
                Pesan telah diteruskan ke meja koordinasi Pokdarwis Lereng Asri. Pemandu
                bertugas akan merespons melalui WhatsApp Anda dalam beberapa menit.
              </p>
            </div>
          )}

          <div className="flex items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleCopy}
              className="min-h-[48px] px-4 py-3 rounded-xl border-[1.5px] border-[#1b4d3e]/25 text-xs font-semibold text-[#1b4d3e] hover:bg-[#ecefea] inline-flex items-center gap-1.5 shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-[#2e7d32]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin' : 'Salin Pesan'}</span>
            </button>
            <button
              type="button"
              onClick={handleSendSimulation}
              className="flex-1 min-h-[48px] px-5 py-3 rounded-xl bg-[#25d366] text-[#002117] text-sm font-bold hover:brightness-95 inline-flex items-center justify-center gap-2 whatsapp-glow"
            >
              <Send className="w-4 h-4" />
              <span>Kirim ke WhatsApp Desa</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
