'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Wheat,
  Leaf,
  Fish,
  Package,
  X,
  ChevronRight,
  ChevronDown,
  LayoutGrid,
  TrendingUp,
} from 'lucide-react'
import { useAgrimarketStore, PRODUCTS, CATEGORIES, LOCATIONS } from '@/store/agrimarket-store'
import { fmtNum } from '@/lib/utils'
import { useState, useMemo } from 'react'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  wheat: <Wheat className="h-6 w-6" />,
  leaf: <Leaf className="h-6 w-6" />,
  fish: <Fish className="h-6 w-6" />,
  package: <Package className="h-6 w-6" />,
}

const PRODUCT_ICONS: Record<string, React.ReactNode> = {
  wheat: <Wheat className="h-12 w-12 text-[#1D9E75]" />,
  grain: <Wheat className="h-12 w-12 text-amber-600" />,
  barley: <Wheat className="h-12 w-12 text-yellow-700" />,
  leaf: <Leaf className="h-12 w-12 text-green-600" />,
  fish: <Fish className="h-12 w-12 text-sky-600" />,
  package: <Package className="h-12 w-12 text-teal-600" />,
}

interface CatalogViewPageProps {
  onNavigate: (screen: string, extra?: Record<string, string>) => void
}

export function CatalogViewPage({ onNavigate }: CatalogViewPageProps) {
  const filters = useAgrimarketStore((state) => state.filters)
  const setFilters = useAgrimarketStore((state) => state.setFilters)
  const resetFilters = useAgrimarketStore((state) => state.resetFilters)

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({ 'produce': true })
  const [expandedSubs, setExpandedSubs] = useState<Record<string, boolean>>({})

  const handleProductClick = (productId: string) => {
    onNavigate('product', { id: productId })
  }

  // Filter products based on active filters
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

  // Get cities for selected state
  const availableCities = useMemo(() => {
    if (!filters.selectedState) return []
    const loc = LOCATIONS.find((l) => l.state === filters.selectedState)
    return loc?.cities ?? []
  }, [filters.selectedState])

  const activeFilterCount = [
    filters.selectedState,
    filters.selectedCity,
    filters.selectedCategory,
    filters.selectedSubCategory,
    filters.selectedProductType,
  ].filter(Boolean).length

  const handleCategoryClick = (categoryId: string) => {
    if (filters.selectedCategory === categoryId) {
      // Deselect
      setFilters({ ...filters, selectedCategory: null, selectedSubCategory: null, selectedProductType: null })
    } else {
      setFilters({ ...filters, selectedCategory: categoryId, selectedSubCategory: null, selectedProductType: null })
    }
  }

  const handleSubCategoryClick = (subCategoryId: string) => {
    if (filters.selectedSubCategory === subCategoryId) {
      setFilters({ ...filters, selectedSubCategory: null, selectedProductType: null })
    } else {
      setFilters({ ...filters, selectedSubCategory: subCategoryId, selectedProductType: null })
    }
  }

  const handleProductTypeClick = (typeId: string) => {
    if (filters.selectedProductType === typeId) {
      setFilters({ ...filters, selectedProductType: null })
    } else {
      setFilters({ ...filters, selectedProductType: typeId })
    }
  }

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories((prev) => ({ ...prev, [catId]: !prev[catId] }))
  }

  const toggleSubExpand = (subId: string) => {
    setExpandedSubs((prev) => ({ ...prev, [subId]: !prev[subId] }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Wireframe Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5">
        <p className="text-center text-xs text-amber-800 font-medium">
          ⚠️ Wireframe prototype. All products are sold by weight (kg or metric tonne) only.
        </p>
      </div>

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Page header */}
          <div className="mb-6 flex items-center gap-3">
            <LayoutGrid className="h-6 w-6 text-[#1D9E75]" />
            <h1 className="text-2xl font-bold text-gray-900">Catalog</h1>
            <Badge className="border-[#5DCAA5] bg-[#E1F5EE] text-[#0F6E56]" variant="outline">
              {filteredProducts.length} products
            </Badge>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="ml-auto text-xs text-[#1D9E75] hover:underline font-medium"
              >
                Clear all filters ({activeFilterCount})
              </button>
            )}
          </div>

          <div className="flex gap-6">
            {/* ===== LEFT PANEL — Layered Navigation ===== */}
            <aside className="hidden md:block w-[280px] shrink-0">
              <div className="sticky top-20 space-y-4">

                {/* Location Filter */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Location</h3>
                  <div className="space-y-2">
                    <Select
                      value={filters.selectedState ?? ''}
                      onValueChange={(val) => setFilters({ ...filters, selectedState: val || null, selectedCity: null })}
                    >
                      <SelectTrigger className="w-full h-9 text-sm border-gray-200">
                        <SelectValue placeholder="All states" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOCATIONS.map((loc) => (
                          <SelectItem key={loc.state} value={loc.state}>{loc.state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {filters.selectedState && (
                      <Select
                        value={filters.selectedCity ?? ''}
                        onValueChange={(val) => setFilters({ ...filters, selectedCity: val || null })}
                      >
                        <SelectTrigger className="w-full h-9 text-sm border-gray-200">
                          <SelectValue placeholder="All cities" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCities.map((city) => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>

                {/* Layered Category Navigation */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Browse categories</h3>

                  <div className="space-y-1">
                    {CATEGORIES.map((cat) => {
                      const isExpanded = expandedCategories[cat.id] ?? false
                      const isActive = filters.selectedCategory === cat.id
                      const catIcon = CATEGORY_ICONS[cat.icon] ?? <Package className="h-6 w-6" />

                      return (
                        <div key={cat.id}>
                          {/* Category row */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleCategoryExpand(cat.id)}
                              className="p-0.5 text-gray-400 hover:text-[#1D9E75] transition-colors"
                            >
                              {isExpanded
                                ? <ChevronDown className="h-4 w-4" />
                                : <ChevronRight className="h-4 w-4" />
                              }
                            </button>
                            <button
                              onClick={() => handleCategoryClick(cat.id)}
                              className={`flex items-center gap-2 flex-1 rounded-lg px-2 py-2 text-sm font-semibold transition-colors ${
                                isActive
                                  ? 'bg-[#E1F5EE] text-[#0F6E56]'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-[#1D9E75]'
                              }`}
                            >
                              <span className={isActive ? 'text-[#1D9E75]' : 'text-gray-400'}>{catIcon}</span>
                              {cat.name}
                              <span className="ml-auto text-xs font-normal text-gray-400">
                                {PRODUCTS.filter((p) => p.category === cat.id).length}
                              </span>
                            </button>
                          </div>

                          {/* Subcategories */}
                          {isExpanded && (
                            <div className="ml-7 mt-0.5 space-y-0.5">
                              {cat.subcategories.map((sub) => {
                                const isSubExpanded = expandedSubs[sub.id] ?? false
                                const isSubActive = filters.selectedSubCategory === sub.id

                                return (
                                  <div key={sub.id}>
                                    <div className="flex items-center gap-1.5">
                                      <button
                                        onClick={() => toggleSubExpand(sub.id)}
                                        className="p-0.5 text-gray-300 hover:text-[#1D9E75] transition-colors"
                                      >
                                        {isSubExpanded
                                          ? <ChevronDown className="h-3.5 w-3.5" />
                                          : <ChevronRight className="h-3.5 w-3.5" />
                                        }
                                      </button>
                                      <button
                                        onClick={() => handleSubCategoryClick(sub.id)}
                                        className={`flex-1 text-left rounded-md px-2 py-1.5 text-sm transition-colors ${
                                          isSubActive
                                            ? 'bg-[#E1F5EE]/60 text-[#0F6E56] font-medium'
                                            : 'text-gray-500 hover:text-[#1D9E75] hover:bg-gray-50'
                                        }`}
                                      >
                                        {sub.name}
                                        <span className="ml-1.5 text-xs text-gray-400">
                                          ({PRODUCTS.filter((p) => p.subCategory === sub.id).length})
                                        </span>
                                      </button>
                                    </div>

                                    {/* Product Types */}
                                    {isSubExpanded && (
                                      <div className="ml-6 space-y-0.5">
                                        {sub.types.map((type) => {
                                          const isTypeActive = filters.selectedProductType === type.id
                                          return (
                                            <button
                                              key={type.id}
                                              onClick={() => handleProductTypeClick(type.id)}
                                              className={`block w-full text-left rounded-md px-2 py-1 text-xs transition-colors ${
                                                isTypeActive
                                                  ? 'bg-[#E1F5EE]/40 text-[#0F6E56] font-medium'
                                                  : 'text-gray-400 hover:text-[#1D9E75] hover:bg-gray-50'
                                              }`}
                                            >
                                              • {type.name}
                                              <span className="ml-1 text-gray-300">
                                                ({PRODUCTS.filter((p) => p.productType === type.id).length})
                                              </span>
                                            </button>
                                          )
                                        })}
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Active filter badges */}
                {activeFilterCount > 0 && (
                  <div className="rounded-xl border border-gray-200 bg-[#E1F5EE]/30 p-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Active filters</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {filters.selectedState && (
                        <Badge
                          className="text-xs bg-[#E1F5EE] text-[#0F6E56] border-[#5DCAA5] cursor-pointer"
                          variant="outline"
                          onClick={() => setFilters({ ...filters, selectedState: null, selectedCity: null })}
                        >
                          {filters.selectedState}{filters.selectedCity ? ` / ${filters.selectedCity}` : ''}
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      )}
                      {filters.selectedCategory && (
                        <Badge
                          className="text-xs bg-[#E1F5EE] text-[#0F6E56] border-[#5DCAA5] cursor-pointer"
                          variant="outline"
                          onClick={() => setFilters({ ...filters, selectedCategory: null, selectedSubCategory: null, selectedProductType: null })}
                        >
                          {CATEGORIES.find((c) => c.id === filters.selectedCategory)?.name}
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      )}
                      {filters.selectedSubCategory && (
                        <Badge
                          className="text-xs bg-[#E1F5EE] text-[#0F6E56] border-[#5DCAA5] cursor-pointer"
                          variant="outline"
                          onClick={() => setFilters({ ...filters, selectedSubCategory: null, selectedProductType: null })}
                        >
                          {CATEGORIES.find((c) => c.id === filters.selectedCategory)
                            ?.subcategories.find((s) => s.id === filters.selectedSubCategory)?.name}
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      )}
                      {filters.selectedProductType && (
                        <Badge
                          className="text-xs bg-[#E1F5EE] text-[#0F6E56] border-[#5DCAA5] cursor-pointer"
                          variant="outline"
                          onClick={() => setFilters({ ...filters, selectedProductType: null })}
                        >
                          {CATEGORIES.find((c) => c.id === filters.selectedCategory)
                            ?.subcategories.find((s) => s.id === filters.selectedSubCategory)
                            ?.types.find((t) => t.id === filters.selectedProductType)?.name}
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* ===== RIGHT — Product Grid ===== */}
            <div className="flex-1 min-w-0">
              {filteredProducts.length === 0 ? (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
                  <p className="text-gray-500 text-sm">No products match your filters.</p>
                  <button
                    onClick={resetFilters}
                    className="mt-2 text-sm text-[#1D9E75] hover:underline font-medium"
                  >
                    Clear all filters
                  </button>
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
        </div>
      </div>
    </div>
  )
}
