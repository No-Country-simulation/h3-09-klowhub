'use client'
import Button from '@/components/buttons/Button'
import CreatorProfileCard from './components/CreatorProfileCard'
import OptProfileCard from './components/OptProfileCard'

export default function ProfileCreator() {
	return (
		<div className="space-y-12">
			<p className="text-xl font-bold">Mi perfil</p>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-6">
				<div className="col-span-4">
					<CreatorProfileCard />
				</div>
				<div className="col-span-2">
					<OptProfileCard />
				</div>
			</div>
			<div className="flex flex-col items-center justify-center space-y-8">
				<p className="text-[12px] font-medium leading-5 text-white/50">
					¿Tenés alguna pregunta? No dudes en escribirnos a klowhub@soporte.com
					o visitar nuestro centro de ayuda. ¡Estamos aquí para asistirte!
				</p>
				<div className="flex">
					<Button variant="tertiary">Centro de ayuda</Button>
					<Button variant="tertiary">Soporte</Button>
				</div>
			</div>
		</div>
	)
}
