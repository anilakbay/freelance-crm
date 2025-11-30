export default function Loading() {
  return (
    <div className="space-y-6 pb-20 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-48"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-24"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-40"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-6 bg-gray-200 rounded w-36 mb-4"></div>
            <div className="space-y-3">
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-full"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="h-3 bg-gray-200 rounded w-28 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
