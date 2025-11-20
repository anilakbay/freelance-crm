import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Projenin SEO ve Tarayıcı Başlığı burasıdır.
export const metadata: Metadata = {
  title: {
    default: "Freelance CRM | Müşteri Yönetim Sistemi",
    template: "%s | Freelance CRM",
  },
  description: "Freelancer'lar için özel olarak tasarlanmış, müşterileri ve projeleri yönetme platformu.",
  keywords: ["Freelance CRM", "Next.js", "Supabase", "Müşteri Takibi"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // DİKKAT: Aşağıda return ( ile <html> etiketi arasında hiç boşluk bırakılmamıştır.
  return (
    <html lang="tr"> 
      <body
        className={`${inter.variable} antialiased`} 
      >
        {children}
      </body>
    </html>
  );
}