'use client'
import Button from '@/components/buttons/Button'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'

interface IFormInput {
	name: string
	email: string
	password: string
	newsletter?: boolean
}
export default function Page() {
	const { data: session, status } = useSession()
	console.log({ session, status })

	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IFormInput>()

	const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
		try {
			const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/create`, {
				name: formData.name,
				email: formData.email,
				password: formData.password
			},
			{
				headers: {
					'Content-Type': 'application/json'
				},
			}
			)
			if (data?.error || data?.statusCode >= 400) {
				console.error('Error en registro: Verifica los datos ingresados.')
				return
			}

			router.push('/auth/login')
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error('Error al registrar usuario:', error.response?.data?.message || error.message)
			} else {
				console.error('Error inesperado:', error)
			}

		}
	}

	return (
		<div className="mx-auto flex h-full max-w-xs flex-col justify-around py-16">
			<h1 className="mx-auto flex pb-8 text-5xl font-semibold md:hidden">
				KlowHub
			</h1>
			<p className="">Explora, aprende, enseña y conecta.</p>
			<p className="mb-6">
				Crea tu cuenta en KlowHub y accede a un mundo de posibilidades.
			</p>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4 px-2"
			>
				<div className="pb-3">
					<input
						placeholder="Nombre Completo"
						id="name"
						type="text"
						{...register('name', { required: 'Nombre es obligatorio' })}
						className={`mt-1 block w-full border px-3 py-2 text-black ${errors.name ? 'border-red-500' : 'border-primary-a-200'} rounded-md border-primary-a-300 shadow-sm focus:border-primary-a-300 focus:outline-none focus:ring-primary-a-300`}
					/>
					{errors.name && (
						<span className="absolute text-red-500">{errors.name.message}</span>
					)}
				</div>

				<div className="pb-3">
					<input
						placeholder="Correo Electrónico"
						id="email"
						type="email"
						{...register('email', {
							required: 'Correo electrónico es obligatorio',
							pattern: {
								value: /^\S+@\S+$/i,
								message: 'Correo electrónico no es válido'
							}
						})}
						className={`mt-1 block w-full border px-3 py-2 text-black ${errors.email ? 'border-red-500' : 'border-primary-a-200'} rounded-md border-primary-a-300 shadow-sm focus:border-primary-a-300 focus:outline-none focus:ring-primary-a-300`}
					/>
					{errors.email && (
						<span className="absolute text-red-500">
							{errors.email.message}
						</span>
					)}
				</div>

				<div className="pb-3">
					<input
						placeholder="Contraseña"
						id="password"
						type="password"
						{...register('password', { required: 'Contraseña es obligatoria' })}
						className={`mt-1 block w-full border px-3 py-2 text-black ${errors.password ? 'border-red-500' : 'border-primary-a-200'} rounded-md border-primary-a-300 shadow-sm focus:border-primary-a-300 focus:outline-none focus:ring-primary-a-300`}
					/>
					{errors.password && (
						<span className="absolute text-red-500">
							{errors.password.message}
						</span>
					)}
				</div>
				<p className="my-8 text-center text-xs">
					Al registrarte, aceptas nuestras{' '}
					<Link className="text-primary-a-200" href={''}>
						Condiciones de uso
					</Link>{' '}
					y nuestra{' '}
					<Link className="text-primary-a-200" href={''}>
						Política de privacidad.
					</Link>
				</p>
				<Button className="mx-auto">Crear cuenta</Button>
			</form>

			<div className="mt-6 text-center">
				<p>O continuar con</p>
				<div className="mt-2 flex justify-center space-x-4">
					<span className="aspect-square cursor-pointer rounded-full border p-2" onClick={() => signIn('github')}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height={25}
							width={25}
							viewBox="0 0 496 512"
						>
							<path
								fill="#fff"
								d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
							/>
						</svg>
					</span>
					<span className="aspect-square cursor-pointer rounded-full border p-2" onClick={() => signIn('facebook')}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height={25}
							width={25}
							viewBox="0 0 512 512"
						>
							<path
								fill="#fff"
								d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
							/>
						</svg>
					</span>
					<span className="aspect-square cursor-pointer rounded-full border p-2" onClick={() => signIn('google')}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height={25}
							width={25}
							viewBox="0 0 488 512"
						>
							<path
								fill="#fff"
								d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
							/>
						</svg>
					</span>
				</div>
			</div>
			<div className="mt-6 flex items-center">
				<input
					id="newsletter"
					type="checkbox"
					{...register('newsletter')}
					className="h-4 w-4 rounded border-gray-300 text-primary-a-300 focus:ring-primary-a-300"
				/>
				<label htmlFor="newsletter" className="ml-2 block text-sm">
					Quiero recibir novedades y consejos de la plataforma
				</label>
			</div>
			<p className="mt-6 text-center">
				¿Ya tienes cuenta?{' '}
				<Link href="login" className="text-primary-a-200 hover:underline">
					Iniciar sesión
				</Link>
			</p>
		</div>
	)
}
