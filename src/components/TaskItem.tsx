// --------------------------------------------------------
// BİLEŞEN: Görev Satırı
// DOSYA: src/components/TaskItem.tsx
// --------------------------------------------------------

"use client";

import { useTransition } from "react";
import { toggleTaskStatus } from "@/actions/task";

interface TaskItemProps {
  task: {
    id: number;
    title: string;
    status: string;
    due_date: string | null;
    priority: string;
    projects: { title: string } | null;
  };
}

export default function TaskItem({ task }: TaskItemProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleTaskStatus(task.id, task.status);
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-300 transition-colors group">
      <div className="flex items-start gap-4">
        <button
          onClick={handleToggle}
          disabled={isPending}
          // DÜZELTME: 'flex-shrink-0' yerine 'shrink-0' kullanıldı.
          className={`mt-1 w-6 h-6 rounded-full border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
            task.status === "done"
              ? "bg-green-500 border-green-500 hover:bg-green-600"
              : "border-gray-300 bg-white hover:border-blue-500"
          } ${isPending ? "opacity-50 cursor-wait" : ""}`}
        >
          {task.status === "done" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        <div>
          <h3
            className={`font-semibold text-gray-900 transition-all ${
              task.status === "done" ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">
              {task.projects?.title || "Projesiz"}
            </span>
            {task.due_date && (
              <>
                <span>•</span>
                <span>
                  {new Date(task.due_date).toLocaleDateString("tr-TR")}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 self-start sm:self-center ml-10 sm:ml-0">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
            task.priority === "high"
              ? "bg-red-50 text-red-700 border border-red-100"
              : task.priority === "medium"
              ? "bg-orange-50 text-orange-700 border border-orange-100"
              : "bg-blue-50 text-blue-700 border border-blue-100"
          }`}
        >
          {task.priority === "high" && "Yüksek"}
          {task.priority === "medium" && "Orta"}
          {task.priority === "low" && "Düşük"}
        </span>
      </div>
    </div>
  );
}
