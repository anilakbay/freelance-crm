import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// 1. MOBİL GÖRÜNÜM AYARLARI (Telefonda düzgün ölçeklenmesi için şart)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#2563eb", // Mobil tarayıcı üst bar rengi (Mavi)
};

// 2. SEO VE PAYLAŞIM AYARLARI
export const metadata: Metadata = {
  title: {
    default: "Freelance CRM | İş Yönetim Paneli",
    template: "%s | Freelance CRM",
  },
  description:
    "Freelancerlar için geliştirilmiş basit ve güçlü müşteri takip sistemi.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      {/* text-gray-900: Varsayılan yazı rengini koyu gri yaptık (Okunabilirlik)
        antialiased: Yazıların daha pürüzsüz görünmesini sağlar
      */}
      <body
        className={`${inter.variable} antialiased bg-gray-50 text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
