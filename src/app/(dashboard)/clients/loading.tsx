export default function Loading() {
  return (
    <div className="space-y-6 pb-20 animate-pulse">
      {/* --- ÜST BAŞLIK İSKELETİ --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          {/* Başlık */}
          <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
          {/* Alt açıklama */}
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
        {/* Buton */}
        <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
      </div>

      {/* --- 1. MASAÜSTÜ İSKELETİ (TABLO GÖRÜNÜMÜ) --- */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="p-4 border-b border-gray-100 flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-3 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* --- 2. MOBİL İSKELETİ (KART GÖRÜNÜMÜ) --- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div className="space-y-2">
                  <div className="h-4 w-40 bg-gray-200 rounded"></div>
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
