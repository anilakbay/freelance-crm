// --------------------------------------------------------
// BİLEŞEN: Proje Ekleme/Düzenleme Formu (MOBİL UYUMLU)
// DOSYA: src/components/forms/ProjectForm.tsx
// --------------------------------------------------------

"use client";

import { useState, useTransition } from "react";
import { saveProject } from "@/actions/project";
import { Project } from "@/types/project";

interface ProjectFormProps {
  clients: { id: number; name: string }[];
  initialData?: Project & { deadline: string | null };
  isEditing?: boolean;
}

export default function ProjectForm({
  clients,
  initialData,
  isEditing = false,
}: ProjectFormProps) {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback({ type: "", text: "" });

    const formData = new FormData(event.currentTarget);

    if (isEditing && initialData?.id) {
      formData.append("projectId", initialData.id.toString());
    }

    startTransition(async () => {
      const result = await saveProject(formData);

      if (result.success) {
        setFeedback({ type: "success", text: result.message });
        if (!isEditing) {
          (event.target as HTMLFormElement).reset();
        }
      } else {
        setFeedback({ type: "error", text: result.message });
      }
    });
  };

  const inputClass =
    "w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition shadow-sm font-medium";

  return (
    <div className="w-full">
      <form className="space-y-5" onSubmit={handleSubmit} method="post">
        {/* Başlık */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing
              ? `Proje Düzenle: ${initialData?.title}`
              : "Yeni Proje Kaydı"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isEditing
              ? "Mevcut proje kayıtlarını güncelleyebilirsiniz."
              : "Yeni bir proje oluşturmak için gerekli alanları doldurun."}
          </p>
        </div>

        {/* Geri Bildirim */}
        {feedback.text && (
          <div
            className={`p-4 rounded-lg text-sm font-semibold border ${
              feedback.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {feedback.text}
          </div>
        )}

        {/* Proje Başlığı */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-bold text-gray-700 mb-1.5"
          >
            Proje Başlığı
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={initialData?.title || ""}
            className={inputClass}
            placeholder="Örn: Mobil Uygulama UI/UX"
          />
        </div>

        {/* Müşteri Seçimi */}
        <div>
          <label
            htmlFor="client_id"
            className="block text-sm font-bold text-gray-700 mb-1.5"
          >
            Müşteri Seçimi
          </label>
          <select
            id="client_id"
            name="client_id"
            required
            defaultValue={initialData?.client_id || ""}
            className={inputClass}
          >
            <option value="">-- Müşteri Seçiniz --</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        {/* Bütçe ve Tarih - MOBİL AYARI: grid-cols-1 sm:grid-cols-2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-bold text-gray-700 mb-1.5"
            >
              Bütçe (₺)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              defaultValue={initialData?.price || ""}
              className={inputClass}
              placeholder="Örn: 25000"
            />
          </div>
          <div>
            <label
              htmlFor="deadline"
              className="block text-sm font-bold text-gray-700 mb-1.5"
            >
              Termin Tarihi
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              defaultValue={initialData?.deadline || ""}
              className={inputClass}
            />
          </div>
        </div>

        {/* Proje Durumu */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-bold text-gray-700 mb-1.5"
          >
            Proje Durumu
          </label>
          <select
            id="status"
            name="status"
            defaultValue={initialData?.status || "active"}
            className={inputClass}
          >
            <option value="active">Aktif</option>
            <option value="completed">Tamamlandı</option>
            <option value="cancelled">İptal Edildi</option>
            <option value="pending">Beklemede</option>
          </select>
        </div>

        {/* Buton */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-3.5 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700" // Renk maviye döndü (Yeşil fatura içindi)
          }`}
        >
          {isPending
            ? "İşleniyor..."
            : isEditing
            ? "Değişiklikleri Kaydet"
            : "Projeyi Oluştur"}
        </button>
      </form>
    </div>
  );
}
