import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GovLayout } from "@/components/layout/GovLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0a1f44",
};

export const metadata: Metadata = {
  title: "LAPOR PAK MANANG",
  description:
    "Platform digital pelaporan masalah sosial dan kriminalitas kepada Kombes Manang Soebeti.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LAPOR PAK MANANG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} antialiased bg-[color:var(--color-gray-bg)]`}>
        <GovLayout>{children}</GovLayout>
      </body>
    </html>
  );
}
