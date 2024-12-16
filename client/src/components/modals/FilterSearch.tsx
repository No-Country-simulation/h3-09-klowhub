import * as constants from '@/constants/filters.constant'
import { X } from 'lucide-react'
import React from 'react'
import Button from '../buttons/Button'

interface Props {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	setFilters: React.Dispatch<React.SetStateAction<object>>
}
export default function FilterSearch({ setIsModalOpen, setFilters }: Props) {
	function Component({ filterSection }) {
		return Object.entries(filterSection).map(([key, category]) => (
			<label
				key={key}
				className="flex w-fit cursor-pointer items-center gap-1 rounded-lg p-1 text-xs hover:bg-white/10"
			>
				<input
					type="checkbox"
					value={category as string}
					onChange={() =>
						setFilters((prev) => ({
							prev,
							[key]: category as string
						}))
					}
					className="rounded-md"
				/>
				<p>{category as string}</p>
			</label>
		))
	}
	function Section({ title, section }) {
		return (
			<div className="flex flex-col gap-4 rounded-lg bg-white/10 px-4 py-2">
				<h3>{title}</h3>
				<div
					className={`${Object.keys(section).length < 3 ? 'grid-cols-1' : 'grid-cols-2'} grid gap-1`}
				>
					<Component filterSection={section} />
				</div>
				<Button
					variant="secondary"
					size="l"
					className="mt-auto w-fit min-w-0 p-0 text-xs"
					icon={<X />}
				>
					Limpiar
				</Button>
			</div>
		)
	}
	return (
		<section className="fixed inset-0 z-50 m-0 flex justify-end bg-black bg-opacity-50">
			<article className="z-10 flex h-full w-2/3 flex-col gap-1 rounded-lg bg-card px-8 py-4 shadow-lg">
				{' '}
				<div className="flex">
					<X
						size={30}
						className="ml-auto cursor-pointer rounded-lg p-1 outline-1 hover:outline"
						onClick={() => setIsModalOpen(false)}
					/>
				</div>
				<div className="no-scrollbar grid grid-cols-2 gap-3 overflow-y-scroll">
					<Section section={constants.platforms} title={'Plataforma'} />
					<Section section={constants.language} title={'Idioma'} />
					<Section
						section={constants.contentTypes}
						title={'Tipo de contenido'}
					/>
					<Section section={constants.levels} title={'Nivel de competencia'} />
					<Section
						section={constants.toolsAndPlatforms}
						title={'Herramientas y plataformas'}
					/>
					<Section section={constants.sector} title={'Sector'} />
				</div>
			</article>
		</section>
	)
}
