import { Course } from '@/models/course.model'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface State {
	cart: Course[]
	addCartItem: (item: Course) => void
	removeCartItem: (item: Course) => void
	getTotalCart: () => number
}

const useStore = create(
	persist<State>(
		(set, get) => ({
			cart: [],
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
			}
		}),
		{
			name: 'store',
			storage: createJSONStorage(() => localStorage)
		}
	)
)

export default useStore
