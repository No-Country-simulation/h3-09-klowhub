'use client'
import Button from '@/components/buttons/Button'
import Link from 'next/link'
import LatestSales from './components/LatestSales'
import MyCreatedCourses from './components/MyCreatedCourses'

export default function MyCoursesPage() {
	return (
		<>
			<h4 className="mb-12 font-bold">Mis cursos</h4>

			<div className="mb-6 flex items-center justify-between">
				<h6 className="font-bold">Últimas ventas</h6>
				<Link href={'create-course'}>
					<Button>Crear curso</Button>
				</Link>
			</div>

			<div className="flex w-full flex-col gap-12 rounded-lg bg-card p-6">
				<LatestSales />
				<MyCreatedCourses />
			</div>
		</>
	)
}
