export default function CourseAbout({
	detailedDescription
}: {
	detailedDescription: string
}) {
	return (
		<article className="flex flex-col gap-3">
			<h6 className="text-sm font-semibold">Acerca de este curso</h6>
			<p className="text-sm">{detailedDescription}</p>
		</article>
	)
}
