import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#2563eb",
};

export const metadata: Metadata = {
  title: {
    default: "TaskPilot CRM | Freelance İş Yönetimi",
    template: "%s | TaskPilot CRM",
  },
  description:
    "Modern ve kullanıcı dostu freelance CRM sistemi. Müşterilerinizi, projelerinizi, görevlerinizi ve faturalarınızı tek platformda yönetin.",
  keywords: ["freelance", "crm", "proje yönetimi", "müşteri takibi", "fatura", "iş yönetimi"],
  authors: [{ name: "TaskPilot CRM" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://taskpilotcrm.vercel.app",
    title: "TaskPilot CRM | Freelance İş Yönetimi",
    description: "Freelancerlar için modern iş yönetim platformu",
    siteName: "TaskPilot CRM",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskPilot CRM",
    description: "Freelancerlar için modern iş yönetim platformu",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body
        className={`${inter.variable} antialiased bg-gray-50 text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
