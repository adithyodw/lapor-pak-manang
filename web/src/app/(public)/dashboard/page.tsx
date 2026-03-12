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

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.labelId}
              className="gov-card px-5 py-4 flex flex-col gap-2"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {card.labelId}
                <span className="block text-[10px] font-normal text-slate-400">
                  {card.labelEn}
                </span>
              </p>
              <p className="text-2xl font-semibold text-[color:var(--color-navy)]">
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
          <div className="flex items-end gap-2 h-44 rounded-lg border border-slate-200 bg-gradient-to-t from-slate-50 to-white px-4 pb-3 pt-4">
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
                className="flex-1 flex flex-col items-center gap-1"
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
          <div className="grid gap-6 lg:grid-cols-2">
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
            <div className="h-64 rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex flex-col items-center justify-center gap-2 text-center px-6">
              <svg
                className="h-10 w-10 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                />
              </svg>
              <p className="text-xs text-slate-500">
                Peta interaktif Indonesia (Mapbox) akan menampilkan heatmap
                intensitas laporan per provinsi/kota di sini.
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

