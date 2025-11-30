import Link from "next/link";
import Features from "@/components/Features";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20 pb-32 px-6 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Freelancerlar için modern iş yönetimi
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              İşlerinizi
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Profesyonelce Yönetin
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-10 max-w-3xl mx-auto">
              Müşterilerinizi, projelerinizi ve ödemelerinizi tek platformda takip edin. 
              Excel tablolarından kurtulun, işinize odaklanın.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link
                href="/auth"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Ücretsiz Başlayın
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 text-lg font-bold rounded-2xl hover:border-gray-300 hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-900">0₺</div>
                <div className="text-sm text-gray-600">Ücretsiz</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">∞</div>
                <div className="text-sm text-gray-600">Sınırsız Proje</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">%100</div>
                <div className="text-sm text-gray-600">Güvenli</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <Features />

      {/* Screenshots Section */}
      <section className="w-full py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Güçlü Özellikler
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              İşinizi yönetmek için ihtiyacınız olan her şey bir arada
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Image
                src="/img/musteriler.png"
                alt="Müşteri Yönetimi"
                width={800}
                height={600}
                className="w-full h-auto"
              />
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Müşteri Yönetimi</h3>
                <p className="text-gray-600">Tüm müşterilerinizi tek ekranda görün ve yönetin</p>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Image
                src="/img/projeler.png"
                alt="Proje Takibi"
                width={800}
                height={600}
                className="w-full h-auto"
              />
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Proje Takibi</h3>
                <p className="text-gray-600">Projelerinizi görsel kartlarla kolayca yönetin</p>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Image
                src="/img/finans.png"
                alt="Finans Yönetimi"
                width={800}
                height={600}
                className="w-full h-auto"
              />
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Finans Yönetimi</h3>
                <p className="text-gray-600">Faturalarınızı kesin ve ödemelerinizi takip edin</p>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Image
                src="/img/gorevler.png"
                alt="Görev Yönetimi"
                width={800}
                height={600}
                className="w-full h-auto"
              />
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Görev Yönetimi</h3>
                <p className="text-gray-600">Yapılacaklar listenizi düzenleyin ve takip edin</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 py-24 px-6 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Bugün Başlayın
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Ücretsiz hesap oluşturun ve işlerinizi profesyonelce yönetmeye hemen başlayın
          </p>
          <Link
            href="/auth"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
          >
            Ücretsiz Kaydol
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-blue-100 text-sm mt-6">Kredi kartı gerektirmez • 2 dakikada kurulum</p>
        </div>
      </section>
    </main>
  );
}
