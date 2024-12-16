import Button from '@/components/buttons/Button'
import ConsultantCard from '@/components/cards/ConsultantCard'
import { Consultant } from '@/models/consultant.model'

export const consultants: Consultant[] = [
	{
		id: '1',
		name: 'Alice Johnson',
		countryCode: 'US',
		image: '/img/profile_test.jpeg',
		technologies: ['AppSheet', 'PowerApps'],
		sessions: 120,
		reviews: 45,
		languages: ['English', 'Spanish'],
		price: 50
	},
	{
		id: '2',
		name: 'Carlos Martínez',
		countryCode: 'ES',
		image: '/img/profile_test.jpeg',
		technologies: ['PowerApps'],
		sessions: 95,
		reviews: 30,
		languages: ['Spanish', 'English'],
		price: 65
	},
	{
		id: '3',
		name: 'Mei Wong',
		countryCode: 'CN',
		image: '/img/profile_test.jpeg',
		technologies: ['AppSheet'],
		sessions: 80,
		reviews: 25,
		languages: ['Mandarin', 'English'],
		price: 70
	},
	{
		id: '4',
		name: 'Amar Patel',
		countryCode: 'IN',
		image: '/img/profile_test.jpeg',
		technologies: ['PowerApps', 'AppSheet'],
		sessions: 150,
		reviews: 60,
		languages: ['Hindi', 'English'],
		price: 40
	}
]

export default function FeaturedConsultants() {
	return (
		<section>
			<div className="flex w-full flex-wrap justify-between gap-y-8">
				{consultants.map((consultant) => (
					<ConsultantCard key={consultant.id} consultant={consultant} />
				))}
			</div>
			<Button variant="secondary" className="mx-auto mt-6 w-64">
				Ver mas
			</Button>
		</section>
	)
}
