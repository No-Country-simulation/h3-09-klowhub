import { Option } from '@/models/option.model'
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions
} from '@headlessui/react'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'

interface MyListboxProps {
	options: Option[]
	label?: string
	value?: string | number | (string | number)[]
	onChange?: (value: string | number | (string | number)[]) => void
	multiple?: boolean
}

export default function MyListbox({
	options,
	label,
	value,
	onChange,
	multiple
}: MyListboxProps) {
	const isMultiple = Array.isArray(value)

	return (
		<div className="flex flex-col gap-6">
			{label && <label className="text-sm font-semibold">{label}</label>}
			<Listbox value={value} onChange={onChange} multiple={multiple}>
				<div className="relative">
					<ListboxButton className="relative h-11 w-full cursor-default rounded-lg border border-primary-b-300 bg-white px-3 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-b-400">
						<span className="block truncate text-sm text-black">
							{multiple && isMultiple && value.length > 0
								? options
										.filter((option) => value.includes(option.value))
										.map((option) => option.label)
										.join(', ')
								: !multiple && typeof value === 'string'
									? options.find((option) => option.value === value)?.label ||
										'Selecciona una opción'
									: 'Selecciona las opciones'}
						</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronsUpDown className="size-5 text-gray-400" />
						</span>
					</ListboxButton>
					<ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						{options.map((option) => (
							<ListboxOption
								key={option.value}
								value={option.value}
								className={`relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 focus:bg-primary-b-300 focus:text-white`}
							>
								{({ selected }) => (
									<>
										<span
											className={`block truncate ${selected && 'font-medium'}`}
										>
											{option.label}
										</span>
										{selected && (
											<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-b-300">
												<CheckIcon className="h-5 w-5" aria-hidden="true" />
											</span>
										)}
									</>
								)}
							</ListboxOption>
						))}
					</ListboxOptions>
				</div>
			</Listbox>
		</div>
	)
}
