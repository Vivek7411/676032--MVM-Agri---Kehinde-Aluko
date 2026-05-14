import { create } from 'zustand'

export type Screen = 'home' | 'product' | 'cart' | 'seller' | 'admin' | 'logistics' | 'register'

// Category hierarchy: Category → Subcategory → Product Type
export interface ProductType {
  id: string
  name: string
}

export interface SubCategory {
  id: string
  name: string
  types: ProductType[]
}

export interface Category {
  id: string
  name: string
  icon: string
  subcategories: SubCategory[]
}

// Location data
export interface LocationData {
  state: string
  cities: string[]
}

export type SellerType = 'farmer' | 'aggregator' | 'input-supplier'
export type UnitOfMeasure = 'kg' | 'metric-tonne'

export interface CartItem {
  id: string
  name: string
  sellerId: string
  sellerName: string
  sellerLocation: string
  pricePerUnit: number
  unit: UnitOfMeasure
  quantity: number
  icon: string
  category: string
  subCategory: string
  productType: string
}

export interface Product {
  id: string
  name: string
  seller: string
  sellerLocation: string
  sellerId: string
  price: number
  unit: UnitOfMeasure
  minQty: number
  available: number
  category: string
  subCategory: string
  productType: string
  description: string
  icon: string
}

// Full category hierarchy
export const CATEGORIES: Category[] = [
  {
    id: 'produce',
    name: 'Produce',
    icon: 'wheat',
    subcategories: [
      {
        id: 'crops',
        name: 'Crops',
        types: [
          { id: 'corn', name: 'Corn' },
          { id: 'wheat', name: 'Wheat' },
          { id: 'rice', name: 'Rice' },
          { id: 'barley', name: 'Barley' },
          { id: 'sorghum', name: 'Sorghum' },
        ],
      },
      {
        id: 'vegetables',
        name: 'Vegetables',
        types: [
          { id: 'tomatoes', name: 'Tomatoes' },
          { id: 'peppers', name: 'Peppers' },
          { id: 'onions', name: 'Onions' },
        ],
      },
      {
        id: 'fruits',
        name: 'Fruits',
        types: [
          { id: 'mangoes', name: 'Mangoes' },
          { id: 'oranges', name: 'Oranges' },
          { id: 'plantains', name: 'Plantains' },
        ],
      },
    ],
  },
  {
    id: 'livestock',
    name: 'Livestock',
    icon: 'fish',
    subcategories: [
      {
        id: 'poultry',
        name: 'Poultry',
        types: [
          { id: 'chickens', name: 'Chickens' },
          { id: 'turkeys', name: 'Turkeys' },
        ],
      },
      {
        id: 'cattle',
        name: 'Cattle',
        types: [
          { id: 'cows', name: 'Cows' },
        ],
      },
    ],
  },
  {
    id: 'warehouse',
    name: 'Warehouse',
    icon: 'warehouse',
    subcategories: [
      {
        id: 'storage',
        name: 'Storage',
        types: [
          { id: 'cold-storage', name: 'Cold Storage' },
          { id: 'dry-storage', name: 'Dry Storage' },
        ],
      },
    ],
  },
  {
    id: 'logistics',
    name: 'Logistics',
    icon: 'truck',
    subcategories: [
      {
        id: 'transport',
        name: 'Transport',
        types: [
          { id: 'road-transport', name: 'Road Transport' },
        ],
      },
    ],
  },
]

export const LOCATIONS: LocationData[] = [
  { state: 'Lagos', cities: ['Ikeja', 'Lagos Island', 'Surulere', 'Lekki', 'Agege'] },
  { state: 'Kano', cities: ['Kano City', 'Fagge', 'Dala', 'Gwale'] },
  { state: 'Abuja', cities: ['Central Area', 'Garki', 'Wuse', 'Maitama', 'Jabi'] },
  { state: 'Rivers', cities: ['Port Harcourt', 'Obio-Akpor', 'Eleme'] },
  { state: 'Oyo', cities: ['Ibadan', 'Oyo Town', 'Saki'] },
  { state: 'Kaduna', cities: ['Kaduna City', 'Zaria', 'Kafanchan'] },
  { state: 'Delta', cities: ['Asaba', 'Warri', 'Sapele'] },
  { state: 'Ogun', cities: ['Abeokuta', 'Sagamu', 'Ijebu-Ode'] },
]

export const PRODUCTS: Product[] = [
  {
    id: 'premium-wheat',
    name: 'Premium Wheat',
    seller: 'Aminu Farms Ltd.',
    sellerLocation: 'Kano, Nigeria',
    sellerId: 'seller-a',
    price: 450,
    unit: 'kg',
    minQty: 50,
    available: 100,
    category: 'produce',
    subCategory: 'crops',
    productType: 'wheat',
    description: 'High-quality wheat grains harvested fresh from Kano state farms. Ideal for flour mills and commercial buyers.',
    icon: 'wheat',
  },
  {
    id: 'yellow-corn',
    name: 'Yellow Corn',
    seller: 'Delta Agro Co.',
    sellerLocation: 'Lagos, Nigeria',
    sellerId: 'seller-b',
    price: 320,
    unit: 'kg',
    minQty: 100,
    available: 400,
    category: 'produce',
    subCategory: 'crops',
    productType: 'corn',
    description: 'Premium yellow corn sourced from the fertile lands of Lagos state. Perfect for animal feed and industrial processing.',
    icon: 'grain',
  },
  {
    id: 'premium-barley',
    name: 'Premium Barley',
    seller: 'Delta Agro Co.',
    sellerLocation: 'Lagos, Nigeria',
    sellerId: 'seller-b',
    price: 280,
    unit: 'kg',
    minQty: 200,
    available: 800,
    category: 'produce',
    subCategory: 'crops',
    productType: 'barley',
    description: 'Top-grade barley grains from Lagos farms. Suitable for brewing, feed, and food production.',
    icon: 'barley',
  },
  {
    id: 'fresh-tomatoes',
    name: 'Fresh Tomatoes',
    seller: 'Aminu Farms Ltd.',
    sellerLocation: 'Kano, Nigeria',
    sellerId: 'seller-a',
    price: 180,
    unit: 'kg',
    minQty: 25,
    available: 200,
    category: 'produce',
    subCategory: 'vegetables',
    productType: 'tomatoes',
    description: 'Fresh vine-ripened tomatoes from Kano. Ideal for bulk buyers and food processors.',
    icon: 'leaf',
  },
  {
    id: 'live-chickens',
    name: 'Live Chickens',
    seller: 'Oyo Poultry Farm',
    sellerLocation: 'Oyo, Nigeria',
    sellerId: 'seller-c',
    price: 3500,
    unit: 'kg',
    minQty: 10,
    available: 500,
    category: 'livestock',
    subCategory: 'poultry',
    productType: 'chickens',
    description: 'Healthy, well-fed broiler chickens raised in Oyo state. Available for bulk purchase.',
    icon: 'fish',
  },
  {
    id: 'npk-fertilizer',
    name: 'NPK Fertilizer (50kg bags)',
    seller: 'GreenInput Ltd.',
    sellerLocation: 'Lagos, Nigeria',
    sellerId: 'seller-d',
    price: 12500,
    unit: 'metric-tonne',
    minQty: 1,
    available: 50,
    category: 'produce',
    subCategory: 'crops',
    productType: 'corn',
    description: 'NPK 15-15-15 fertilizer suitable for a wide range of crops. Sold in 50kg bags, priced per metric tonne.',
    icon: 'package',
  },
  {
    id: 'hybrid-corn-seeds',
    name: 'Hybrid Corn Seeds',
    seller: 'GreenInput Ltd.',
    sellerLocation: 'Lagos, Nigeria',
    sellerId: 'seller-d',
    price: 8500,
    unit: 'metric-tonne',
    minQty: 1,
    available: 30,
    category: 'produce',
    subCategory: 'crops',
    productType: 'corn',
    description: 'High-yield hybrid corn seeds for commercial planting. Priced per metric tonne.',
    icon: 'package',
  },
  {
    id: 'cold-storage-lagos',
    name: 'Cold Storage Facility — Lagos',
    seller: 'StoreRight NG',
    sellerLocation: 'Lagos, Nigeria',
    sellerId: 'seller-e',
    price: 500,
    unit: 'metric-tonne',
    minQty: 1,
    available: 100,
    category: 'warehouse',
    subCategory: 'storage',
    productType: 'cold-storage',
    description: 'Temperature-controlled warehouse space available for perishable goods storage in Lagos.',
    icon: 'warehouse',
  },
]

// Filter state
export interface FilterState {
  selectedState: string | null
  selectedCity: string | null
  selectedCategory: string | null
  selectedSubCategory: string | null
  selectedProductType: string | null
}

interface AgrimarketState {
  currentScreen: Screen
  setScreen: (screen: Screen) => void
  selectedProduct: string | null
  setSelectedProduct: (productId: string | null) => void
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  sellerSidebarItem: string
  setSellerSidebarItem: (item: string) => void
  adminSidebarItem: string
  setAdminSidebarItem: (item: string) => void
  logisticsSidebarItem: string
  setLogisticsSidebarItem: (item: string) => void
  // Filters
  filters: FilterState
  setFilters: (filters: FilterState) => void
  resetFilters: () => void
}

const DEFAULT_FILTERS: FilterState = {
  selectedState: null,
  selectedCity: null,
  selectedCategory: null,
  selectedSubCategory: null,
  selectedProductType: null,
}

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
      sellerName: 'Aminu Farms Ltd.',
      sellerLocation: 'Kano',
      pricePerUnit: 450,
      unit: 'kg',
      quantity: 50,
      icon: 'wheat',
      category: 'produce',
      subCategory: 'crops',
      productType: 'wheat',
    },
    {
      id: 'yellow-corn',
      name: 'Yellow Corn',
      sellerId: 'seller-b',
      sellerName: 'Delta Agro Co.',
      sellerLocation: 'Lagos',
      pricePerUnit: 320,
      unit: 'kg',
      quantity: 200,
      icon: 'grain',
      category: 'produce',
      subCategory: 'crops',
      productType: 'corn',
    },
    {
      id: 'premium-barley',
      name: 'Premium Barley',
      sellerId: 'seller-b',
      sellerName: 'Delta Agro Co.',
      sellerLocation: 'Lagos',
      pricePerUnit: 280,
      unit: 'kg',
      quantity: 300,
      icon: 'barley',
      category: 'produce',
      subCategory: 'crops',
      productType: 'barley',
    },
  ],
  addToCart: (item) => set((state) => ({ cartItems: [...state.cartItems, item] })),
  removeFromCart: (itemId) => set((state) => ({ cartItems: state.cartItems.filter((i) => i.id !== itemId) })),
  sellerSidebarItem: 'overview',
  setSellerSidebarItem: (item) => set({ sellerSidebarItem: item }),
  adminSidebarItem: 'dashboard',
  setAdminSidebarItem: (item) => set({ adminSidebarItem: item }),
  logisticsSidebarItem: 'overview',
  setLogisticsSidebarItem: (item) => set({ logisticsSidebarItem: item }),
  filters: DEFAULT_FILTERS,
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: DEFAULT_FILTERS }),
}))
