'use client'
import { useSession } from "next-auth/react"
import CreatorProfileCard from "./components/CreatorProfileCard"

export default function ProfileCreator() {

	return (
		<div className="space-y-12">
			<p className="text-xl font-bold">Mi perfil</p>
			<CreatorProfileCard />
		</div>
	)
}
