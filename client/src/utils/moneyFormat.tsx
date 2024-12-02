export default function moneyFormat(money: number) {
	const result = Intl.NumberFormat('en-EN', {
		style: 'currency',
		currency: 'USD'
	}).format(money)
	return result
}
