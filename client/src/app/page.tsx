'use client'
import ExplorerCreatorSwitch from '@/components/buttons/ExplorerCreatorSwitch'
import { useState } from 'react'

export default function Home() {
	const [enabled, setEnabled] = useState(false)
	return (
		<div>
			<h1 className="text-3xl">WELCOME TO KLOWHUB</h1>
			<ExplorerCreatorSwitch enabled={enabled} setEnabled={setEnabled} />
		</div>
	)
}
