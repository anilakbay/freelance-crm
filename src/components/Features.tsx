// src/components/Features.tsx
import React from "react";

const featureItems = [
  {
    title: "Müşteri Takibi",
    description:
      "Tüm müşterilerinizin iletişim bilgilerini, projelerini ve notlarını tek bir yerde toplayın.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z"
        />
      </svg>
    ),
  },
  {
    title: "Durum Yönetimi",
    description:
      "Hangi projenin 'aktif', hangisinin 'beklemede' olduğunu tek bakışta görerek zamanınızı verimli kullanın.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Güvenli Altyapı",
    description:
      "Verilerinizi Next.js ve Supabase'in güvenli mimarisi ile koruyun. Yedekleme derdine son.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
  },
  {
    title: "Kolay Proje Yönetimi",
    description:
      "Müşterilerinizle ilişkilendirilmiş yeni projeleri hızla oluşturun ve tüm süreçleri tek ekranda takip edin.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
        />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    // ID="features" BURAYA EKLENDİ (Navbar linki buraya kayacak)
    // scroll-mt-24: Menü yüksekliği kadar yukarıdan boşluk bırakır
    <section id="features" className="py-20 bg-white w-full scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
            Özellikler
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Freelance CRM Size Neler Sunar?
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            İşinizi büyütmek için ihtiyacınız olan her şey, gereksiz karmaşadan
            uzak.
          </p>
        </div>

        {/* MOBİL AYARI BURADA YAPILDI:
            grid-cols-1    -> Mobilde tek sütun
            sm:grid-cols-2 -> Tablette çift sütun
            lg:grid-cols-4 -> Bilgisayarda dört sütun
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureItems.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
