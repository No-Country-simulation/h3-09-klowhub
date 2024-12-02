import React from 'react'

export default function PaymentMethodSkeleton() {
	return (
		<article>
			<div className="mt-5 flex animate-pulse flex-col gap-6 rounded-lg bg-gray-200 p-4">
				<div className="h-4 w-1/4 rounded bg-gray-400"></div>
				<div className="h-4 w-1/2 rounded bg-gray-400"></div>
				<div className="h-4 w-1/2 rounded bg-gray-400"></div>
				<div className="h-10 w-full rounded bg-gray-400"></div>
				<div className="h-4 w-1/2 rounded bg-gray-400"></div>
				<div className="h-4 w-1/4 rounded bg-gray-400"></div>
				<div className="flex justify-between">
					<div className="h-4 w-1/4 rounded bg-gray-400"></div>
					<div className="h-4 w-1/4 rounded bg-gray-400"></div>
				</div>
				<div className="h-4 w-1/2 rounded bg-gray-400"></div>
				<div className="grid grid-cols-3 gap-5">
					<div className="relative flex rounded-lg bg-gray-400">
						<div className="m-auto h-10 w-10 rounded p-2"></div>
					</div>
					<div className="relative flex rounded-lg bg-gray-400">
						<div className="m-auto h-10 w-10 rounded p-2"></div>
					</div>
					<div className="relative flex rounded-lg bg-gray-400">
						<div className="m-auto h-10 w-10 rounded p-2"></div>
					</div>
				</div>
			</div>
		</article>
	)
}
