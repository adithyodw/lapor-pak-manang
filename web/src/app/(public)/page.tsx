import Link from "next/link";
import Image from "next/image";
import { fetchPublicMetrics } from "@/lib/api";

export default async function HomePage() {
  const metrics = await fetchPublicMetrics();

  return (
    <div className="gov-section">
      <div className="gov-container grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
        <section className="space-y-8">
          <div className="inline-flex items-center rounded-full bg-[rgba(10,31,68,0.05)] px-3 py-1 text-xs font-medium text-[color:var(--color-navy)] ring-1 ring-[rgba(10,31,68,0.12)]">
            Platform Pelaporan Publik Nasional
          </div>
          <div className="space-y-4">
            <h1 className="gov-heading-xl">
              LAPOR PAK MANANG
              <span className="block text-xl text-slate-600 mt-2">
                Suara Rakyat untuk Keadilan
              </span>
            </h1>
            <p className="gov-body max-w-xl">
              Platform digital resmi untuk melaporkan kriminalitas, korupsi,
              narkotika, dan penyimpangan sosial secara aman langsung kepada
              Kombes Manang Soebeti dan tim penegak hukum terpilih.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/lapor"
              className="inline-flex items-center rounded-full bg-[color:var(--color-navy)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-md hover:bg-[#132b59]"
            >
              Laporkan Sekarang
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[color:var(--color-navy)] hover:bg-slate-50"
            >
              Lihat Dashboard Kasus
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            <li className="gov-card px-5 py-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                Kasus Dilaporkan
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {metrics.totalReports.toLocaleString("id-ID")}
              </p>
            </li>
            <li className="gov-card px-5 py-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                Dalam Penelaahan
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {metrics.underReview.toLocaleString("id-ID")}
              </p>
            </li>
            <li className="gov-card px-5 py-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                Dalam Investigasi
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {metrics.openCases.toLocaleString("id-ID")}
              </p>
            </li>
            <li className="gov-card px-5 py-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                Kasus Selesai
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {metrics.closedCases.toLocaleString("id-ID")}
              </p>
            </li>
          </ul>
        </section>
        <aside className="gov-card overflow-hidden border-t-4 border-[color:var(--color-gold)] bg-slate-50">
          <div className="relative h-full flex flex-col">
            <div className="relative h-64 w-full overflow-hidden bg-[color:var(--color-navy)]">
              <Image
                src="/manang-hero.png"
                alt="Kombes Manang Soebeti"
                fill
                priority
                sizes="(min-width: 1024px) 320px, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-100/80">
                  KOMBES MANANG SOEBETI
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  “Setiap laporan rakyat adalah amanah yang wajib dijaga dan
                  ditindaklanjuti secara profesional.”
                </p>
              </div>
            </div>
            <div className="p-6 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                KEPEMIMPINAN
              </p>
              <p className="text-sm leading-relaxed text-slate-700">
                LAPOR PAK MANANG dibangun sebagai kanal resmi, modern, dan
                aman untuk memastikan informasi dari masyarakat sampai langsung
                ke meja penanganan yang tepat.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

