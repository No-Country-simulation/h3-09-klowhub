export { default } from 'next-auth/middleware'

export const config = {
	matcher: [
		'/', // Protege la ruta base
		'/app-store/:path*', // Protege app-store y sus subrutas
		'/consultancy/:path*', // Protege consultancy y sus subrutas
		'/learn/:path*', // Protege learn y sus subrutas
		'/projects/:path*', // Protege projects y sus subrutas
		// Excluimos `/auth/login` y `/auth/register` para permitir acceso público a estas rutas
		'/((?!auth/login|auth/register|components|_next/static|_public/img|_next/image|favicon.ico).*)'
	]
}
