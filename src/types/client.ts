// src/types/client.ts

// Supabase'den gelen Client (Müşteri) objesinin yapısı.
// Bu dosya, verinin neye benzediğini tüm projeye bildirir.

export interface Client {
    id: number;
    created_at: string;
    name: string;
    email: string | null; // Nullable olduğu için | null ekledik
    phone: string | null;
    status: 'active' | 'passive' | 'pending'; // Durumlar sadece bu değerler olabilir
}