'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Wheat, Leaf, Apple, Fish, Search, TrendingUp, LayoutGrid } from 'lucide-react'
import { useAgrimarketStore, PRODUCTS, CATEGORIES } from '@/store/agrimarket-store'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  wheat: <Wheat className="h-8 w-8" />,
  leaf: <Leaf className="h-8 w-8" />,
  apple: <Apple className="h-8 w-8" />,
  fish: <Fish className="h-8 w-8" />,
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  wheat: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  leaf: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  apple: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  fish: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
}

const PRODUCT_ICONS: Record<string, React.ReactNode> = {
  wheat: <Wheat className="h-12 w-12 text-[#1D9E75]" />,
  grain: <Wheat className="h-12 w-12 text-amber-600" />,
  barley: <Wheat className="h-12 w-12 text-yellow-700" />,
}

export function MarketplacePage() {
  const setScreen = useAgrimarketStore((state) => state.setScreen)
  const setSelectedProduct = useAgrimarketStore((state) => state.setSelectedProduct)

  const handleProductClick = (productId: string) => {
    setSelectedProduct?.(productId)
    setScreen('product')
  }

  return (
    <div className="min-h-screen bg-white">
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
            Nigeria&apos;s leading bulk agricultural marketplace
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base text-[#0F6E56]/80 sm:text-lg">
            Buy directly from farmers and aggregators · Weight-based quantities · Secure delivery
          </p>

          {/* Search Bar */}
          <div className="mx-auto flex max-w-xl items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0F6E56]/50" />
              <Input
                placeholder="Search for grains, vegetables, fruits..."
                className="h-12 border-[#5DCAA5] bg-white pl-10 text-[#0F6E56] placeholder:text-[#0F6E56]/40 focus-visible:ring-[#1D9E75]"
              />
            </div>
            <Button
              className="h-12 bg-[#1D9E75] px-6 text-white hover:bg-[#0F6E56]"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-[#1D9E75]" />
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Browse by category</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {CATEGORIES.map((category) => {
              const colors = CATEGORY_COLORS[category.icon] ?? {
                bg: 'bg-gray-50',
                text: 'text-gray-700',
                border: 'border-gray-200',
              }
              return (
                <Card
                  key={category.name}
                  className={`cursor-pointer border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${colors.border} hover:border-[#1D9E75]`}
                >
                  <CardContent className="flex flex-col items-center gap-3 p-6">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${colors.bg} ${colors.text}`}
                    >
                      {CATEGORY_ICONS[category.icon]}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{category.name}</span>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#1D9E75]" />
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Featured listings</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <Card
                key={product.id}
                className="cursor-pointer overflow-hidden border border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:border-[#5DCAA5] hover:shadow-lg"
                onClick={() => handleProductClick(product.id)}
              >
                {/* Placeholder Image Area */}
                <div className="flex h-44 items-center justify-center bg-gray-100">
                  {PRODUCT_ICONS[product.icon] ?? <Wheat className="h-12 w-12 text-[#1D9E75]" />}
                </div>

                <CardHeader className="pb-2 pt-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-gray-900">{product.name}</h3>
                    <Badge
                      className="shrink-0 border-[#5DCAA5] bg-[#E1F5EE] text-[#0F6E56]"
                      variant="outline"
                    >
                      {product.category}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pb-2">
                  <p className="text-sm text-gray-500">
                    {product.seller} · {product.sellerLocation}
                  </p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[#1D9E75]">
                      ₦{product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">/kg</span>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between gap-2 pt-0 pb-4">
                  <Badge
                    className="border-amber-300 bg-amber-50 text-amber-700"
                    variant="outline"
                  >
                    Min. {product.minQty} kg
                  </Badge>
                  <span className="text-xs text-gray-400">
                    {product.available.toLocaleString()} kg available
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
