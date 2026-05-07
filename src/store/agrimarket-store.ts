import { create } from 'zustand'

export type Screen = 'home' | 'product' | 'cart' | 'seller' | 'admin' | 'logistics' | 'register'

interface AgrimarketState {
  currentScreen: Screen
  setScreen: (screen: Screen) => void
  selectedProduct: string | null
  setSelectedProduct: (productId: string | null) => void
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  sellerSidebarItem: string
  setSellerSidebarItem: (item: string) => void
  adminSidebarItem: string
  setAdminSidebarItem: (item: string) => void
  logisticsSidebarItem: string
  setLogisticsSidebarItem: (item: string) => void
}

export interface CartItem {
  id: string
  name: string
  sellerId: string
  sellerName: string
  sellerLocation: string
  pricePerKg: number
  quantityKg: number
  icon: string
}

export const PRODUCTS = [
  {
    id: 'premium-wheat',
    name: 'Premium Wheat',
    seller: 'Seller A',
    sellerLocation: 'Kano, Nigeria',
    sellerId: 'seller-a',
    price: 450,
    minQty: 50,
    available: 100,
    category: 'Grains & Cereals',
    description: 'High-quality wheat grains harvested fresh from Kano state farms. Ideal for flour mills and commercial buyers.',
    icon: 'wheat',
  },
  {
    id: 'yellow-corn',
    name: 'Yellow Corn',
    seller: 'Seller B',
    sellerLocation: 'Lagos, Nigeria',
    sellerId: 'seller-b',
    price: 320,
    minQty: 100,
    available: 400,
    category: 'Grains & Cereals',
    description: 'Premium yellow corn sourced from the fertile lands of Lagos state. Perfect for animal feed and industrial processing.',
    icon: 'grain',
  },
  {
    id: 'premium-barley',
    name: 'Premium Barley',
    seller: 'Seller B',
    sellerLocation: 'Lagos, Nigeria',
    sellerId: 'seller-b',
    price: 280,
    minQty: 200,
    available: 800,
    category: 'Grains & Cereals',
    description: 'Top-grade barley grains from Lagos farms. Suitable for brewing, feed, and food production.',
    icon: 'barley',
  },
]

export const CATEGORIES = [
  { name: 'Grains & Cereals', icon: 'wheat' },
  { name: 'Vegetables', icon: 'leaf' },
  { name: 'Fruits', icon: 'apple' },
  { name: 'Livestock', icon: 'fish' },
]

export const useAgrimarketStore = create<AgrimarketState>((set) => ({
  currentScreen: 'home',
  setScreen: (screen) => set({ currentScreen: screen }),
  selectedProduct: null,
  setSelectedProduct: (productId) => set({ selectedProduct: productId }),
  cartItems: [
    {
      id: 'premium-wheat',
      name: 'Premium Wheat',
      sellerId: 'seller-a',
      sellerName: 'Seller A',
      sellerLocation: 'Kano',
      pricePerKg: 450,
      quantityKg: 50,
      icon: 'wheat',
    },
    {
      id: 'yellow-corn',
      name: 'Yellow Corn',
      sellerId: 'seller-b',
      sellerName: 'Seller B',
      sellerLocation: 'Lagos',
      pricePerKg: 320,
      quantityKg: 200,
      icon: 'grain',
    },
    {
      id: 'premium-barley',
      name: 'Premium Barley',
      sellerId: 'seller-b',
      sellerName: 'Seller B',
      sellerLocation: 'Lagos',
      pricePerKg: 280,
      quantityKg: 300,
      icon: 'barley',
    },
  ],
  addToCart: (item) => set((state) => ({ cartItems: [...state.cartItems, item] })),
  sellerSidebarItem: 'overview',
  setSellerSidebarItem: (item) => set({ sellerSidebarItem: item }),
  adminSidebarItem: 'dashboard',
  setAdminSidebarItem: (item) => set({ adminSidebarItem: item }),
  logisticsSidebarItem: 'overview',
  setLogisticsSidebarItem: (item) => set({ logisticsSidebarItem: item }),
}))
