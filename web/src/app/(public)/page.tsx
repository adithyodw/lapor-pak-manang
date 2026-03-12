import Link from "next/link";
import Image from "next/image";
import { fetchPublicMetrics } from "@/lib/api";

export default async function HomePage() {
  const metrics = await fetchPublicMetrics();

  return (
    <div className="gov-section">
      <div className="gov-container space-y-10">
        {/* Hero: stacks on mobile, side-by-side on desktop */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
          <section className="space-y-6">
            <div className="inline-flex items-center rounded-full bg-[rgba(10,31,68,0.05)] px-3 py-1 text-xs font-medium text-[color:var(--color-navy)] ring-1 ring-[rgba(10,31,68,0.12)]">
              Platform Pelaporan Publik Nasional
            </div>
            <div className="space-y-3">
              <h1 className="gov-heading-xl">
                LAPOR PAK MANANG
                <span className="block text-lg sm:text-xl text-slate-600 mt-2">
                  Suara Rakyat untuk Keadilan
                </span>
              </h1>
              <p className="gov-body max-w-xl text-sm sm:text-base">
                Platform digital resmi untuk melaporkan kriminalitas, korupsi,
                narkotika, dan penyimpangan sosial secara aman langsung kepada
                Kombes Manang Soebeti dan tim penegak hukum terpilih.
              </p>
            </div>

            {/* CTA buttons — full width on very small screens */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/lapor"
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-navy)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-md hover:bg-[#132b59] active:scale-[0.97] transition-all"
              >
                Laporkan Sekarang
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[color:var(--color-navy)] hover:bg-slate-50 active:scale-[0.97] transition-all"
              >
                Lihat Dashboard Kasus
              </Link>
            </div>
          </section>

          {/* Manang portrait card — shown above on mobile via order */}
          <aside className="gov-card overflow-hidden border-t-4 border-[color:var(--color-gold)] bg-slate-50 order-first lg:order-last">
            <div className="relative flex flex-col">
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[color:var(--color-navy)]">
                <Image
                  src="/manang-hero.png"
                  alt="Kombes Manang Soebeti"
                  fill
                  priority
                  sizes="(min-width: 1024px) 320px, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-100/80">
                    KOMBES MANANG SOEBETI
                  </p>
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-white">
                    &ldquo;Setiap laporan rakyat adalah amanah yang wajib dijaga
                    dan ditindaklanjuti secara profesional.&rdquo;
                  </p>
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  KEPEMIMPINAN
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                  LAPOR PAK MANANG dibangun sebagai kanal resmi, modern, dan
                  aman untuk memastikan informasi dari masyarakat sampai langsung
                  ke meja penanganan yang tepat.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Stats grid — 2 cols on mobile, 4 on desktop */}
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <li className="gov-card px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
              Kasus Dilaporkan
            </p>
            <p className="mt-1.5 text-xl sm:text-2xl font-semibold text-slate-900">
              {metrics.totalReports.toLocaleString("id-ID")}
            </p>
          </li>
          <li className="gov-card px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
              Dalam Penelaahan
            </p>
            <p className="mt-1.5 text-xl sm:text-2xl font-semibold text-slate-900">
              {metrics.underReview.toLocaleString("id-ID")}
            </p>
          </li>
          <li className="gov-card px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
              Dalam Investigasi
            </p>
            <p className="mt-1.5 text-xl sm:text-2xl font-semibold text-slate-900">
              {metrics.openCases.toLocaleString("id-ID")}
            </p>
          </li>
          <li className="gov-card px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
              Kasus Selesai
            </p>
            <p className="mt-1.5 text-xl sm:text-2xl font-semibold text-slate-900">
              {metrics.closedCases.toLocaleString("id-ID")}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
