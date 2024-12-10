import { ReactNode } from 'react'

export default function CategoryTag({ children }: { children: ReactNode }) {
	return (
		<article className="h-7 w-fit rounded-lg bg-category_tag-bg px-[6px] text-sm font-semibold leading-7 text-category_tag-text">
			{children}
		</article>
	)
}
