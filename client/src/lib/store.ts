import { App } from '@/models/app.model'
import { Course } from '@/models/course.model'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
type CartItem = Course | App
interface State {
	cart: CartItem[]
	role: 'Explorer' | 'Creator'
	addCartItem: (item: CartItem) => void
	removeCartItem: (item: CartItem) => void
	getTotalCart: () => number
	toggleRole: () => void
	emptyCart: () => void
}

const useStore = create(
	persist<State>(
		(set, get) => ({
			cart: [],
			role: 'Explorer',
			addCartItem: (item: CartItem) =>
				set((state) => {
					if (!state.cart.some((cartItem) => cartItem.title === item.title)) {
						return { cart: [...state.cart, item] }
					}
					return state
				}),
			removeCartItem: (item: CartItem) =>
				set((state) => ({
					cart: state.cart.filter((cartItem) => cartItem.title !== item.title)
				})),
			getTotalCart: () => {
				const state = get()
				return state.cart.reduce((total, item) => total + item.price, 0)
			},
			emptyCart: () => set({ cart: [] }),
			toggleRole: () =>
				set((state) => ({
					role: state.role === 'Explorer' ? 'Creator' : 'Explorer'
				}))
		}),
		{
			name: 'store',
			storage: createJSONStorage(() => localStorage)
		}
	)
)

export default useStore
