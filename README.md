## Freelance CRM

Freelance CRM, bağımsız çalışanların müşteri ve proje akışlarını tek ekranda toplamak için geliştirdiğim eğitim amaçlı bir yönetim panelidir. Junior bir geliştirici olarak modern Next.js App Router ve Supabase mimarisini öğrenirken uygulamalı şekilde pekiştirmeyi hedefledim.

## Öne Çıkanlar

- Yetkili kullanıcı girişi ve oturum yönetimi
- Müşteri ekleme, listeleme ve silme
- Proje oluşturma, durum takibi ve bütçe yönetimi
- Supabase üzerinde ilişkisel müşteri–proje modeli
- Tamamı TypeScript ile tip güvenli kod tabanı

## Teknolojiler

- Next.js 16 App Router
- TypeScript ve Server Actions
- Supabase (PostgreSQL + Auth)
- Tailwind CSS
- pnpm

## Görseller

![Ana Sayfa](./public/img/anasayfa.png)
![Admin Yönetim Paneli](./public/img/yonetim_paneli.png)
![Müşteri Listesi](./public/img/musteriler.png)
![Yeni Müşteri Kaydı](./public/img/musteri_kayit.png)
![Projeler](./public/img/projeler.png)
![Görevler](./public/img/gorevler.png)
![Finans](./public/img/finans.png)
![Ayarlar](./public/img/ayarlar.png)

## Kurulum

```bash
git clone https://github.com/KULLANICI_ADINIZ/freelance-crm.git
cd freelance-crm
pnpm install
```

### Ortam Değişkenleri

1. `env.example` dosyasını kopyalayıp `.env.local` olarak kaydedin.
2. Supabase projenizdeki `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` değerlerini girin.
3. Yalnızca yönetim senaryolarında ihtiyaç varsa `SUPABASE_SERVICE_ROLE_KEY` ekleyin.

### Geliştirme

```bash
pnpm dev
```

Varsayılan olarak `http://localhost:4000` adresinde yayınlanır.

## Proje Yapısı

- `src/app`: Rotalar, sayfa bileşenleri, layout ve stil dosyaları
- `src/actions`: Server Action fonksiyonları ve veri iş kuralları
- `src/components`: Form ve paylaşılmış arayüz bileşenleri
- `src/lib`: Supabase istemcileri ve yardımcılar
- `src/types`: Supabase veritabanı tipleri ve arayüzler
