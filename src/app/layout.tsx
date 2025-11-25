import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Freelance CRM",
  description: "İşlerinizi Kolayca Yönetin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} antialiased bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
