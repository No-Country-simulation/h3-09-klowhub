import { Course } from '@/models/course.model'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface State {
	cart: Course[]
	role: 'Explorer' | 'Creator'
	addCartItem: (item: Course) => void
	removeCartItem: (item: Course) => void
	getTotalCart: () => number
	toggleRole: () => void
}


const useStore = create(
	persist<State>(
		(set, get) => ({
			cart: [],
			role: 'Explorer',
			addCartItem: (item: Course) =>
				set((state) => {
					if (!state.cart.some((cartItem) => cartItem.id === item.id)) {
						return { cart: [...state.cart, item] }
					}
					return state
				}),
			removeCartItem: (item: Course) =>
				set((state) => ({
					cart: state.cart.filter((cartItem) => cartItem.id !== item.id)
				})),
			getTotalCart: () => {
				const state = get()
				return state.cart.reduce((total, item) => total + item.price, 0)
			},
			toggleRole: () =>
				set((state) => ({
					role: state.role === 'Explorer' ? 'Creator' : 'Explorer',
				}))
		}),
		{
			name: 'store',
			storage: createJSONStorage(() => localStorage)
		}
	)
)

export default useStore
