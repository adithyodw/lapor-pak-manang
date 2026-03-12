"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

const CATEGORIES = [
  { value: "korupsi", label: "Korupsi / Corruption" },
  { value: "narkotika", label: "Narkotika / Narcotics" },
  { value: "kriminalitas", label: "Kriminalitas / Crime" },
  { value: "penyalahgunaan", label: "Penyalahgunaan Wewenang / Misconduct" },
  { value: "perjudian", label: "Perjudian / Gambling" },
  { value: "penipuan", label: "Penipuan / Fraud" },
  { value: "sosial", label: "Masalah Sosial / Social Issue" },
  { value: "lainnya", label: "Lainnya / Other" },
];

type Status = "idle" | "submitting" | "success" | "error";

interface SubmitResult {
  trackingId: string;
  emailSent: boolean;
  waUrl: string;
}

export default function LaporPage() {
  const [fullName, setFullName] = useState("");
  const [nik, setNik] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const canSubmit =
    fullName.trim() &&
    nik.trim() &&
    phone.trim() &&
    title.trim() &&
    category &&
    description.trim() &&
    consent &&
    status !== "submitting";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/submit-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          nik,
          phone,
          email,
          title,
          category: CATEGORIES.find((c) => c.value === category)?.label ?? category,
          location,
          description,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengirim laporan");
      }

      setResult(data);
      setStatus("success");

      // Auto-open WhatsApp in new tab
      if (data.waUrl) {
        window.open(data.waUrl, "_blank");
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan");
      setStatus("error");
    }
  }

  if (status === "success" && result) {
    return (
      <div className="gov-section">
        <div className="gov-container max-w-2xl space-y-8">
          <div className="gov-card px-8 py-10 text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-4 ring-emerald-100">
              <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-[color:var(--color-navy)]">
                Laporan Berhasil Dikirim!
              </h1>
              <p className="text-sm text-slate-600">
                Your report has been submitted successfully.
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 border border-slate-200 px-6 py-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Kode Pelacakan / Tracking Code
              </p>
              <p className="text-3xl font-bold tracking-wider text-[color:var(--color-navy)]">
                {result.trackingId}
              </p>
              <p className="text-xs text-slate-500">
                Simpan kode ini untuk memantau status laporan Anda.
                <br />
                Save this code to monitor your report status.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {result.emailSent ? (
                <div className="flex items-center justify-center gap-2 text-sm text-emerald-700 bg-emerald-50 rounded-lg px-4 py-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Email notifikasi telah dikirim / Email notification sent
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-sm text-amber-700 bg-amber-50 rounded-lg px-4 py-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 110 18 9 9 0 010-18z" />
                  </svg>
                  Email gagal terkirim (SMTP belum dikonfigurasi) / Email not sent (SMTP not configured)
                </div>
              )}

              <a
                href={result.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1da851] transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.462-1.496A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.34 0-4.508-.664-6.36-1.813l-.444-.269-2.645.887.886-2.648-.277-.452A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                Kirim juga via WhatsApp / Also send via WhatsApp
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/dashboard"
                className="text-sm font-semibold text-[color:var(--color-navy)] hover:underline"
              >
                Lihat Dashboard / View Dashboard
              </Link>
              <button
                onClick={() => {
                  setStatus("idle");
                  setResult(null);
                  setFullName("");
                  setNik("");
                  setPhone("");
                  setEmail("");
                  setTitle("");
                  setCategory("");
                  setLocation("");
                  setDescription("");
                  setConsent(false);
                }}
                className="text-sm font-semibold text-slate-600 hover:underline"
              >
                Kirim Laporan Lain / Submit Another Report
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gov-section">
      <div className="gov-container grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
        <section className="space-y-6">
          <header className="space-y-2">
            <h1 className="gov-heading-xl">
              Lapor Pak Manang
              <span className="mt-2 block text-base font-normal text-slate-600">
                Report Securely to Commissioner Manang
              </span>
            </h1>
            <p className="gov-body max-w-2xl">
              Sampaikan laporan terkait tindak pidana, korupsi, narkotika, atau
              penyimpangan sosial secara aman. Mohon isi setiap bagian dengan
              jujur dan lengkap agar dapat diproses secara optimal.
            </p>
            <p className="gov-body max-w-2xl text-sm text-slate-600">
              Submit your report on crime, corruption, narcotics, or social
              misconduct securely. Please provide accurate and complete
              information so that your case can be processed effectively.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="gov-card px-6 py-6 space-y-6">
            {/* Reporter Identity */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">
                Identitas Pelapor / Reporter Identity
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                    Nama Lengkap / Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[color:var(--color-navy)] focus:ring-1 focus:ring-[color:var(--color-navy)] focus:outline-none"
                    placeholder="Nama sesuai KTP"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                    Nomor Induk Kependudukan (NIK) <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    maxLength={16}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[color:var(--color-navy)] focus:ring-1 focus:ring-[color:var(--color-navy)] focus:outline-none"
                    placeholder="16 digit NIK"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                    Nomor Telepon / Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[color:var(--color-navy)] focus:ring-1 focus:ring-[color:var(--color-navy)] focus:outline-none"
                    placeholder="+62..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[color:var(--color-navy)] focus:ring-1 focus:ring-[color:var(--color-navy)] focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Incident Details */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">
                Rincian Kejadian / Incident Details
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                    Judul Singkat / Short Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[color:var(--color-navy)] focus:ring-1 focus:ring-[color:var(--color-navy)] focus:outline-none"
                    placeholder="Ringkasan laporan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                    Kategori Laporan / Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[color:var(--color-navy)] focus:ring-1 focus:ring-[color:var(--color-navy)] focus:outline-none"
                  >
                    <option value="">Pilih kategori / Select category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                  Lokasi Kejadian / Incident Location
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[color:var(--color-navy)] focus:ring-1 focus:ring-[color:var(--color-navy)] focus:outline-none"
                  placeholder="Kabupaten/Kota, Provinsi"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                  Kronologi Singkat / Incident Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[color:var(--color-navy)] focus:ring-1 focus:ring-[color:var(--color-navy)] focus:outline-none"
                  rows={6}
                  placeholder="Jelaskan waktu, tempat, pelaku, dan bukti pendukung yang Anda miliki. / Describe time, place, people involved, and any supporting details."
                />
              </div>
            </div>

            {/* Consent */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">
                Pernyataan & Persetujuan / Declaration & Consent
              </h2>
              <p className="text-xs leading-relaxed text-slate-600">
                Dengan mengirim laporan ini, saya menyatakan bahwa informasi yang
                saya berikan adalah benar sesuai pengetahuan saya dan saya
                memahami bahwa pemberian informasi palsu dapat dikenakan
                konsekuensi hukum.
              </p>
              <p className="text-xs leading-relaxed text-slate-600">
                By submitting this report, I declare that the information
                provided is true to the best of my knowledge and I understand
                that providing false information may lead to legal consequences.
              </p>
              <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-400 text-[color:var(--color-navy)] focus:ring-[color:var(--color-navy)]"
                />
                <span>
                  Saya setuju dengan ketentuan di atas dan kebijakan privasi
                  platform ini. / I agree to the above terms and the platform
                  privacy policy.
                </span>
              </label>
            </div>

            {/* Error message */}
            {status === "error" && errorMsg && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {errorMsg}
              </div>
            )}

            {/* Submit */}
            <div className="flex flex-wrap gap-3 items-center">
              <button
                type="submit"
                disabled={!canSubmit}
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-navy)] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-sm hover:bg-[#132b59] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {status === "submitting" ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Mengirim / Sending...
                  </>
                ) : (
                  "Kirim Laporan / Submit Report"
                )}
              </button>
              <p className="text-[11px] text-slate-500">
                Laporan akan dikirim ke email dan WhatsApp Kombes Manang.
                <br />
                Report will be sent via email and WhatsApp to Commissioner Manang.
              </p>
            </div>
          </form>
        </section>

        <aside className="gov-card px-6 py-6 space-y-4 bg-slate-50">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-700">
            Panduan Singkat / Quick Guidance
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li>
              Hindari menyebarkan laporan ini ke media sosial sebelum ada
              penanganan resmi. / Avoid publishing the report on social media
              before official handling.
            </li>
            <li>
              Lampirkan informasi sejelas mungkin untuk mempercepat proses
              verifikasi. / Provide clear details to speed up verification.
            </li>
            <li>
              Jangan mencantumkan NIK atau nomor kontak pihak lain tanpa izin
              mereka. / Do not include other people&apos;s ID numbers or contact
              details without consent.
            </li>
          </ul>

          <div className="rounded-lg bg-white border border-slate-200 px-4 py-3 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Laporan dikirim ke / Reports sent to
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              adithyodw@gmail.com
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <svg className="h-4 w-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              +65 9061 6870
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Untuk keadaan darurat yang mengancam jiwa, segera hubungi layanan
            darurat terdekat. / For life-threatening emergencies, please contact
            your local emergency services immediately.
          </p>
          <Link
            href="/faq"
            className="inline-flex text-xs font-semibold text-[color:var(--color-navy)] hover:underline"
          >
            Baca FAQ sebelum mengirim laporan / Read FAQ before submitting
          </Link>
        </aside>
      </div>
    </div>
  );
}
