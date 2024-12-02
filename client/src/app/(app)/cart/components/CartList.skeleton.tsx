import React from 'react'

export default function CartListSkeleton() {
	return (
		<article className="md:col-span-2">
			<div className="relative my-6 flex h-64 animate-pulse gap-3 rounded-lg bg-gray-300 p-3">
				<div className="h-full w-60 rounded-lg bg-gray-400"></div>
				<div className="flex h-full w-full flex-col justify-between">
					<div className="h-5 w-1/2 rounded-lg bg-gray-400"></div>
					<div className="h-5 w-1/3 rounded-lg bg-gray-400"></div>
					<div className="h-5 w-1/4 rounded-lg bg-gray-400"></div>
					<div className="h-5 w-1/4 rounded-lg bg-gray-400"></div>
					<div className="h-5 w-1/4 rounded-lg bg-gray-400"></div>
				</div>
			</div>
			<div className="relative my-6 flex h-64 animate-pulse gap-3 rounded-lg bg-gray-300 p-3">
				<div className="h-full w-60 rounded-lg bg-gray-400"></div>
				<div className="flex h-full w-full flex-col justify-between">
					<div className="h-5 w-1/2 rounded-lg bg-gray-400"></div>
					<div className="h-5 w-1/3 rounded-lg bg-gray-400"></div>
					<div className="h-5 w-1/4 rounded-lg bg-gray-400"></div>
					<div className="h-5 w-1/4 rounded-lg bg-gray-400"></div>
					<div className="h-5 w-1/4 rounded-lg bg-gray-400"></div>
				</div>
			</div>
		</article>
	)
}
