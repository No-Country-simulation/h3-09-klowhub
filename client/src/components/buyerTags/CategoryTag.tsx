import { ReactNode } from 'react'

export default function CategoryTag({ children }: { children: ReactNode }) {
	return (
		<article className="h-7 w-fit px-[6px] bg-category_tag-bg text-category_tag-text leading-7 rounded-lg text-sm font-semibold">
			{children}
		</article>
	)
}
