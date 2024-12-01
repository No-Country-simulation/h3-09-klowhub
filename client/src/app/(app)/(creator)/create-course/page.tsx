import TabListAndPanels from '@/components/Tabs/TabListAndPanels'
import GeneralInformationPanel from './components/GeneralInformationPanel'

export default function CreateCoursePage() {
	const labels = [
		'Información general',
		'Detalles del curso',
		'Módulos y lecciones'
	]
	const panels = [
		<GeneralInformationPanel key={1} />,
		<div key={1}>Contenido</div>,
		<div key={2}>Preguntas</div>
	]

	return (
		<>
			<h4>Lanza tu curso: Comparte tu conocimiento</h4>
			<TabListAndPanels labels={labels} panels={panels} />
		</>
	)
}
