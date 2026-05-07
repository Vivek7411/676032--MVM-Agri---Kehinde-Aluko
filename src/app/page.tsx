'use client'

import { useAgrimarketStore, type Screen } from '@/store/agrimarket-store'
import { MarketplacePage } from '@/components/agrimarket/marketplace'
import { ProductDetailPage } from '@/components/agrimarket/product-detail'
import { CartCheckoutPage } from '@/components/agrimarket/cart-checkout'
import { SellerDashboardPage } from '@/components/agrimarket/seller-dashboard'
import { AdminPanelPage } from '@/components/agrimarket/admin-panel'
import { LogisticsDashboardPage } from '@/components/agrimarket/logistics-dashboard'
import { RegistrationPage } from '@/components/agrimarket/registration'
import { useHydrated } from '@/hooks/use-hydrated'
import { cn } from '@/lib/utils'

const NAV_ITEMS: { key: Screen; label: string }[] = [
  { key: 'home', label: 'Marketplace' },
  { key: 'product', label: 'Product Detail' },
  { key: 'cart', label: 'Cart & Checkout' },
  { key: 'seller', label: 'Seller Dashboard' },
  { key: 'admin', label: 'Super Admin' },
  { key: 'logistics', label: 'Logistics' },
  { key: 'register', label: 'Registration' },
]

const SCREEN_MAP: Record<Screen, React.ComponentType> = {
  home: MarketplacePage,
  product: ProductDetailPage,
  cart: CartCheckoutPage,
  seller: SellerDashboardPage,
  admin: AdminPanelPage,
  logistics: LogisticsDashboardPage,
  register: RegistrationPage,
}

export default function Home() {
  const currentScreen = useAgrimarketStore((s) => s.currentScreen)
  const setScreen = useAgrimarketStore((s) => s.setScreen)
  const hydrated = useHydrated()

  const ScreenComponent = SCREEN_MAP[currentScreen]

  // During SSR, render a consistent skeleton to avoid hydration mismatches
  if (!hydrated) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F7F6F3]">
        <header className="sticky top-0 z-50 flex items-center justify-between bg-white border-b border-gray-200 px-4 sm:px-5 py-2.5">
          <div className="text-[15px] font-medium text-gray-900 shrink-0">
            <span className="text-[#1D9E75]">Agri</span>Market{' '}
            <span className="text-[11px] font-normal text-gray-400 ml-1.5">Nigeria</span>
          </div>
          <nav className="flex gap-1 flex-wrap justify-end" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <span
                key={item.key}
                className="text-xs px-3 py-1.5 rounded-md border bg-[#E1F5EE] text-[#0F6E56] border-[#5DCAA5]"
              >
                {item.label}
              </span>
            ))}
          </nav>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-48 rounded-xl bg-[#E1F5EE]" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 rounded-xl bg-gray-100" />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 rounded-xl bg-gray-100" />
              ))}
            </div>
          </div>
        </main>
        <footer className="bg-white border-t border-gray-200 px-4 py-3 text-center text-xs text-gray-400 mt-auto">
          &copy; 2026 AgriMarket Nigeria — Bulk Agricultural Marketplace Prototype
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F3]">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white border-b border-gray-200 px-4 sm:px-5 py-2.5">
        <div className="text-[15px] font-medium text-gray-900 shrink-0">
          <span className="text-[#1D9E75]">Agri</span>Market{' '}
          <span className="text-[11px] font-normal text-gray-400 ml-1.5">Nigeria</span>
        </div>
        <nav className="flex gap-1 flex-wrap justify-end" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => setScreen(item.key)}
              className={cn(
                'text-xs px-3 py-1.5 rounded-md cursor-pointer border transition-all duration-150',
                currentScreen === item.key
                  ? 'bg-[#E1F5EE] text-[#0F6E56] border-[#5DCAA5]'
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-[#E1F5EE] hover:text-[#0F6E56] hover:border-[#5DCAA5]'
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Screen Content */}
      <main className="flex-1 p-4 sm:p-6">
        <ScreenComponent />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-4 py-3 text-center text-xs text-gray-400 mt-auto">
        &copy; 2026 AgriMarket Nigeria — Bulk Agricultural Marketplace Prototype
      </footer>
    </div>
  )
}
