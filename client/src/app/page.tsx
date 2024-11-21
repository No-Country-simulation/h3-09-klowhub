import ConnectExpertsBanner from './components/ConnectExpertsBanner'
import FeaturedConsultants from './components/FeaturedConsultants'
import LastConsultations from './components/LastConsultations'
import RecommendedApps from './components/RecommendedApps'
import RecommendedCourses from './components/RecommendedCourses'
import SectionsLinkButtons from './components/SectionsLinkButtons'

export default function Home() {
	return (
		<div className="flex flex-col gap-12">
			<SectionsLinkButtons />
			<RecommendedCourses />
			<RecommendedApps />
			<LastConsultations />
			<ConnectExpertsBanner />
			<FeaturedConsultants />
		</div>
	)
}
