'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  Search,
  TrendingUp,
  LayoutGrid,
  Warehouse,
  Package,
  X,
  SlidersHorizontal,
  ChevronRight,
} from 'lucide-react'
import { useAgrimarketStore, PRODUCTS, CATEGORIES, LOCATIONS, type FilterState } from '@/store/agrimarket-store'
import { useState, useMemo } from 'react'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  wheat: <Wheat className="h-8 w-8" />,
  leaf: <Leaf className="h-8 w-8" />,
  fish: <Fish className="h-8 w-8" />,
  warehouse: <Warehouse className="h-8 w-8" />,
  package: <Package className="h-8 w-8" />,
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  wheat: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  leaf: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  fish: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
  warehouse: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  package: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
}

const PRODUCT_ICONS: Record<string, React.ReactNode> = {
  wheat: <Wheat className="h-12 w-12 text-[#1D9E75]" />,
  grain: <Wheat className="h-12 w-12 text-amber-600" />,
  barley: <Wheat className="h-12 w-12 text-yellow-700" />,
  leaf: <Leaf className="h-12 w-12 text-green-600" />,
  fish: <Fish className="h-12 w-12 text-sky-600" />,
  warehouse: <Warehouse className="h-12 w-12 text-purple-600" />,
  package: <Package className="h-12 w-12 text-teal-600" />,
}

// Extracted FilterPanel as a standalone component
function FilterPanel({
  compact = false,
  filters,
  activeFilterCount,
  availableCities,
  availableSubCategories,
  availableProductTypes,
  onStateChange,
  onCityChange,
  onCategoryChange,
  onSubCategoryChange,
  onProductTypeChange,
  onClearAll,
}: {
  compact?: boolean
  filters: FilterState
  activeFilterCount: number
  availableCities: string[]
  availableSubCategories: { id: string; name: string }[]
  availableProductTypes: { id: string; name: string }[]
  onStateChange: (state: string | null) => void
  onCityChange: (city: string | null) => void
  onCategoryChange: (categoryId: string | null) => void
  onSubCategoryChange: (subCategoryId: string | null) => void
  onProductTypeChange: (typeId: string | null) => void
  onClearAll: () => void
}) {
  return (
    <div className={`space-y-4 ${compact ? 'p-4' : ''}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Filters</h3>
        {activeFilterCount > 0 && (
          <button onClick={onClearAll} className="text-xs text-[#1D9E75] hover:underline font-medium">
            Clear all
          </button>
        )}
      </div>

      {/* Location Filter */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</p>
        <Select
          value={filters.selectedState ?? ''}
          onValueChange={(val) => onStateChange(val || null)}
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
            onValueChange={(val) => onCityChange(val || null)}
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

      {/* Category Filter */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</p>
        <Select
          value={filters.selectedCategory ?? ''}
          onValueChange={(val) => onCategoryChange(val || null)}
        >
          <SelectTrigger className="w-full h-9 text-sm border-gray-200">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sub Category Filter */}
      {filters.selectedCategory && availableSubCategories.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sub Category</p>
          <Select
            value={filters.selectedSubCategory ?? ''}
            onValueChange={(val) => onSubCategoryChange(val || null)}
          >
            <SelectTrigger className="w-full h-9 text-sm border-gray-200">
              <SelectValue placeholder="All sub categories" />
            </SelectTrigger>
            <SelectContent>
              {availableSubCategories.map((sub) => (
                <SelectItem key={sub.id} value={sub.id}>{sub.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Product Type Filter */}
      {filters.selectedSubCategory && availableProductTypes.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Type</p>
          <Select
            value={filters.selectedProductType ?? ''}
            onValueChange={(val) => onProductTypeChange(val || null)}
          >
            <SelectTrigger className="w-full h-9 text-sm border-gray-200">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              {availableProductTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Active filter badges */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {filters.selectedState && (
            <Badge
              className="text-xs bg-[#E1F5EE] text-[#0F6E56] border-[#5DCAA5] cursor-pointer"
              variant="outline"
              onClick={() => onStateChange(null)}
            >
              {filters.selectedState}
              {filters.selectedCity && ` / ${filters.selectedCity}`}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
          {filters.selectedCategory && (
            <Badge
              className="text-xs bg-[#E1F5EE] text-[#0F6E56] border-[#5DCAA5] cursor-pointer"
              variant="outline"
              onClick={() => onCategoryChange(null)}
            >
              {CATEGORIES.find((c) => c.id === filters.selectedCategory)?.name}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
          {filters.selectedSubCategory && (
            <Badge
              className="text-xs bg-[#E1F5EE] text-[#0F6E56] border-[#5DCAA5] cursor-pointer"
              variant="outline"
              onClick={() => onSubCategoryChange(null)}
            >
              {availableSubCategories.find((s) => s.id === filters.selectedSubCategory)?.name}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
          {filters.selectedProductType && (
            <Badge
              className="text-xs bg-[#E1F5EE] text-[#0F6E56] border-[#5DCAA5] cursor-pointer"
              variant="outline"
              onClick={() => onProductTypeChange(null)}
            >
              {availableProductTypes.find((t) => t.id === filters.selectedProductType)?.name}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          )}
        </div>
      )}

      {/* Category Hierarchy Info */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
        <p className="text-xs font-semibold text-gray-500 mb-2">Category structure</p>
        <div className="space-y-1.5 text-xs text-gray-600">
          {CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <button
                onClick={() => onCategoryChange(cat.id === filters.selectedCategory ? null : cat.id)}
                className={`flex items-center gap-1 font-medium hover:text-[#1D9E75] transition-colors ${
                  filters.selectedCategory === cat.id ? 'text-[#1D9E75]' : 'text-gray-700'
                }`}
              >
                <ChevronRight className={`h-3 w-3 transition-transform ${filters.selectedCategory === cat.id ? 'rotate-90' : ''}`} />
                {cat.name}
              </button>
              {filters.selectedCategory === cat.id && (
                <div className="ml-4 mt-1 space-y-1">
                  {cat.subcategories.map((sub) => (
                    <div key={sub.id}>
                      <button
                        onClick={() => onSubCategoryChange(sub.id === filters.selectedSubCategory ? null : sub.id)}
                        className={`text-gray-500 hover:text-[#1D9E75] ${
                          filters.selectedSubCategory === sub.id ? 'text-[#1D9E75] font-medium' : ''
                        }`}
                      >
                        → {sub.name}
                      </button>
                      {filters.selectedSubCategory === sub.id && (
                        <div className="ml-3 mt-0.5 space-y-0.5">
                          {sub.types.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => onProductTypeChange(type.id === filters.selectedProductType ? null : type.id)}
                              className={`block text-gray-400 hover:text-[#1D9E75] ${
                                filters.selectedProductType === type.id ? 'text-[#1D9E75] font-medium' : ''
                              }`}
                            >
                              • {type.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function MarketplacePage() {
  const setScreen = useAgrimarketStore((state) => state.setScreen)
  const setSelectedProduct = useAgrimarketStore((state) => state.setSelectedProduct)
  const filters = useAgrimarketStore((state) => state.filters)
  const setFilters = useAgrimarketStore((state) => state.setFilters)
  const resetFilters = useAgrimarketStore((state) => state.resetFilters)

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const handleProductClick = (productId: string) => {
    setSelectedProduct(productId)
    setScreen('product')
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

  // Get available subcategories based on selected category
  const availableSubCategories = useMemo(() => {
    if (!filters.selectedCategory) return []
    const cat = CATEGORIES.find((c) => c.id === filters.selectedCategory)
    return cat?.subcategories ?? []
  }, [filters.selectedCategory])

  // Get available product types based on selected subcategory
  const availableProductTypes = useMemo(() => {
    if (!filters.selectedSubCategory || !filters.selectedCategory) return []
    const cat = CATEGORIES.find((c) => c.id === filters.selectedCategory)
    const sub = cat?.subcategories.find((s) => s.id === filters.selectedSubCategory)
    return sub?.types ?? []
  }, [filters.selectedCategory, filters.selectedSubCategory])

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

  const handleCategoryChange = (categoryId: string | null) => {
    setFilters({
      ...filters,
      selectedCategory: categoryId,
      selectedSubCategory: null,
      selectedProductType: null,
    })
  }

  const handleSubCategoryChange = (subCategoryId: string | null) => {
    setFilters({
      ...filters,
      selectedSubCategory: subCategoryId,
      selectedProductType: null,
    })
  }

  const handleStateChange = (state: string | null) => {
    setFilters({
      ...filters,
      selectedState: state,
      selectedCity: null,
    })
  }

  const filterPanelProps = {
    filters,
    activeFilterCount,
    availableCities,
    availableSubCategories,
    availableProductTypes,
    onStateChange: handleStateChange,
    onCityChange: (city: string | null) => setFilters({ ...filters, selectedCity: city }),
    onCategoryChange: handleCategoryChange,
    onSubCategoryChange: handleSubCategoryChange,
    onProductTypeChange: (typeId: string | null) => setFilters({ ...filters, selectedProductType: typeId }),
    onClearAll: resetFilters,
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Wireframe Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5">
        <p className="text-center text-xs text-amber-800 font-medium">
          ⚠️ This is a wireframe prototype for demonstration purposes only. The final implementation may vary in design and functionality.
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
            Buy directly from farmers and aggregators · Weight-based quantities · Simple delivery
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

      {/* Main Content with Sidebar Filter */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-6">
            {/* Desktop Filter Sidebar */}
            <aside className="hidden lg:block w-[260px] shrink-0">
              <div className="sticky top-20 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <FilterPanel {...filterPanelProps} />
              </div>
            </aside>

            {/* Mobile Filter Button */}
            <div className="lg:hidden fixed bottom-4 right-4 z-40">
              <Button
                onClick={() => setMobileFiltersOpen(true)}
                className="h-12 rounded-full bg-[#1D9E75] text-white shadow-lg hover:bg-[#0F6E56]"
              >
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-[#1D9E75]">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Mobile Filter Sheet */}
            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
                <div className="absolute right-0 top-0 h-full w-[300px] bg-white shadow-xl overflow-y-auto">
                  <div className="flex items-center justify-between border-b p-4">
                    <h2 className="font-bold text-gray-900">Filters</h2>
                    <button onClick={() => setMobileFiltersOpen(false)} className="rounded-full p-1 hover:bg-gray-100">
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  <FilterPanel compact {...filterPanelProps} />
                </div>
              </div>
            )}

            {/* Products Area */}
            <div className="flex-1 min-w-0 space-y-8">
              {/* Browse by Category */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <LayoutGrid className="h-5 w-5 text-[#1D9E75]" />
                  <h2 className="text-xl font-bold text-gray-900">Browse by category</h2>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {CATEGORIES.map((category) => {
                    const colors = CATEGORY_COLORS[category.icon] ?? {
                      bg: 'bg-gray-50',
                      text: 'text-gray-700',
                      border: 'border-gray-200',
                    }
                    const isActive = filters.selectedCategory === category.id
                    return (
                      <Card
                        key={category.id}
                        className={`cursor-pointer border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                          isActive ? 'border-[#1D9E75] shadow-md' : `${colors.border} hover:border-[#1D9E75]/50`
                        }`}
                        onClick={() => handleCategoryChange(isActive ? null : category.id)}
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

              {/* Results Header */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[#1D9E75]" />
                    <h2 className="text-xl font-bold text-gray-900">
                      {activeFilterCount > 0 ? 'Filtered results' : 'Featured listings'}
                    </h2>
                    <Badge className="border-[#5DCAA5] bg-[#E1F5EE] text-[#0F6E56]" variant="outline">
                      {filteredProducts.length}
                    </Badge>
                  </div>
                </div>

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
                          {/* Placeholder Image Area */}
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
                                ₦{product.price.toLocaleString()}
                              </span>
                              <span className="text-xs text-gray-500">
                                /{product.unit === 'metric-tonne' ? 'metric tonne' : 'kg'}
                              </span>
                            </div>
                          </CardContent>

                          <CardFooter className="flex items-center justify-between gap-2 pt-0 pb-3">
                            <Badge
                              className="border-amber-300 bg-amber-50 text-amber-700 text-[10px]"
                              variant="outline"
                            >
                              Min. {product.minQty} {product.unit === 'metric-tonne' ? 'MT' : 'kg'}
                            </Badge>
                            <span className="text-[10px] text-gray-400">
                              {product.available.toLocaleString()} {product.unit === 'metric-tonne' ? 'MT' : 'kg'} available
                            </span>
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
      </section>
    </div>
  )
}
