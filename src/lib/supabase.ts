import { createClient } from '@supabase/supabase-js';

// 1. .env.local dosyasından anahtarları çekiyoruz
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 2. Eğer anahtarlar yoksa hata ver (Böylece hatanın sebebini hemen anlarsın)
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase API anahtarları eksik! Lütfen .env.local dosyasını kontrol et.');
}

// 3. Supabase istemcisini oluştur ve dışarıya aç (export)
export const supabase = createClient(supabaseUrl, supabaseKey);