// --------------------------------------------------------
// BİLEŞEN: Fatura Ekleme Formu (MOBİL UYUMLU)
// DOSYA: src/components/forms/InvoiceForm.tsx
// GÖREV: Fatura kaydı oluşturur. Mobilde tek, masaüstünde çift sütun olur.
// --------------------------------------------------------

"use client";

import { useState, useTransition } from "react";
import { saveInvoice } from "@/actions/invoice";

interface InvoiceFormProps {
  clients: { id: number; name: string }[] | null;
}

export default function InvoiceForm({ clients }: InvoiceFormProps) {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback({ type: "", text: "" });

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await saveInvoice(formData);

      if (result.success) {
        setFeedback({ type: "success", text: result.message });
        (event.target as HTMLFormElement).reset();
      } else {
        setFeedback({ type: "error", text: result.message });
      }
    });
  };

  const inputClass =
    "w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-600 transition shadow-sm";

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

      <form onSubmit={handleSubmit} className="space-y-5" method="post">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-3">
          Yeni Fatura Kes
        </h2>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">
            Müşteri Seçin
          </label>
          <select
            name="client_id"
            required
            className={inputClass}
            defaultValue=""
          >
            <option value="" disabled>
              -- Müşteri Seçiniz --
            </option>
            {clients?.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Fatura Kesim Tarihi
            </label>
            <input
              name="invoice_date"
              type="date"
              required
              className={inputClass}
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Son Ödeme Tarihi
            </label>
            <input
              name="due_date"
              type="date"
              required
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Tutar (₺)
            </label>
            <input
              name="amount"
              type="number"
              step="0.01"
              required
              className={inputClass}
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Durum
            </label>
            <select name="status" className={inputClass} defaultValue="pending">
              <option value="pending">Bekliyor</option>
              <option value="paid">Ödendi</option>
              <option value="overdue">Vadesi Geçti</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">
            Açıklama (Opsiyonel)
          </label>
          <textarea
            name="description"
            rows={4}
            className={inputClass}
            placeholder="Fatura ile ilgili notlar veya detaylar..."
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition disabled:opacity-50 shadow-md mt-2"
        >
          {isPending ? "Kaydediliyor..." : "Faturayı Kaydet"}
        </button>
      </form>
    </div>
  );
}
