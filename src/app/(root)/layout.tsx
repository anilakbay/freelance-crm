import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar"; // Şimdi oluşturacağız!

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar'ı şimdi ekliyoruz */}
      <Navbar />

      {/* flex-grow yerine grow yazdık, daha modern */}
      <main className="grow">{children}</main>

      <Footer />
    </div>
  );
}
