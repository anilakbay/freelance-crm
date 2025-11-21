Freelance CRM

Bu proje, freelancer'ların ve bağımsız çalışanların müşteri ilişkilerini daha düzenli yönetebilmesi için geliştirdiğim modern bir CRM (Müşteri İlişkileri Yönetimi) uygulamasıdır.

Excel tablolarında kaybolmak yerine, tüm müşteri verilerini güvenli, hızlı ve her yerden erişilebilir tek bir panelde toplamayı amaçladım.

🎯 Projenin Amacı

Sadece "çalışan" bir uygulama yapmak değil; aynı zamanda modern web teknolojilerinin (Next.js App Router, Server Actions) gücünü kullanarak ölçeklenebilir, güvenli ve hızlı bir mimari kurmaktı.

Bu projede şu an şunları yapabiliyorsunuz:

Güvenli Giriş: Sadece yetkili kullanıcı (siz) panele erişebilir.

Müşteri Yönetimi: Yeni müşteri ekleyebilir, listeyi görüntüleyebilir ve artık çalışmadığınız kişileri silebilirsiniz.

Anlık Takip: Veriler anlık olarak güncellenir, sayfa yenilemeye gerek kalmaz.

🛠️ Kullandığım Teknolojiler

Projeyi geliştirirken sektörün en güncel ve kabul gören araçlarını tercih ettim:

Next.js 16 (App Router): En güncel React framework'ü. Sayfa geçişleri ve veri yönetimi için kullandım.

TypeScript: Kodun hatasız ve sürdürülebilir olması için tip güvenliği sağladım.

Supabase (PostgreSQL): Veritabanı ve kimlik doğrulama (Auth) işlemleri için kullandım.

Tailwind CSS: Hızlı ve modern bir arayüz tasarımı için.

Server Actions: API yazmakla uğraşmadan, frontend üzerinden doğrudan ve güvenli veritabanı işlemleri yapmak için.

🚀 Kurulum

Bu projeyi kendi bilgisayarınızda çalıştırmak isterseniz şu adımları izleyebilirsiniz:

Projeyi İndirin:

git clone [https://github.com/KULLANICI_ADINIZ/freelance-crm.git](https://github.com/KULLANICI_ADINIZ/freelance-crm.git)
cd freelance-crm

Paketleri Yükleyin:

pnpm install

Supabase Ayarları:
Ana dizinde .env.local adında bir dosya oluşturun ve kendi Supabase projenizin anahtarlarını girin:

NEXT_PUBLIC_SUPABASE_URL=[https://sizin-projeniz.supabase.co](https://sizin-projeniz.supabase.co)
NEXT_PUBLIC_SUPABASE_ANON_KEY=sizin-anon-key-kodunuz

Çalıştırın:

pnpm dev

Tarayıcınızda http://localhost:4000 adresine giderek uygulamayı görebilirsiniz.

📂 Klasör Yapısı Hakkında

Kodları incelerken kaybolmamanız için yapıyı şöyle kurguladım:

src/app: Sayfalarımız burada. (Örn: /clients sayfası app/clients/page.tsx içindedir).

src/components: Tekrar kullandığım parçalar (Formlar, Butonlar) burada.

src/actions: Veritabanı işlemlerini ve sunucu taraflı iş mantığını (Business Logic) yöneten fonksiyonlar burada.

src/lib: Supabase bağlantı ayarları gibi yardımcı dosyalar burada.
