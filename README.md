# TaskPilot CRM

Modern ve kullanıcı dostu bir freelance CRM sistemi. Next.js 16, React 19, TypeScript ve Supabase ile geliştirilmiştir.

## 🚀 Özellikler

### 📊 Dashboard
- **Gelir Grafikleri**: Aylık gelir takibi ve trend analizi
- **Durum Dağılımı**: Proje durumlarının görsel grafiklerle sunumu
- **İstatistikler**: Toplam gelir, aktif projeler, müşteriler ve görevler
- **Son Projeler**: Hızlı erişim için son eklenen projeler

### 👥 Müşteri Yönetimi
- Müşteri ekleme, görüntüleme ve silme
- Şirket bilgileri ve iletişim detayları
- Durum takibi (Aktif/Beklemede/Pasif)
- Responsive tablo (masaüstü) ve kart (mobil) görünümü

### 📁 Proje Yönetimi
- Görsel proje kartları ile modern arayüz
- Proje durumu yönetimi (Aktif/Tamamlandı/Beklemede/İptal)
- Müşteri ilişkilendirme
- Bütçe ve termin takibi
- Düzenleme ve silme özellikleri

### 💰 Finans Yönetimi
- Fatura kesme ve detaylı takip
- **Yeni**: Fatura detay sayfaları
- Vade ve durum yönetimi (Bekliyor/Ödendi/Vadesi Geçti)
- Ödeme durumu kontrolü
- Gelir ve bekleyen tahsilat özeti
- Fatura açıklamaları

### ✅ Görev Yönetimi
- İnteraktif yapılacaklar listesi
- Proje bazlı görev organizasyonu
- Öncelik ve durum etiketleme
- Checkbox ile hızlı durum güncelleme

## 📋 Teknolojiler

| Kategori | Teknoloji | Versiyon |
|----------|-----------|----------|
| Framework | Next.js | 16.0.3 |
| UI Library | React | 19.2.0 |
| Dil | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Database | Supabase | PostgreSQL |
| Charts | Recharts | 3.5.0 |
| State Management | React Hooks | - |
| Authentication | Supabase Auth | - |

## 🛠️ Kurulum

### Gereksinimler

- Node.js 18+ 
- pnpm (önerilen) veya npm/yarn
- Supabase hesabı

### Hızlı Başlangıç

1. **Projeyi klonlayın**
```bash
git clone https://github.com/yourusername/taskpilot-crm.git
cd taskpilot-crm
```

2. **Bağımlılıkları yükleyin**
```bash
pnpm install
```

3. **Environment variables oluşturun**

`.env.local` dosyası oluşturun:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Supabase Dashboard > Settings > API bölümünden bilgileri alabilirsiniz.

4. **Veritabanı tablolarını oluşturun**

Supabase SQL Editor'de aşağıdaki SQL'i çalıştırın:

```sql
-- Clients
CREATE TABLE clients (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id BIGINT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  price NUMERIC(10, 2),
  deadline DATE,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks
CREATE TABLE tasks (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  priority TEXT NOT NULL DEFAULT 'medium',
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoices
CREATE TABLE invoices (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id BIGINT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  invoice_date DATE NOT NULL,
  due_date DATE NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "users_own_data" ON clients FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users_own_data" ON projects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users_own_data" ON tasks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users_own_data" ON invoices FOR ALL USING (auth.uid() = user_id);
```

5. **Geliştirme sunucusunu başlatın**
```bash
pnpm dev
```

Tarayıcınızda [http://localhost:4000](http://localhost:4000) adresine gidin.

## 📁 Proje Yapısı

```
src/
├── actions/              # Server Actions (form işlemleri)
│   ├── auth.ts          # Authentication
│   ├── client.ts        # Müşteri CRUD
│   ├── invoice.ts       # Fatura CRUD
│   ├── project.ts       # Proje CRUD
│   └── task.ts          # Görev CRUD
├── app/                  # Next.js App Router
│   ├── (dashboard)/     # Dashboard layout grubu
│   │   ├── clients/     # Müşteriler
│   │   ├── dashboard/   # Ana panel
│   │   ├── finance/     # Finans ve faturalar
│   │   │   └── [id]/   # Fatura detay
│   │   ├── projects/    # Projeler
│   │   ├── settings/    # Ayarlar
│   │   └── tasks/       # Görevler
│   ├── (root)/          # Landing page
│   └── auth/            # Giriş/Kayıt
├── components/          # React bileşenleri
│   ├── charts/         # Recharts grafikleri
│   ├── dashboard/      # Dashboard özel bileşenler
│   ├── forms/          # Form bileşenleri
│   └── ui/             # Temel UI elemanları
├── lib/                # Utility fonksiyonlar
│   ├── supabase.ts    # Supabase client
│   └── utils.ts       # Yardımcı fonksiyonlar
└── types/              # TypeScript tipleri
    ├── client.ts
    ├── database.ts
    └── project.ts
```

## 🎨 Özellikler

### Modern UI/UX
- Tamamen responsive tasarım
- Smooth animasyonlar ve transitions
- Tailwind CSS ile özelleştirilebilir tema
- Dark mode hazır altyapı

### Güvenlik
- Supabase Row Level Security (RLS)
- Server-side authentication
- Protected routes
- Secure form submissions

### Performans
- Next.js 16 Server Components
- Optimized images (next/image)
- Code splitting
- Fast page loads

## 🚀 Production Deployment

### Vercel (Önerilen)

1. Projeyi GitHub'a push edin
2. [Vercel](https://vercel.com) hesabınıza girin
3. "New Project" > Repository seçin
4. Environment Variables ekleyin:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy butonuna tıklayın

### Manuel Build

```bash
pnpm build
pnpm start
```

## 🐛 Sorun Giderme

### Port zaten kullanımda
```bash
# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:4000 | xargs kill -9
```

### Supabase bağlantı hatası
- `.env.local` dosyasının doğru konumda olduğundan emin olun
- URL ve Key'lerin doğru olduğunu kontrol edin
- Development sunucusunu yeniden başlatın

### RLS Policy hataları
- SQL komutlarının tamamını çalıştırdığınızdan emin olun
- Supabase Dashboard'da politikaları kontrol edin

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 İletişim

Sorularınız için: [GitHub Issues](https://github.com/yourusername/taskpilot-crm/issues)

---

**TaskPilot CRM** - Freelancerlar için modern iş yönetim platformu 🚀
