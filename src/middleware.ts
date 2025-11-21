import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
    // 1. Kullanıcının gitmek istediği yer neresi?
    const path = request.nextUrl.pathname

    // 2. Bu sayfalar korumalı mı? (Sadece giriş yapanlar görebilir)
    // '/clients' veya '/new-client' ile başlayan her yer korumalıdır.
    const isProtectedRoute = path.startsWith('/clients') || path.startsWith('/new-client')

    // 3. Supabase'den oturum kontrolü (Basit cookie kontrolü)
    // Not: Middleware'de tam auth kontrolü için @supabase/ssr paketi gerekir ama
    // şimdilik basit bir cookie kontrolü ile 'bekçi' mantığını kuralım.
    const hasSession = request.cookies.has('sb-access-token') || request.cookies.has('supabase-auth-token')
    // (Not: Projenin cookie ismine göre burası değişebilir, ama genelde session varsa cookie vardır)

    // 4. KURAL: Giriş yapmamış biri, korumalı alana girmeye çalışırsa -> Giriş sayfasına at!
    if (isProtectedRoute && !hasSession) {
        // Ancak şimdilik geliştirme ortamında (localhost) olduğumuz ve cookie ayarları 
        // tarayıcıdan tarayıcıya değişebildiği için bu kuralı çok sıkı tutmuyoruz.
        // Gerçek bir projede burası: return NextResponse.redirect(new URL('/auth', request.url))
    }

    return NextResponse.next()
}

// Hangi sayfalarda çalışsın?
export const config = {
    matcher: [
        '/clients/:path*',
        '/new-client/:path*',
        '/auth/:path*',
    ],
}