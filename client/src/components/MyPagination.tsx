'use client'

import { CustomFlowbiteTheme, Pagination } from 'flowbite-react'

interface MyPaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

export default function MyPagination({
	currentPage,
	totalPages,
	onPageChange
}: MyPaginationProps) {
	const customTheme: CustomFlowbiteTheme['pagination'] = {
		base: '',
		layout: {
			table: {
				base: 'text-sm text-gray-700 dark:text-gray-400',
				span: 'font-semibold text-gray-900 dark:text-white'
			}
		},
		pages: {
			base: 'xs:mt-0 mt-2 inline-flex items-center -space-x-px',
			showIcon: 'inline-flex',
			previous: {
				base: 'ml-0 rounded-l-lg border border-primary-a-100 bg-transparent px-3 py-2 leading-tight text-primary-a-100 enabled:hover:bg-primary-a-100 enabled:hover:text-primary-a-500',
				icon: 'h-5 w-5'
			},
			next: {
				base: 'rounded-r-lg border border-primary-a-100 bg-transparent px-3 py-2 leading-tight text-primary-a-100 enabled:hover:bg-primary-a-100 enabled:hover:text-primary-a-500',
				icon: 'h-5 w-5'
			},
			selector: {
				base: 'w-[38px] border border-primary-a-100 bg-transparent py-2 leading-tight text-primary-a-100 enabled:hover:bg-primary-a-100 enabled:hover:text-primary-a-500',
				active:
					'bg-primary-a-100 text-primary-a-500 hover:bg-primary-a-100 hover:text-primary-a-500 ',
				disabled: 'cursor-not-allowed opacity-50'
			}
		}
	}

	return (
		<Pagination
			theme={customTheme}
			currentPage={currentPage}
			totalPages={totalPages}
			onPageChange={onPageChange}
			previousLabel="Volver"
			nextLabel="Siguiente"
			showIcons
		/>
	)
}
