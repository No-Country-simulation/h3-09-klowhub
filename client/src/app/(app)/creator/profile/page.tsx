'use client'
import Button from '@/components/buttons/Button'
import CreatorProfileCard from './components/CreatorProfileCard'
import OptProfileCard from './components/OptProfileCard'

export default function ProfileCreator() {
	return (
		<div className="space-y-12">
			<p className="text-xl font-bold">Mi perfil</p>
			<div className="flex flex-col items-center gap-12 xl:flex-row xl:items-start ">
				<div className="w-[100%] xl:w-[75%]">
					<CreatorProfileCard />
				</div>
				<div className="w-[50%] xl:w-[30%]">
					<OptProfileCard />
				</div>
			</div>
			<div className="flex flex-col items-center justify-center space-y-8">
				<p className="text-[12px] font-medium leading-5 text-white/50">
					¿Tenés alguna pregunta? No dudes en escribirnos a klowhub@soporte.com
					o visitar nuestro centro de ayuda. ¡Estamos aquí para asistirte!
				</p>
				<div className="flex gap-4">
					<Button variant="tertiary">Centro de ayuda</Button>
					<Button variant="tertiary">Soporte</Button>
				</div>
			</div>
		</div>
	)
}
