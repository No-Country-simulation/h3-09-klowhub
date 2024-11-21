import LastConsultationsTable from '@/components/tables/LastConsultationsTable'
import { Consultation } from '@/models/consultation.model'
import Link from 'next/link'

const consultations: Consultation[] = [
	{
		title: 'How to use Tailwind CSS',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dictum auctor tortor sed feugiat. Vivamus pulvinar bibendum odio et vehicula. Quisque elementum vel sem at auctor. In quis purus quis nibh ultricies imperdiet. Sed a scelerisque lorem, ac ultrices enim. Aliquam sit amet pretium odio. Sed vel eros eget nisl mollis rhoncus. Etiam a euismod sem. Sed dictum, arcu sit amet fringilla luctus, justo risus laoreet dui, vel porta ex augue in nulla.',
		autor: {
			id: '1',
			name: 'John Doe Primero Tercero',
			image: '/img/profile_test.jpeg'
		},
		date: new Date(),
		platform: 'appsheet',
		state: 'solved'
	},
	{
		title: 'How to use React',
		description:
			'Mauris vel lacus libero. Pellentesque vitae metus sapien. Mauris odio lorem, aliquet at ornare vel, elementum sed tellus. Aliquam quis arcu facilisis, pretium odio dapibus, venenatis nunc. Ut ante risus, elementum ut aliquet eget, dignissim vel orci. Proin a ultricies ex. Sed sed erat sed nisi gravida pellentesque. Mauris enim nunc, condimentum sit amet arcu sit amet, condimentum tempus turpis. Cras elementum neque erat, nec finibus quam accumsan sed. Curabitur sed felis luctus, mattis elit at, venenatis nisl.',
		autor: {
			id: '1',
			name: 'John Doe',
			image: '/img/profile_test.jpeg'
		},
		date: new Date(),
		platform: 'powerapps',
		state: 'pending'
	},
	{
		title: 'How to use Next.js',
		description:
			'Aliquam sit amet magna porttitor, consequat lectus vel, pharetra neque. Fusce fringilla tellus ac enim vehicula.',
		autor: {
			id: '1',
			name: 'John Doe',
			image: '/img/profile_test.jpeg'
		},
		date: new Date(),
		platform: 'powerapps',
		state: 'solved'
	}
]

export default function LastConsultations() {
	return (
		<section>
			<h4 className="mb-9 text-xl font-bold">Últimas consultas</h4>
			<div className="rounded-xl bg-card p-12 shadow-2xl">
				<LastConsultationsTable consultations={consultations} />
				<div className="mt-6 w-full text-center">
					<Link className="text-xl font-bold" href={'/'}>
						Ir a consultas
					</Link>
				</div>
			</div>
		</section>
	)
}
