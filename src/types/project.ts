// src/types/project.ts

// Bu dosya, projects tablosundan çekilecek verinin tipini tanımlar.
// Bu sayede kodumuz hem otomatik tamamlama (IntelliSense) kullanır hem de tip hatalarını yakalar.
export interface Project {
  // projects tablosundan gelen veriler:
  id: number;
  created_at: string;
  client_id: number; // Projenin ait olduğu müşterinin ID'si
  title: string;
  price: number | null; // Nullable olduğu için number | null
  deadline: string | null;
  status: "active" | "completed" | "cancelled" | "pending"; // Tüm olası durumlar

  // İlişkili Müşteri Verisi (JOIN ile çekilen veri)
  // projects/page.tsx dosyasında çekeceğimiz müşteri bilgileri
  clients?: {
    name: string;
    email: string;
  };
}
