"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [emailSent, setEmailSent] = useState(false);
  const [waUrl, setWaUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const canSubmit =
    fullName.trim() &&
    email.trim() &&
    subject.trim() &&
    message.trim() &&
    status !== "submitting";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, subject, message }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengirim pesan");
      }

      setEmailSent(data.emailSent);
      setWaUrl(data.waUrl);
      setStatus("success");

      if (data.waUrl) {
        window.open(data.waUrl, "_blank");
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan");
      setStatus("error");
    }
  }

  if (status === "success") {
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
                Pesan Terkirim!
              </h1>
              <p className="text-sm text-slate-600">
                Your message has been sent successfully.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {emailSent ? (
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
                  Email belum terkirim (SMTP belum dikonfigurasi)
                </div>
              )}

              {waUrl && (
                <a
                  href={waUrl}
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
              )}
            </div>

            <button
              onClick={() => {
                setStatus("idle");
                setFullName("");
                setEmail("");
                setSubject("");
                setMessage("");
                setEmailSent(false);
                setWaUrl("");
              }}
              className="text-sm font-semibold text-slate-600 hover:underline"
            >
              Kirim Pesan Lain / Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gov-section">
      <div className="gov-container grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start">
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

          {/* Direct contact info */}
          <div className="mt-6 space-y-3 rounded-lg border border-slate-200 bg-slate-50 px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Hubungi Langsung / Direct Contact
            </p>
            <a
              href="https://wa.me/6590616870"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-slate-700 hover:text-[#25D366] transition-colors"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#25D366]/10 text-[#25D366]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
              </span>
              +65 9061 6870
            </a>
            <a
              href="mailto:adithyodw@gmail.com"
              className="flex items-center gap-3 text-sm text-slate-700 hover:text-[color:var(--color-navy)] transition-colors"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200 text-slate-500">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              adithyodw@gmail.com
            </a>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="gov-card px-6 py-6 space-y-4">
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
                placeholder="Nama Anda"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[color:var(--color-navy)] focus:ring-1 focus:ring-[color:var(--color-navy)] focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
              Subjek / Subject <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[color:var(--color-navy)] focus:ring-1 focus:ring-[color:var(--color-navy)] focus:outline-none"
              placeholder="Pertanyaan Anda"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
              Pesan / Message <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[color:var(--color-navy)] focus:ring-1 focus:ring-[color:var(--color-navy)] focus:outline-none"
              rows={5}
              placeholder="Tulis pesan singkat terkait platform ini..."
            />
          </div>

          {status === "error" && errorMsg && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {errorMsg}
            </div>
          )}

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
                "Kirim Pesan / Send Message"
              )}
            </button>
            <p className="text-[11px] text-slate-500">
              Pesan akan dikirim ke email dan WhatsApp.
              <br />
              Message will be sent via email and WhatsApp.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
