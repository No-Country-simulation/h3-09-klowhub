import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname

	const publicPaths = [
		'/auth/login',
		'/auth/register',
		'/favicon.ico',
		'/_next/static',
		'/public'
	]

	// Verificar si la ruta actual es pública
	const isPublicPath = publicPaths.some(
		publicPath => path.startsWith(publicPath)
	)

	const token = request.cookies.get('next-auth.session-token')

	if (isPublicPath || token) {
		return NextResponse.next()
	}

	// Redirigir a login si no hay token y no es una ruta pública
	return NextResponse.redirect(new URL('/auth/login', request.url))
}

export const config = {
	matcher: [
		'/',
		'/app-store/:path*',
		'/consultancy/:path*',
		'/learn/:path*',
		'/projects/:path*',
		'/create/:path*',
		'/auth/:path*'
	]
}
