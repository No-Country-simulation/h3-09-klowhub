import Image from 'next/image'

export default function CountryTag({ countryCode }: { countryCode: string }) {
	return (
		<article className="size-fit">
			<Image
				src={`https://kapowaz.github.io/square-flags/flags/${countryCode}.svg`}
				alt="country_flag"
				height={50}
				width={50}
				className="h-5 w-5 rounded-lg"
			/>
		</article>
	)
}
