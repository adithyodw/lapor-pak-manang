import { fetchPublicMetrics } from "@/lib/api";
import Link from "next/link";

export default async function DashboardPage() {
  const metrics = await fetchPublicMetrics();

  const cards = [
    {
      labelId: "Total Laporan",
      labelEn: "Total Reports",
      value: metrics.totalReports,
    },
    {
      labelId: "Dalam Penelaahan",
      labelEn: "Under Review",
      value: metrics.underReview,
    },
    {
      labelId: "Dalam Investigasi",
      labelEn: "Under Investigation",
      value: metrics.openCases,
    },
    {
      labelId: "Kasus Selesai",
      labelEn: "Closed Cases",
      value: metrics.closedCases,
    },
  ];

  return (
    <div className="gov-section">
      <div className="gov-container space-y-8">
        <header className="space-y-3">
          <h1 className="gov-heading-xl">
            Dashboard Transparansi Kasus
            <span className="mt-2 block text-base font-normal text-slate-600">
              Public Case Transparency Dashboard
            </span>
          </h1>
          <p className="gov-body max-w-3xl">
            Ringkasan agregat laporan yang diterima oleh LAPOR PAK MANANG. Data
            bersifat anonim dan ditampilkan untuk meningkatkan transparansi
            kepada publik.
          </p>
        </header>

        <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.labelId}
              className="gov-card px-4 py-3 sm:px-5 sm:py-4 flex flex-col gap-1.5"
            >
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {card.labelId}
                <span className="block text-[9px] sm:text-[10px] font-normal text-slate-400">
                  {card.labelEn}
                </span>
              </p>
              <p className="text-xl sm:text-2xl font-semibold text-[color:var(--color-navy)]">
                {card.value.toLocaleString("id-ID")}
              </p>
            </div>
          ))}
        </section>

        {/* Tren Bulanan – sample bar chart */}
        <section className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                TREN BULANAN
              </p>
              <p className="text-sm text-slate-600">
                Monthly case volume trend
              </p>
            </div>
            <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[10px] font-semibold text-amber-700">
              SAMPLE DATA ONLY
            </span>
          </div>
          <div className="flex items-end gap-2 h-44 rounded-lg border border-slate-200 bg-gradient-to-t from-slate-50 to-white px-3 sm:px-4 pb-3 pt-4 overflow-x-auto">
            {[
              { month: "Jan", v: 58 },
              { month: "Feb", v: 74 },
              { month: "Mar", v: 112 },
              { month: "Apr", v: 86 },
              { month: "Mei", v: 138 },
              { month: "Jun", v: 104 },
              { month: "Jul", v: 156 },
              { month: "Agu", v: 148 },
              { month: "Sep", v: 127 },
              { month: "Okt", v: 95 },
              { month: "Nov", v: 88 },
              { month: "Des", v: 67 },
            ].map((item) => (
              <div
                key={item.month}
                className="flex-1 min-w-[28px] flex flex-col items-center gap-1"
              >
                <span className="text-[9px] font-semibold text-[color:var(--color-navy)]">
                  {item.v}
                </span>
                <div className="w-full rounded-sm bg-slate-100 relative" style={{ height: "120px" }}>
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-sm bg-[color:var(--color-navy)]"
                    style={{ height: `${(item.v / 170) * 100}%` }}
                  />
                </div>
                <span className="text-[9px] text-slate-500">{item.month}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {/* Kasus per Kategori – sample horizontal bars */}
          <div className="gov-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  KASUS PER KATEGORI
                </p>
                <p className="text-sm text-slate-600">
                  Distribution by category
                </p>
              </div>
              <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[10px] font-semibold text-amber-700">
                SAMPLE
              </span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Korupsi / Corruption", pct: 35, count: 434 },
                { label: "Narkotika / Drug Crime", pct: 22, count: 273 },
                { label: "Penyalahgunaan / Misconduct", pct: 18, count: 224 },
                { label: "Perjudian / Gambling", pct: 10, count: 124 },
                { label: "Penipuan / Fraud", pct: 9, count: 112 },
                { label: "Lainnya / Other", pct: 6, count: 76 },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span>{item.label}</span>
                    <span className="font-semibold text-slate-800">
                      {item.count} ({item.pct}%)
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[color:var(--color-gold)]"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Kasus – sample donut-like summary */}
          <div className="gov-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  STATUS KASUS
                </p>
                <p className="text-sm text-slate-600">Case status breakdown</p>
              </div>
              <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[10px] font-semibold text-amber-700">
                SAMPLE
              </span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Diterima / Received", pct: 25, color: "bg-slate-400" },
                { label: "Dalam Telaah / Under Review", pct: 3, color: "bg-blue-400" },
                { label: "Investigasi / Investigation", pct: 2, color: "bg-amber-500" },
                { label: "Selesai / Resolved", pct: 60, color: "bg-emerald-500" },
                { label: "Ditutup / Closed", pct: 10, color: "bg-slate-700" },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span className="flex items-center gap-2">
                      <span className={`inline-block h-2 w-2 rounded-full ${item.color}`} />
                      {item.label}
                    </span>
                    <span className="font-semibold text-slate-800">{item.pct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Peta Sebaran Kasus – sample region heat bars */}
        <section className="gov-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                PETA SEBARAN KASUS
              </p>
              <p className="text-sm text-slate-600">
                Regional report intensity (sample)
              </p>
            </div>
            <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[10px] font-semibold text-amber-700">
              SAMPLE DATA ONLY
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Visualisasi berikut menunjukkan contoh intensitas laporan per
            provinsi. Pada implementasi akhir, area ini akan digantikan oleh
            peta interaktif (Mapbox) dengan heatmap.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              {[
                { region: "DKI Jakarta", value: 320 },
                { region: "Jawa Barat", value: 245 },
                { region: "Jawa Tengah", value: 198 },
                { region: "Jawa Timur", value: 182 },
                { region: "Sumatera Utara", value: 129 },
                { region: "Sulawesi Selatan", value: 87 },
                { region: "Kalimantan Timur", value: 52 },
                { region: "Bali", value: 30 },
              ].map((item) => (
                <div key={item.region} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span>{item.region}</span>
                    <span className="font-semibold text-slate-800">
                      {item.value.toLocaleString("id-ID")} laporan
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[color:var(--color-navy)]"
                      style={{
                        width: `${Math.min((item.value / 350) * 100, 100)}%`,
                        opacity: 0.6 + (item.value / 350) * 0.4,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Indonesia Map Mockup Illustration */}
            <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-[#f0f4f8] via-[#e8eef5] to-[#dde6f0] p-4 sm:p-6 relative overflow-hidden">
              <div className="absolute top-3 right-3 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[9px] font-semibold text-amber-700 z-10">
                MOCKUP
              </div>
              <svg viewBox="0 0 800 350" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Ocean background */}
                <rect width="800" height="350" fill="none" />
                {/* Grid lines */}
                <line x1="0" y1="87" x2="800" y2="87" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="4" opacity="0.4"/>
                <line x1="0" y1="175" x2="800" y2="175" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="4" opacity="0.4"/>
                <line x1="0" y1="262" x2="800" y2="262" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="4" opacity="0.4"/>
                <line x1="200" y1="0" x2="200" y2="350" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="4" opacity="0.4"/>
                <line x1="400" y1="0" x2="400" y2="350" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="4" opacity="0.4"/>
                <line x1="600" y1="0" x2="600" y2="350" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="4" opacity="0.4"/>

                {/* Sumatra */}
                <path d="M80,100 L120,80 L145,90 L160,120 L170,160 L165,200 L140,240 L110,260 L90,240 L75,200 L70,160 L72,130 Z" fill="#0a1f44" opacity="0.6" stroke="#0a1f44" strokeWidth="1"/>
                {/* Heatspot Sumatra Utara */}
                <circle cx="120" cy="110" r="16" fill="#c9a227" opacity="0.5"/>
                <circle cx="120" cy="110" r="8" fill="#c9a227" opacity="0.8"/>

                {/* Java */}
                <path d="M175,225 L220,218 L280,215 L330,218 L370,225 L380,235 L370,242 L320,240 L270,238 L220,235 L185,238 L175,232 Z" fill="#0a1f44" opacity="0.85" stroke="#0a1f44" strokeWidth="1"/>
                {/* DKI Jakarta hotspot */}
                <circle cx="220" cy="222" r="20" fill="#c9a227" opacity="0.5"/>
                <circle cx="220" cy="222" r="10" fill="#c9a227" opacity="0.8"/>
                <text x="220" y="210" textAnchor="middle" fontSize="8" fill="#0a1f44" fontWeight="bold">Jakarta</text>
                {/* Jawa Barat */}
                <circle cx="260" cy="220" r="14" fill="#c9a227" opacity="0.45"/>
                <circle cx="260" cy="220" r="7" fill="#c9a227" opacity="0.7"/>
                {/* Jawa Timur */}
                <circle cx="345" cy="224" r="12" fill="#c9a227" opacity="0.4"/>
                <circle cx="345" cy="224" r="6" fill="#c9a227" opacity="0.65"/>

                {/* Kalimantan */}
                <path d="M270,90 L320,75 L370,80 L395,100 L400,140 L390,175 L360,195 L320,200 L290,190 L265,165 L255,130 L260,105 Z" fill="#0a1f44" opacity="0.45" stroke="#0a1f44" strokeWidth="1"/>
                {/* Kalimantan Timur */}
                <circle cx="370" cy="120" r="10" fill="#c9a227" opacity="0.35"/>
                <circle cx="370" cy="120" r="5" fill="#c9a227" opacity="0.6"/>

                {/* Sulawesi */}
                <path d="M430,95 L450,80 L465,85 L460,110 L475,130 L490,120 L500,140 L485,160 L470,180 L455,170 L445,145 L435,160 L420,145 L425,120 Z" fill="#0a1f44" opacity="0.55" stroke="#0a1f44" strokeWidth="1"/>
                {/* Sulawesi Selatan */}
                <circle cx="450" cy="158" r="11" fill="#c9a227" opacity="0.4"/>
                <circle cx="450" cy="158" r="5.5" fill="#c9a227" opacity="0.7"/>

                {/* Bali */}
                <ellipse cx="392" cy="240" rx="10" ry="7" fill="#0a1f44" opacity="0.5" stroke="#0a1f44" strokeWidth="0.5"/>
                <circle cx="392" cy="240" r="5" fill="#c9a227" opacity="0.3"/>

                {/* NTB & NTT */}
                <ellipse cx="418" cy="245" rx="12" ry="5" fill="#0a1f44" opacity="0.35" stroke="#0a1f44" strokeWidth="0.5"/>
                <ellipse cx="448" cy="248" rx="14" ry="5" fill="#0a1f44" opacity="0.3" stroke="#0a1f44" strokeWidth="0.5"/>
                <ellipse cx="480" cy="250" rx="10" ry="4" fill="#0a1f44" opacity="0.25" stroke="#0a1f44" strokeWidth="0.5"/>

                {/* Maluku */}
                <ellipse cx="540" cy="150" rx="15" ry="10" fill="#0a1f44" opacity="0.3" stroke="#0a1f44" strokeWidth="0.5"/>
                <ellipse cx="560" cy="175" rx="10" ry="6" fill="#0a1f44" opacity="0.25" stroke="#0a1f44" strokeWidth="0.5"/>

                {/* Papua */}
                <path d="M600,100 L650,85 L710,90 L740,110 L745,145 L730,175 L700,190 L660,185 L630,170 L610,145 L600,120 Z" fill="#0a1f44" opacity="0.3" stroke="#0a1f44" strokeWidth="1"/>

                {/* Legend */}
                <rect x="20" y="295" width="200" height="45" rx="6" fill="white" opacity="0.85" stroke="#e2e8f0" strokeWidth="1"/>
                <text x="32" y="312" fontSize="8" fill="#64748b" fontWeight="bold">INTENSITAS LAPORAN</text>
                <circle cx="38" cy="327" r="5" fill="#c9a227" opacity="0.3"/>
                <text x="48" y="330" fontSize="7" fill="#64748b">Rendah</text>
                <circle cx="88" cy="327" r="5" fill="#c9a227" opacity="0.55"/>
                <text x="98" y="330" fontSize="7" fill="#64748b">Sedang</text>
                <circle cx="148" cy="327" r="5" fill="#c9a227" opacity="0.85"/>
                <text x="158" y="330" fontSize="7" fill="#64748b">Tinggi</text>
              </svg>
              <p className="text-center text-[10px] text-slate-400 mt-2">
                Ilustrasi peta sebaran kasus per provinsi — akan digantikan peta interaktif Mapbox pada versi produksi
              </p>
            </div>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <span>
            Data ditampilkan secara anonim. Tidak ada informasi identitas
            pribadi yang ditayangkan dalam dashboard publik ini.
          </span>
          <Link
            href="/transparency"
            className="text-[color:var(--color-navy)] font-semibold hover:underline"
          >
            Baca metodologi transparansi / Transparency methodology
          </Link>
        </footer>
      </div>
    </div>
  );
}

