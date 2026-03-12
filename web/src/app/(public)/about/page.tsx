import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="gov-section">
      <div className="gov-container grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
        <section className="space-y-6">
          <h1 className="gov-heading-xl">
            Tentang Kombes Manang Soebeti
            <span className="mt-2 block text-base font-normal text-slate-600">
              About Commissioner Manang Soebeti
            </span>
          </h1>
          <p className="gov-body max-w-3xl">
            Kombes Manang Soebeti dikenal sebagai perwira polisi yang dekat
            dengan masyarakat dan berkomitmen tinggi terhadap penegakan hukum
            yang bersih, transparan, dan humanis. Melalui LAPOR PAK MANANG, ia
            membuka kanal resmi bagi warga untuk menyampaikan laporan dan
            informasi penting secara aman.
          </p>
          <p className="gov-body max-w-3xl">
            Commissioner Manang Soebeti is recognized for his people-centric
            leadership and strong commitment to clean, transparent, and humane
            law enforcement. This platform is designed to ensure that every
            report from the public is received, recorded, and processed with
            professionalism.
          </p>
        </section>
        <aside className="gov-card overflow-hidden bg-slate-50">
          <div className="relative h-72 w-full">
            <Image
              src="/manang-hero.png"
              alt="Kombes Manang Soebeti"
              fill
              sizes="(min-width: 1024px) 320px, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="p-6 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              PROFIL SINGKAT
            </p>
            <p className="text-sm leading-relaxed text-slate-700">
              LAPOR PAK MANANG adalah manifestasi komitmen beliau untuk
              memperkuat kepercayaan publik terhadap institusi penegak hukum
              melalui respons yang cepat, terukur, dan dapat dipertanggungjawabkan.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

