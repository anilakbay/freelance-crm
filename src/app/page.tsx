import Link from "next/link";
import Features from "@/components/Features"; 
import Footer from "@/components/Footer"; // <-- YENİ FOOTER IMPORT EDİLDİ

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 p-6 pt-16 pb-24"> 
      
      {/* 1. UYGULAMANIN ANA BAŞLIĞI VE BUTONLAR (HERO SECTION) */}
      <div className="text-center max-w-2xl">
        {/* ... Hero İçeriği ... */}
      </div>

      {/* 2. İKİNCİL DEĞER TEKLİFİ METNİ */}
      <section className="py-12 px-6 max-w-6xl mx-auto text-center">
        {/* ... Açıklama Metni ... */}
      </section>

      {/* 3. ÜRÜNÜN TEMEL YETENEKLERİ */}
      <Features /> 

      {/* 4. TELİF HAKKI VE ALT YAPI BİLGİSİ */}
      <Footer /> {/* <-- BURAYA EKLENDİ */}
    </main>
  );
}