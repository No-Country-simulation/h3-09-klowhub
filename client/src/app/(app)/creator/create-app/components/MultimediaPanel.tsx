export default function MultimediaPanel({
	setResources,
	handleSubmit
}: {
	setResources: (resources: string[]) => void
	handleSubmit: () => void
}) {
	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const files = Array.from(e.target.files).map((file) => file.name)
			setResources(files)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Sube tus archivos multimedia</label>
				<input type='file' multiple onChange={handleFileUpload} />
			</div>
			<button type='submit'>Finalizar</button>
		</form>
	)
}
