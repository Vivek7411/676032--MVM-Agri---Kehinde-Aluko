'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  Wheat,
  Leaf,
  Fish,
  Search,
  TrendingUp,
  LayoutGrid,
  Package,
} from 'lucide-react'
import { useAgrimarketStore, PRODUCTS, CATEGORIES } from '@/store/agrimarket-store'
import { fmtNum } from '@/lib/utils'
import { useMemo } from 'react'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  wheat: <Wheat className="h-8 w-8" />,
  leaf: <Leaf className="h-8 w-8" />,
  fish: <Fish className="h-8 w-8" />,
  package: <Package className="h-8 w-8" />,
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  wheat: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  leaf: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  fish: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
  package: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
}

const PRODUCT_ICONS: Record<string, React.ReactNode> = {
  wheat: <Wheat className="h-12 w-12 text-[#1D9E75]" />,
  grain: <Wheat className="h-12 w-12 text-amber-600" />,
  barley: <Wheat className="h-12 w-12 text-yellow-700" />,
  leaf: <Leaf className="h-12 w-12 text-green-600" />,
  fish: <Fish className="h-12 w-12 text-sky-600" />,
  package: <Package className="h-12 w-12 text-teal-600" />,
}

interface MarketplacePageProps {
  onNavigate: (screen: string, extra?: Record<string, string>) => void
}

export function MarketplacePage({ onNavigate }: MarketplacePageProps) {
  const filters = useAgrimarketStore((state) => state.filters)

  const handleProductClick = (productId: string) => {
    onNavigate('product', { id: productId })
  }

  // Filter products based on active filters (from Catalog View, shared via Zustand)
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (filters.selectedState) {
        const stateMatch = product.sellerLocation.includes(filters.selectedState)
        if (!stateMatch) return false
      }
      if (filters.selectedCity) {
        const cityMatch = product.sellerLocation.includes(filters.selectedCity)
        if (!cityMatch) return false
      }
      if (filters.selectedCategory && product.category !== filters.selectedCategory) return false
      if (filters.selectedSubCategory && product.subCategory !== filters.selectedSubCategory) return false
      if (filters.selectedProductType && product.productType !== filters.selectedProductType) return false
      return true
    })
  }, [filters])

  return (
    <div className="min-h-screen bg-white">
      {/* Wireframe Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5">
        <p className="text-center text-xs text-amber-800 font-medium">
          ⚠️ This is a wireframe prototype for demonstration purposes only. All products on this marketplace are sold by weight (kg or metric tonne) only — there is no item-based quantity.
        </p>
      </div>

      {/* Hero Banner */}
      <section
        className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        style={{ background: 'linear-gradient(135deg, #E1F5EE 0%, #c2eddf 50%, #E1F5EE 100%)' }}
      >
        <div className="mx-auto max-w-5xl text-center">
          <Badge
            className="mb-4 border-[#5DCAA5] bg-white/80 text-[#0F6E56] hover:bg-white/90"
            variant="outline"
          >
            <TrendingUp className="mr-1 h-3 w-3" />
            Trusted by 10,000+ buyers across Nigeria
          </Badge>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-[#0F6E56] sm:text-4xl lg:text-5xl">
            Nigeria&apos;s bulk agricultural marketplace
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base text-[#0F6E56]/80 sm:text-lg">
            Buy directly from farmers and aggregators · Sold by weight (kg / metric tonne) · Simple delivery
          </p>

          {/* Search Bar */}
          <div className="mx-auto flex max-w-xl items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0F6E56]/50" />
              <Input
                placeholder="Search for grains, vegetables, livestock..."
                className="h-12 border-[#5DCAA5] bg-white pl-10 text-[#0F6E56] placeholder:text-[#0F6E56]/40 focus-visible:ring-[#1D9E75]"
              />
            </div>
            <Button className="h-12 bg-[#1D9E75] px-6 text-white hover:bg-[#0F6E56]">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content — no filter sidebar */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Browse by Category */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-[#1D9E75]" />
              <h2 className="text-xl font-bold text-gray-900">Browse by category</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {CATEGORIES.map((category) => {
                const colors = CATEGORY_COLORS[category.icon] ?? {
                  bg: 'bg-gray-50',
                  text: 'text-gray-700',
                  border: 'border-gray-200',
                }
                return (
                  <Card
                    key={category.id}
                    className={`border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${colors.border} hover:border-[#1D9E75]/50`}
                    onClick={() => onNavigate('catalog', { cat: category.id })}
                  >
                    <CardContent className="flex flex-col items-center gap-2 p-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}
                      >
                        {CATEGORY_ICONS[category.icon]}
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{category.name}</span>
                      <span className="text-[10px] text-gray-400">
                        {category.subcategories.length} sub-categories
                      </span>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Featured Listings */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#1D9E75]" />
              <h2 className="text-xl font-bold text-gray-900">Featured listings</h2>
              <Badge className="border-[#5DCAA5] bg-[#E1F5EE] text-[#0F6E56]" variant="outline">
                {filteredProducts.length}
              </Badge>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
                <p className="text-gray-500 text-sm">No products found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => {
                  const catLabel = CATEGORIES.find((c) => c.id === product.category)?.name ?? product.category
                  const subLabel = CATEGORIES.find((c) => c.id === product.category)
                    ?.subcategories.find((s) => s.id === product.subCategory)?.name ?? ''
                  const typeLabel = CATEGORIES.find((c) => c.id === product.category)
                    ?.subcategories.find((s) => s.id === product.subCategory)
                    ?.types.find((t) => t.id === product.productType)?.name ?? ''
                  return (
                    <Card
                      key={product.id}
                      className="cursor-pointer overflow-hidden border border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:border-[#5DCAA5] hover:shadow-lg"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <div className="flex h-36 items-center justify-center bg-gray-100">
                        {PRODUCT_ICONS[product.icon] ?? <Wheat className="h-12 w-12 text-[#1D9E75]" />}
                      </div>

                      <CardHeader className="pb-2 pt-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-bold text-gray-900">{product.name}</h3>
                          <Badge
                            className="shrink-0 border-[#5DCAA5] bg-[#E1F5EE] text-[#0F6E56] text-[10px]"
                            variant="outline"
                          >
                            {catLabel}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="pb-2">
                        <p className="text-xs text-gray-500">
                          {product.seller} · {product.sellerLocation}
                        </p>
                        {subLabel && (
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            {subLabel}{typeLabel ? ` · ${typeLabel}` : ''}
                          </p>
                        )}
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="text-xl font-bold text-[#1D9E75]">
                            ₦{fmtNum(product.price)}
                          </span>
                          <span className="text-xs text-gray-500">
                            /{product.unit === 'metric-tonne' ? 'metric tonne' : 'kg'}
                          </span>
                        </div>
                      </CardContent>

                      <CardFooter className="flex items-center gap-2 pt-0 pb-3">
                        <Badge
                          className="border-amber-300 bg-amber-50 text-amber-700 text-[10px]"
                          variant="outline"
                        >
                          Min. {product.minWeight} {product.unit === 'metric-tonne' ? 'MT' : 'kg'}
                        </Badge>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
