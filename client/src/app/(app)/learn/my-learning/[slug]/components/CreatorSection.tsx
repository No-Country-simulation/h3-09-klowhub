import { Creator } from '@/models/course.model'
import Image from 'next/image'

interface CreatorSectionProps {
	creator: Creator
}

export default function CreatorSection({ creator }: CreatorSectionProps) {
	return (
		<section className="flex items-center gap-3">
			<Image
				src={creator.profilePicture ?? '/img/user_avatar.png'}
				alt={creator.name}
				height={500}
				width={500}
				className="size-12 rounded-full object-cover"
			/>
			<div className="flex flex-col gap-2">
				<p className="text-sm">{creator.name}</p>
				<p className="text-xs font-medium text-[#d8c5c5]">
					Instructor y desarrollador
				</p>
			</div>
		</section>
	)
}
