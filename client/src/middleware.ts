export { default } from 'next-auth/middleware'

export const config = {
	matcher: [
		'/',
		'/app-store/:path*',
		'/consultancy/:path*',
		'/learn/:path*',
		'/projects/:path*',
		'/create/:path*',
		// Excluimos `/auth/login` y `/auth/register` para permitir acceso público a estas rutas
		'/((?!auth/login|auth/register|components|_next/static|_public/img|_next/image|favicon.ico).*)',
	],
}
