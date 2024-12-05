'use client'
import { App } from '@/models/app.model'
import { Modal } from 'flowbite-react'
import { Mail } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import RatingStars from '../RatingStars'
import Button from '../buttons/Button'
import TechnologyTag, { Technology } from '../buyerTags/TechnologyTag'
interface Props {
	setAppSelected: Dispatch<SetStateAction<App | null>>
	app: App
}
export default function AppModal({ setAppSelected, app }: Props) {
	const router = useRouter()
	const totalScore = app.reviews.reduce((acc, review) => acc + review.score, 0)
	const averageScore = Number((totalScore / app.reviews.length).toFixed(1))
	return (
		<Modal
			show={app ? true : false}
			onClose={() => setAppSelected(null)}
			theme={{
				content: {
					inner: 'bg-card rounded-lg sm:p-6'
				},
				header: {
					base: 'border-b-0 flex'
				}
			}}
		>
			<Modal.Header></Modal.Header>
			<Modal.Body>
				<div className="flex flex-col space-y-6">
					<b>{app.title}</b>
					<p className="text-sm">{app.shortDescription}</p>
					<div className="flex gap-2">
						{app.toolsAndPlatforms.map((technology, i: number) => (
							<TechnologyTag
								technology={technology.toLocaleLowerCase() as Technology}
								key={'technology-' + i}
							/>
						))}
					</div>
					<div className="flex gap-10">
						<RatingStars
							rating={averageScore}
							totalVotes={app.reviews.length}
						/>
					</div>
					<picture className="relative aspect-video w-full">
						<Image
							fill
							sizes="200px"
							src={app.image as string}
							alt="app image"
							className="rounded-lg"
						/>
					</picture>
					<div className="flex h-fit gap-2">
						<picture className="relative aspect-square h-fit w-28 overflow-hidden rounded-full">
							<Image src={'/img/user_avatar.png'} fill alt="user image" />
						</picture>
						<div>
							<p className="mb-2 text-sm font-semibold">Sebastián Ríos</p>
							<p className="text-sm">
								Experto en desarrollo de aplicaciones no-code con más de 5 años
								de experiencia en AppSheet y Power Apps, ayudando a empresas y
								emprendedores.
							</p>
						</div>
					</div>
					<div>
						<b>Acerca de esta app</b>
						<p className="text-sm">{app.detailedDescription}</p>
					</div>
					<Button
						className="sm:w-fit"
						variant="secondary"
						onClick={() => router.push(`appstore/${app.id}`)}
					>
						Ver detalles
					</Button>
					<div className="flex gap-3">
						<p>compartir</p>
						<Mail />
						<svg
							role="img"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							height={20}
							width={20}
						>
							<title>WhatsApp</title>
							<path
								fill="#25D366"
								d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
							/>
						</svg>

						<svg
							role="img"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							height={20}
							width={20}
						>
							<title>Messenger</title>
							<path
								fill="#00B2FF"
								d="M.001 11.639C.001 4.949 5.241 0 12.001 0S24 4.95 24 11.639c0 6.689-5.24 11.638-12 11.638-1.21 0-2.38-.16-3.47-.46a.96.96 0 00-.64.05l-2.39 1.05a.96.96 0 01-1.35-.85l-.07-2.14a.97.97 0 00-.32-.68A11.39 11.389 0 01.002 11.64zm8.32-2.19l-3.52 5.6c-.35.53.32 1.139.82.75l3.79-2.87c.26-.2.6-.2.87 0l2.8 2.1c.84.63 2.04.4 2.6-.48l3.52-5.6c.35-.53-.32-1.13-.82-.75l-3.79 2.87c-.25.2-.6.2-.86 0l-2.8-2.1a1.8 1.8 0 00-2.61.48z"
							/>
						</svg>
						<svg
							role="img"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							height={20}
							width={20}
						>
							<title>LinkedIn</title>
							<path
								fill="#0A66C2"
								d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
							/>
						</svg>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	)
}
