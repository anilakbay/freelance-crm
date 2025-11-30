# TaskPilot CRM

Modern freelance CRM sistemi. Next.js 16, React 19, TypeScript ve Supabase ile geliştirilmiştir.

## Özellikler

- 📊 **Dashboard** - Gelir grafikleri ve istatistikler
- 👥 **Müşteri Yönetimi** - Şirket bilgileri ve iletişim
- 📁 **Proje Takibi** - Durum ve bütçe yönetimi
- 💰 **Finans** - Fatura kesme ve takip
- ✅ **Görevler** - Yapılacaklar listesi

## Kurulum

```bash
# Proje kurulumu
git clone <repo-url>
cd freelance-crm
pnpm install

# Environment variables
cp .env.example .env.local
# .env.local dosyasını Supabase bilgileriyle doldurun

# Geliştirme
pnpm dev
```

## Supabase Kurulumu

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni proje oluşturun
3. SQL Editor'de aşağıdaki kodu çalıştırın:

```sql
-- Tabloları oluştur
CREATE TABLE clients (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id BIGINT REFERENCES clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  price NUMERIC(10, 2),
  deadline DATE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tasks (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  priority TEXT DEFAULT 'medium',
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE invoices (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id BIGINT REFERENCES clients(id) ON DELETE CASCADE,
  invoice_date DATE NOT NULL,
  due_date DATE NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS aktif et
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Politikalar
CREATE POLICY "own_data" ON clients FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "own_data" ON projects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "own_data" ON tasks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "own_data" ON invoices FOR ALL USING (auth.uid() = user_id);
```

4. Settings > API'den URL ve Key'i alıp `.env.local`'e ekleyin

## Teknolojiler

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase

## Lisans

MIT
