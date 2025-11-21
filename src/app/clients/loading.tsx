export default function Loading() {
    return (
        <main className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-5xl mx-auto">

                {/* Üst Bar İskeleti */}
                <div className="flex justify-between items-center mb-8 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-pulse">
                    <div className="h-8 w-48 bg-gray-200 rounded"></div>
                    <div className="flex gap-3">
                        <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
                        <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>

                {/* Liste İskeleti (3 tane boş kutu) */}
                <div className="grid gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center animate-pulse">
                            <div>
                                <div className="h-6 w-40 bg-gray-200 rounded mb-2"></div>
                                <div className="flex gap-4">
                                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                            <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
}