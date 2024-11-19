import ConsultantCard from '@/components/cards/ConsultantCard'
import { Consultant } from '@/models/consultant.model'

export default function Home() {
	const consultant: Consultant = {
		id: '1',
		name: 'Marcos Perez Donoso',
		countryCode: 'bo',
		technologies: ['appsheet'],
		image: '/img/profile_test.jpeg',
		sessions: 10,
		reviews: 5,
		languages: ['English', 'Spanish'],
		price: 100
	}

	return (
		<div>
			<h1 className="text-3xl">WELCOME TO KLOWHUB</h1>
			<ConsultantCard consultant={consultant} />
		</div>
	)
}
