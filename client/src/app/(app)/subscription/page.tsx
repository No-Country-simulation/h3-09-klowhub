'use client'
import { Subscription } from '@/models/subscription.model'
import { useState } from 'react'
import BuySubscription from './components/BuySubscription'
import FormNewCreator from './components/FormNewCreator'
import SelectSubscription from './components/SelectSubscription'

export default function Page() {
	const [subscriptionSelected, setSubscriptionSelected] =
		useState<Subscription | null>(null)
	const [step, setStep] = useState(0)

	const nextStep = () => {
		setStep(step + 1)
		window.scrollTo({
			top: 0
		})
	}

	return (
		<section className="flex flex-col gap-7 pb-20">
			{step === 0 && (
				<SelectSubscription
					nextStep={nextStep}
					subscriptionSelected={subscriptionSelected}
					setSubscriptionSelected={setSubscriptionSelected}
				/>
			)}
			{step === 1 && subscriptionSelected && (
				<FormNewCreator nextStep={nextStep} />
			)}
			{step === 2 && subscriptionSelected && (
				<BuySubscription subscriptionSelected={subscriptionSelected} />
			)}
		</section>
	)
}
