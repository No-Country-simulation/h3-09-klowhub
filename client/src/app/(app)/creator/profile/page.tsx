'use client'
import { useSession } from "next-auth/react"
import CreatorProfileCard from "./components/CreatorProfileCard"
import OptProfileCard from "./components/OptProfileCard"
import Button from "@/components/buttons/Button"

export default function ProfileCreator() {

	return (
		<div className="space-y-12">
			<p className="text-xl font-bold">Mi perfil</p>
			<div className="grid grid-cols-1 md:grid-cols-6 gap-8">
				<div className="col-span-4">
					<CreatorProfileCard />
				</div>
				<div className="col-span-2">
					<OptProfileCard />
				</div>
			</div>
			<div className="flex flex-col items-center justify-center space-y-8">
				<p className="text-[12px] leading-5 font-medium text-white/50">¿Tenés alguna pregunta? No dudes en escribirnos a klowhub@soporte.com o visitar nuestro centro de ayuda. ¡Estamos aquí para asistirte!</p>
				<div className="flex ">
					<Button variant="tertiary" >Centro de ayuda</Button>
					<Button variant="tertiary" >Soporte</Button>
				</div>
			</div>
		</div>
	)
}
