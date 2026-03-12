export default function ContactPage() {
  return (
    <div className="gov-section">
      <div className="gov-container grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start">
        <section className="space-y-4">
          <h1 className="gov-heading-xl">
            Kontak Resmi
            <span className="mt-2 block text-base font-normal text-slate-600">
              Official Contact Channels
            </span>
          </h1>
          <p className="gov-body">
            Gunakan formulir ini hanya untuk pertanyaan terkait penggunaan
            platform LAPOR PAK MANANG. Untuk laporan kasus, silakan gunakan
            menu <strong>Lapor</strong>.
          </p>
          <p className="gov-body text-sm text-slate-600">
            Use this form only for questions about using the LAPOR PAK MANANG
            platform. For actual incident reports, please use the{" "}
            <strong>Lapor</strong> page.
          </p>
        </section>
        <section className="gov-card px-6 py-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                Nama Lengkap / Full Name
              </label>
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[color:var(--color-navy)] focus:outline-none"
                placeholder="Nama Anda"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                Email
              </label>
              <input
                type="email"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[color:var(--color-navy)] focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
              Subjek / Subject
            </label>
            <input
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[color:var(--color-navy)] focus:outline-none"
              placeholder="Pertanyaan Anda"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
              Pesan / Message
            </label>
            <textarea
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[color:var(--color-navy)] focus:outline-none"
              rows={5}
              placeholder="Tulis pesan singkat terkait platform ini..."
            />
          </div>
          <button className="inline-flex items-center rounded-full bg-[color:var(--color-navy)] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-sm hover:bg-[#132b59]">
            Kirim Pesan / Send Message
          </button>
        </section>
      </div>
    </div>
  );
}

