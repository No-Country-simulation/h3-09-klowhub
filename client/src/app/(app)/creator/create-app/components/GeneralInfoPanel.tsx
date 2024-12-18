export default function GeneralInformationPanel({
	nextStep
}: {
	nextStep: (data: Partial<App>) => void
}) {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				nextStep({ name: 'Nueva App', description: 'Descripción breve' })
			}}
		>
			<div>
				<label>Nombre de la App</label>
				<input type='text' placeholder='Dale un nombre a tu app' />
			</div>
			<div>
				<label>Descripción</label>
				<textarea placeholder='Describe brevemente tu app' />
			</div>
			<button type='submit'>Siguiente</button>
		</form>
	)
}
