import Input from '@/components/inputs/Input'
import { CircleAlert } from 'lucide-react'
import PanelContainer from './PanelContainer'

export default function GeneralInformationPanel() {
	return (
		<PanelContainer className="flex flex-col gap-12">
			<Input
				label="Título del curso/lección"
				placeholder="Nombrá tu curso o lección"
				className="w-96"
			/>

			<div className="flex w-[600px] gap-6 rounded-3xl bg-white/10 px-6 py-3">
				<div>
					<CircleAlert className="w-6" />
				</div>
				<p className="text-sm font-semibold">
					El contenido gratuito ofrece acceso limitado a [características breves
					del contenido gratuito]. El contenido premium desbloquea [principales
					beneficios del contenido de pago]. Más información en nuestra
					[documentación].
				</p>
			</div>
		</PanelContainer>
	)
}
