'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useCallback } from 'react'
import { MarketplacePage } from '@/components/agrimarket/marketplace'
import { ProductDetailPage } from '@/components/agrimarket/product-detail'
import { CartCheckoutPage } from '@/components/agrimarket/cart-checkout'
import { SellerDashboardPage } from '@/components/agrimarket/seller-dashboard'
import { AdminPanelPage } from '@/components/agrimarket/admin-panel'
import { LogisticsDashboardPage } from '@/components/agrimarket/logistics-dashboard'
import { RegistrationPage } from '@/components/agrimarket/registration'
import { cn } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'
import { useAgrimarketStore } from '@/store/agrimarket-store'

const NAV_ITEMS = [
  { key: 'home', label: 'Marketplace' },
  { key: 'cart', label: 'Cart' },
  { key: 'seller', label: 'Seller Dashboard' },
  { key: 'admin', label: 'Super Admin' },
  { key: 'logistics', label: 'Logistics' },
  { key: 'register', label: 'Registration' },
]

function LoadingSkeleton() {
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

function HomeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const cartItems = useAgrimarketStore((s) => s.cartItems)

  const currentScreen = searchParams.get('screen') || 'home'

  const navigateTo = useCallback((screen: string, extra?: Record<string, string>) => {
    const params = new URLSearchParams()
    params.set('screen', screen)
    if (extra) {
      Object.entries(extra).forEach(([k, v]) => {
        if (v) params.set(k, v)
      })
    }
    router.push(`/?${params.toString()}`)
  }, [router])

  const navigateHome = useCallback(() => {
    router.push('/')
  }, [router])

  const renderScreen = () => {
    switch (currentScreen) {
      case 'product':
        return <ProductDetailPage onNavigate={navigateTo} onBack={navigateHome} />
      case 'cart':
        return <CartCheckoutPage />
      case 'seller':
        return <SellerDashboardPage />
      case 'admin':
        return <AdminPanelPage />
      case 'logistics':
        return <LogisticsDashboardPage />
      case 'register':
        return <RegistrationPage />
      case 'home':
      default:
        return <MarketplacePage onNavigate={navigateTo} />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F3]">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white border-b border-gray-200 px-4 sm:px-5 py-2.5">
        <button
          onClick={navigateHome}
          className="text-[15px] font-medium text-gray-900 shrink-0 hover:opacity-80 transition-opacity"
        >
          <span className="text-[#1D9E75]">Agri</span>Market{' '}
          <span className="text-[11px] font-normal text-gray-400 ml-1.5">Nigeria</span>
        </button>
        <nav className="flex gap-1 flex-wrap justify-end items-center" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => item.key === 'home' ? navigateHome() : navigateTo(item.key)}
              className={cn(
                'text-xs px-3 py-1.5 rounded-md cursor-pointer border transition-all duration-150',
                currentScreen === item.key
                  ? 'bg-[#E1F5EE] text-[#0F6E56] border-[#5DCAA5]'
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-[#E1F5EE] hover:text-[#0F6E56] hover:border-[#5DCAA5]'
              )}
            >
              {item.label}
              {item.key === 'cart' && cartItems.length > 0 && (
                <span className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#1D9E75] text-[10px] font-bold text-white">
                  {cartItems.length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </header>

      {/* Screen Content */}
      <main className="flex-1">
        {renderScreen()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-4 py-3 mt-auto">
        <div className="text-center space-y-1">
          <p className="text-xs text-gray-400">&copy; 2026 AgriMarket Nigeria — Bulk Agricultural Marketplace</p>
          <p className="text-[10px] text-amber-600 font-medium">⚠️ This is a wireframe prototype. Actual implementation may vary.</p>
        </div>
      </footer>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <HomeContent />
    </Suspense>
  )
}
