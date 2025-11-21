const featureItems = [
  {
    title: "Müşteri Takibi",
    description: "Tüm müşterilerinizin iletişim bilgilerini, projelerini ve notlarını tek bir yerde toplayın."
  },
  {
    title: "Durum Yönetimi",
    description: "Hangi projenin 'aktif', hangisinin 'beklemede' olduğunu tek bakışta görerek zamanınızı verimli kullanın."
  },
  {
    title: "Güvenli Altyapı",
    description: "Verilerinizi Next.js 16 ve Supabase'in güvenli mimarisi ile koruyun."
  },
  {
    title: "Kolay Proje Yönetimi",
    description: "Müşterilerinizle ilişkilendirilmiş yeni projeleri hızla oluşturun ve tüm süreçleri tek ekranda takip edin."
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-white w-full">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Freelance CRM Size Neler Sunar?
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {featureItems.map((feature, index) => (
            <div
              key={index}
              className="p-6 border border-gray-100 rounded-xl shadow-lg bg-gray-50 transition-all hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}