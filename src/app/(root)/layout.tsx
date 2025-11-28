import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* w-full: İçeriğin her zaman ekran genişliğini doldurmasını garanti eder */}
      <main className="grow w-full">{children}</main>

      <Footer />
    </div>
  );
}
