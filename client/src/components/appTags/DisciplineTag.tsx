export default function DisciplineTag({ text }: { text: string }) {
	return (
		<article className="flex h-10 w-fit items-center justify-center rounded-lg border border-white px-2">
			<span className="text-sm font-semibold text-white">{text}</span>
		</article>
	)
}
