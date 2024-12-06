interface Commission {
	method: string
	percentage: number
}
export interface Subscription {
	id: string
	level: string
	price: number
	details: string[]
	commissions: Commission[]
}
