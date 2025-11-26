// --------------------------------------------------------
// BİLEŞEN: Görev Ekleme Formu
// DOSYA: src/components/forms/TaskForm.tsx
// GÖREV: Yeni görev kaydı oluşturur.
// --------------------------------------------------------

"use client";

import { useState, useTransition } from "react";
import { saveTask } from "@/actions/task";

// Formun beklediği veri tipi (Sadece proje id ve başlığı yeterli)
interface TaskFormProps {
  projects: { id: number; title: string }[];
}

export default function TaskForm({ projects }: TaskFormProps) {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback({ type: "", text: "" });

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await saveTask(formData);

      if (result.success) {
        setFeedback({ type: "success", text: result.message });
        (event.target as HTMLFormElement).reset(); // Formu temizle
      } else {
        setFeedback({ type: "error", text: result.message });
      }
    });
  };

  const inputClass =
    "w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition shadow-sm";

  return (
    <div className="w-full">
      {feedback.text && (
        <div
          className={`p-4 mb-6 rounded-lg text-sm font-semibold border ${
            feedback.type === "success"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {feedback.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Görev Başlığı */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">
            Görev Başlığı
          </label>
          <input
            name="title"
            type="text"
            required
            className={inputClass}
            placeholder="Örn: Logo Revizyonu Yapılacak"
          />
        </div>

        {/* Proje Seçimi (Hangi işe ait?) */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">
            Bağlı Olduğu Proje
          </label>
          <select
            name="project_id"
            required
            className={inputClass}
            defaultValue=""
          >
            <option value="" disabled>
              Proje Seçiniz...
            </option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        {/* Öncelik ve Tarih */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Öncelik
            </label>
            <select
              name="priority"
              className={inputClass}
              defaultValue="medium"
            >
              <option value="high">Yüksek (Acil)</option>
              <option value="medium">Orta</option>
              <option value="low">Düşük</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Son Tarih
            </label>
            <input name="due_date" type="date" className={inputClass} />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 shadow-md mt-2"
        >
          {isPending ? "Kaydediliyor..." : "Görevi Ekle"}
        </button>
      </form>
    </div>
  );
}
