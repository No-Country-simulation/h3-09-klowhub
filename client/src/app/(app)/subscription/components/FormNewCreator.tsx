'use client'
import Button from '@/components/buttons/Button'
import MyListbox from '@/components/inputs/MyListbox'
import TextArea from '@/components/inputs/TextArea'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
interface NewCreator {
	sellerType: string
	description: string
	website: string
	favoritePayment: string
}
export default function FormNewCreator({ nextStep }: { nextStep: () => void }) {
	const { register, handleSubmit, control } = useForm<NewCreator>({
		defaultValues: {
			sellerType: '',
			favoritePayment: ''
		}
	})
	const onSubmit: SubmitHandler<NewCreator> = (data) => {
		nextStep()
		console.log(data)
	}
	return (
		<article className="relative min-h-full w-full space-y-9 rounded-lg bg-card p-5">
			<h1 className="font-bold">Completa tu perfil de vendedor</h1>
			<p>
				Estamos a solo un paso de completar tu perfil de vendedor. Proporciona
				algunos detalles adicionales para poder validar tu identidad y ofrecerte
				la mejor experiencia como creador en nuestra plataforma.
			</p>
			<div className="grid grid-cols-2 gap-16">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
					<div className="space-y-2">
						<b className="font-bold">
							Selecciona el tipo de vendedor que eres.
						</b>
						<Controller
							control={control}
							name="sellerType"
							defaultValue=""
							render={({ field }) => (
								<MyListbox
									options={[
										{
											value: 'Creador de contenido educativo',
											label: 'Creador de contenido educativo'
										},
										{
											value: 'Desarrollador de apps',
											label: 'Desarrollador de apps'
										}
									]}
									// value={getValues('sellerType')}
									// onChange={(value) => setValue('sellerType', value as string)}

									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>
					</div>
					<div className="space-y-2">
						<b>Escribe una breve descripción de ti o de tu empresa.</b>
						<p>
							Esta será la información que los compradores verán cuando visiten
							tu perfil. Te recomendamos incluir tus áreas de experiencia y los
							tipos de soluciones que ofreces.
						</p>
						<TextArea label="" className="my-2" {...register('description')} />
					</div>
					<div className="space-y-2">
						<b>Añade un enlace a tu portafolio o sitio web {'(Opcional)'}</b>
						<p>
							Si tienes un portafolio en línea, este es el lugar perfecto para
							destacarlo y mostrar tu trabajo a posibles compradores.
						</p>
						<div className="flex w-full max-w-xs overflow-hidden rounded-lg">
							<p className="flex items-center rounded-l-lg border border-r-0 border-primary-b-200 px-3 text-primary-b-200">
								Enlace
							</p>
							<input
								{...register('website')}
								type="url"
								className="w-full border-0 border-none bg-white p-2 text-black outline-0 focus:ring-0"
							/>
						</div>
					</div>
					<div className="space-y-2">
						<b className="font-bold">
							Selecciona tu método de cobro preferido.
						</b>
						<p>Elige cómo te gustaría recibir los pagos de tus ventas.</p>
						<div className="max-w-xs">
							<Controller
								control={control}
								name="favoritePayment"
								defaultValue=""
								render={({ field }) => (
									<MyListbox
										options={[
											{
												value: 'Criptomonedas',
												label: 'Criptomonedas'
											},
											{
												value: 'Stripe',
												label: 'Stripe'
											},
											{
												value: 'Paypal',
												label: 'Paypal'
											}
										]}
										value={field.value}
										onChange={field.onChange}
									/>
								)}
							/>
						</div>
					</div>
					<Button className="absolute -bottom-16 right-0" type="submit">
						Continuar
					</Button>
				</form>
				<div className="space-y-2">
					{/* <b>Verifica tu Identidad</b>
						<p>
							Por razones de seguridad, necesitamos validar tu identidad antes
							de activar tu cuenta de vendedor. Asegúrate de que la imagen sea
							clara y legible.
						</p>
						<p className="text-primary-b-200">
							{
								'(Sube una imagen de tu documento de identidad (DNI, pasaporte o licencia de conducir)'
							}
						</p> */}
				</div>
			</div>
		</article>
	)
}
