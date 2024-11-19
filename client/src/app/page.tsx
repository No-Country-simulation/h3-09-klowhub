import ConsultantCard from '@/components/cards/ConsultantCard'

export default function Home() {
	const consultant = {
		id: '1',
		name: 'Marcos Perez Donoso',
		countryCode: 'AR',
		technologies: ['React', 'NextJS', 'TypeScript', 'TailwindCSS'],
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
