import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#3b82f6",
};

export const metadata: Metadata = {
  title: {
    default: "TaskPilot CRM | Freelance İş Yönetimi",
    template: "%s | TaskPilot CRM",
  },
  description:
    "Modern ve kullanıcı dostu freelance CRM sistemi. Müşterilerinizi, projelerinizi ve faturalarınızı tek platformda yönetin.",
  keywords: ["freelance", "crm", "proje yönetimi", "müşteri takibi", "fatura", "iş yönetimi"],
  authors: [{ name: "TaskPilot CRM" }],
  creator: "TaskPilot CRM",
  publisher: "TaskPilot CRM",
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://taskpilotcrm.vercel.app",
    title: "TaskPilot CRM | Freelance İş Yönetimi",
    description: "Modern freelance CRM sistemi",
    siteName: "TaskPilot CRM",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskPilot CRM",
    description: "Modern freelance CRM sistemi",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
