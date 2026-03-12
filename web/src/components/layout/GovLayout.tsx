"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

interface GovLayoutProps {
  children: ReactNode;
}

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Tentang Manang" },
  { href: "/lapor", label: "Lapor" },
  { href: "/dashboard", label: "Dashboard Kasus" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Kontak" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram @manangsoebeti_official",
    href: "https://www.instagram.com/manangsoebeti_official/",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "TikTok @manangsoebeti_official",
    href: "https://www.tiktok.com/@manangsoebeti_official",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.2 8.2 0 005.58 2.18v-3.45a4.85 4.85 0 01-3.77-1.27V6.69h3.77z" />
      </svg>
    ),
  },
  {
    label: "Threads @manangsoebeti_official",
    href: "https://www.threads.com/@manangsoebeti_official",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.773.748c-1.035-3.722-3.59-5.608-7.576-5.602-2.773.01-4.81.89-6.055 2.612-1.14 1.578-1.727 3.876-1.745 6.834v.042c.017 2.94.607 5.238 1.753 6.826 1.246 1.724 3.28 2.601 6.047 2.608h.007c2.14-.012 3.876-.55 5.161-1.597 1.2-.977 1.96-2.347 2.255-4.072-1.087.564-2.313.893-3.623.976-3.406.217-6.06-.85-7.475-3.005-.946-1.44-1.409-3.27-1.338-5.29.114-3.238 1.717-5.78 4.403-6.982a7.675 7.675 0 013.382-.765c2.32 0 4.206.838 5.45 2.424.625.797 1.07 1.773 1.32 2.89l-.002.001c-.26-.086-.52-.159-.788-.22-.7-.157-1.422-.206-2.13-.149-2.677.216-4.085 1.824-4.17 3.136-.052.796.208 1.522.733 2.046.558.557 1.396.88 2.37.914 1.94.066 3.598-.827 4.225-2.27.263-.61.397-1.305.397-2.068v-.154c0-2.37-.82-4.14-2.44-5.268-1.2-.837-2.77-1.28-4.532-1.28h-.01c-1.41 0-2.67.323-3.748.96-2.06 1.22-3.286 3.256-3.37 5.603-.057 1.6.29 3.046 1.005 4.135 1.015 1.546 2.87 2.337 5.37 2.178.864-.055 1.69-.218 2.449-.483.23.78.38 1.6.43 2.443-1.053.36-2.174.575-3.353.618z" />
      </svg>
    ),
  },
  {
    label: "Instagram @indopolicegram",
    href: "https://www.instagram.com/indopolicegram/",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export function GovLayout({ children }: GovLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-40">
        <div className="gov-container flex items-center justify-between py-3 gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="h-9 w-9 rounded-full bg-[color:var(--color-navy)] flex items-center justify-center text-[color:var(--color-gold)] font-semibold text-base">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.14em] text-slate-500 leading-tight">
                LAPOR PAK MANANG
              </span>
              <span className="text-xs font-semibold text-slate-900 leading-tight">
                Suara Rakyat untuk Keadilan
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-700">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[color:var(--color-navy)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link
              href="/lapor"
              className="hidden sm:inline-flex items-center rounded-full bg-[color:var(--color-navy)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm hover:bg-[#132b59] transition-colors"
            >
              Laporkan Sekarang
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center h-9 w-9 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white">
            <nav className="gov-container py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[color:var(--color-navy)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-3 border-t border-slate-100">
                <Link
                  href="/lapor"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-full bg-[color:var(--color-navy)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-sm hover:bg-[#132b59] transition-colors"
                >
                  Laporkan Sekarang
                </Link>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-3">
                <a
                  href="https://wa.me/6590616870"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-slate-600 hover:text-[#25D366] transition-colors"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  +65 9061 6870
                </a>
                <span className="text-slate-300">|</span>
                <a
                  href="mailto:adithyodw@gmail.com"
                  className="text-xs text-slate-600 hover:text-[color:var(--color-navy)] transition-colors"
                >
                  adithyodw@gmail.com
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/6590616870"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi via WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-500/30 hover:bg-[#1da851] hover:scale-110 active:scale-95 transition-all duration-200"
      >
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.462-1.496A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.34 0-4.508-.664-6.36-1.813l-.444-.269-2.645.887.886-2.648-.277-.452A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </a>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-[color:var(--color-navy)] text-white">
        <div className="gov-container py-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-[color:var(--color-gold)] font-semibold text-lg">
                  M
                </div>
                <div>
                  <p className="text-sm font-semibold">LAPOR PAK MANANG</p>
                  <p className="text-[11px] text-slate-300">
                    Suara Rakyat untuk Keadilan
                  </p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                Platform resmi pengaduan masyarakat kepada Kombes Pol. Manang
                Soebeti. Transparan, aman, dan akuntabel.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-gold)]">
                Tautan Cepat
              </p>
              <nav className="flex flex-col gap-2 text-sm text-slate-300">
                <Link href="/lapor" className="hover:text-white transition-colors">Lapor Sekarang</Link>
                <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard Kasus</Link>
                <Link href="/about" className="hover:text-white transition-colors">Tentang Manang Soebeti</Link>
                <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
              </nav>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-gold)]">
                Hubungi Langsung
              </p>
              <div className="flex flex-col gap-2 text-sm text-slate-300">
                <a href="https://wa.me/6590616870" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#25D366] transition-colors">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /></svg>
                  +65 9061 6870
                </a>
                <a href="mailto:adithyodw@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  adithyodw@gmail.com
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-gold)]">
                Media Sosial
              </p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white transition-all">
                    {link.icon}
                  </a>
                ))}
              </div>
              <p className="text-[11px] text-slate-400">
                Ikuti media sosial resmi Kombes Manang Soebeti untuk informasi terbaru.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} LAPOR PAK MANANG. Semua hak dilindungi undang-undang.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
              <Link href="/transparency" className="hover:text-white transition-colors">Transparansi & Akuntabilitas</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
