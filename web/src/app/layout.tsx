import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GovLayout } from "@/components/layout/GovLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LAPOR PAK MANANG",
  description:
    "Platform digital pelaporan masalah sosial dan kriminalitas kepada Kombes Manang Soebeti.",
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
