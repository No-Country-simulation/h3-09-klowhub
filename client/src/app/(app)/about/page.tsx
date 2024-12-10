import React from 'react'
import { Check } from 'lucide-react'

const KlowhubPage = () => {
	const bgImage = `url('/img/register-bg.png')`
	return (
		<section>
			<div
				className="mb-10 flex h-80 w-full rounded-lg text-center brightness-75"
				style={{
					backgroundImage: bgImage,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}
			>
				<h1 className="m-auto text-5xl">Klowhub</h1>
			</div>
			<section className="rounded-lg bg-gray-800 p-5">
				<h2 className="mb-4 text-3xl">Sobre Klowhub</h2>
				<p>
					Klowhub es una plataforma SaaS diseñada para ser el enlace de la
					comunidad global de desarrolladores, creadores y entusiastas No Code y
					Low Code.
				</p>
				<h3 className="mb-3 mt-6 text-2xl">Partes positivas</h3>
				<ul className="space-y-2">
					<li className="flex gap-3 pl-3">
						<Check />
						<p>
							<strong>Enfoque en la comunidad global:</strong> KlowHub está
							diseñada para ser el núcleo de una comunidad global de
							desarrolladores y usuarios en el ecosistema No Code y Low Code, lo
							que permite una amplia conexión y colaboración entre profesionales
							de todo el mundo
						</p>
					</li>
					<li className="flex gap-3 pl-3">
						<Check />
						<p>
							<strong>Apoyo a plataformas líderes:</strong> Al integrarse con
							plataformas populares como AppSheet y Power Apps, KlowHub ofrece a
							los usuarios un entorno familiar y eficiente para gestionar
							contenido y productos digitales
						</p>
					</li>
					<li className="flex gap-3 pl-3">
						<Check />
						<p>
							<strong>Facilita el aprendizaje continuo:</strong> KlowHub tiene
							como misión fomentar el aprendizaje constante, lo que es
							fundamental en un ecosistema tecnológico que cambia rápidamente.
						</p>
					</li>
					<li className="flex gap-3 pl-3">
						<Check />
						<p>
							<strong>Promoción de la colaboración profesional:</strong>
							La plataforma se enfoca en facilitar la colaboración entre
							profesionales, lo que puede generar un entorno productivo donde
							los usuarios puedan compartir ideas, resolver problemas en
							conjunto y desarrollar proyectos innovadores de manera más
							eficiente
						</p>
					</li>
					<li className="flex gap-3 pl-3">
						<Check />
						<p>
							<strong>
								Oportunidades de monetización del conocimiento técnico:
							</strong>
							KlowHub permite la monetización del conocimiento técnico, lo cual
							puede ser un gran incentivo para los desarrolladores y expertos
							que deseen compartir su experiencia
						</p>
					</li>
				</ul>
				<h3 className="mb-3 mt-6 text-2xl">Resumen</h3>
				<p>
					KlowHub es una plataforma SaaS innovadora, diseñada para ser el
					epicentro de la comunidad global de desarrolladores y usuarios dentro
					del ecosistema No Code y Low Code. Su objetivo principal es
					proporcionar un entorno altamente accesible y colaborativo que
					facilite la creación, gestión y optimización de productos digitales
					sin la necesidad de escribir código, o con una mínima intervención
					técnica, aprovechando el poder de las plataformas líderes como
					AppSheet y Power Apps. La plataforma tiene un enfoque especial en la
					gestión de contenido y productos digitales, permitiendo a los usuarios
					desarrollar soluciones personalizadas y escalables de manera
					eficiente. KlowHub está construida para apoyar a los usuarios de
					diferentes niveles, desde aquellos que recién comienzan en el mundo
					del No Code y Low Code hasta los desarrolladores más avanzados que
					buscan potenciar su trabajo con herramientas de última generación. Uno
					de los pilares fundamentales de KlowHub es su misión de fomentar el
					aprendizaje continuo. A través de recursos educativos, tutoriales
					interactivos y una comunidad activa de profesionales, la plataforma
					permite que los usuarios no solo desarrollen sus habilidades técnicas,
					sino que también mantengan su conocimiento actualizado en un
					ecosistema que evoluciona constantemente.
				</p>
				<h3 className="mb-3 mt-6 text-2xl">Para quién es</h3>
				<ul className="list-inside list-disc">
					<li>
						Desarrolladores No Code y Low Code que buscan una plataforma para
						gestionar proyectos y mejorar sus habilidades
					</li>
					<li>
						Empresas que desean optimizar la creación de productos digitales sin
						necesidad de codificación intensiva
					</li>
					<li>
						Profesionales del sector tecnológico interesados en compartir
						conocimientos y colaborar en proyectos
					</li>
					<li>
						PEducadores que quieren ofrecer recursos y cursos sobre herramientas
						No Code y Low Code
					</li>
					<li>
						Emprendedores que buscan monetizar su experiencia técnica mediante
						contenido educativo o servicios
					</li>
				</ul>
			</section>
		</section>
	)
}

export default KlowhubPage
