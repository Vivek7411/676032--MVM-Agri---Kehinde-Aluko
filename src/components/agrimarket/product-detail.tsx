'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Wheat, Info, Store, ArrowLeft, Plus, Leaf, Fish, Package } from 'lucide-react'
import { useAgrimarketStore, PRODUCTS, CATEGORIES } from '@/store/agrimarket-store'
import { fmtNum } from '@/lib/utils'
import type { UnitOfMeasure } from '@/store/agrimarket-store'

const PRODUCT_ICONS: Record<string, React.ReactNode> = {
  wheat: <Wheat className="h-16 w-16" style={{ color: '#1D9E75' }} />,
  grain: <Wheat className="h-16 w-16" style={{ color: '#b45309' }} />,
  barley: <Wheat className="h-16 w-16" style={{ color: '#a16207' }} />,
  leaf: <Leaf className="h-16 w-16" style={{ color: '#16a34a' }} />,
  fish: <Fish className="h-16 w-16" style={{ color: '#0284c7' }} />,
  package: <Package className="h-16 w-16" style={{ color: '#0d9488' }} />,
}

const THUMB_ICONS: Record<string, React.ReactNode> = {
  wheat: <Wheat className="h-5 w-5" style={{ color: '#5DCAA5' }} />,
  grain: <Wheat className="h-5 w-5" style={{ color: '#d97706' }} />,
  barley: <Wheat className="h-5 w-5" style={{ color: '#ca8a04' }} />,
  leaf: <Leaf className="h-5 w-5" style={{ color: '#22c55e' }} />,
  fish: <Fish className="h-5 w-5" style={{ color: '#38bdf8' }} />,
  package: <Package className="h-5 w-5" style={{ color: '#2dd4bf' }} />,
}

interface ProductDetailPageProps {
  onNavigate: (screen: string, extra?: Record<string, string>) => void
  onBack: () => void
}

export function ProductDetailPage({ onNavigate, onBack }: ProductDetailPageProps) {
  const searchParams = useSearchParams()
  const productId = searchParams.get('id')
  const addToCart = useAgrimarketStore((s) => s.addToCart)

  // Look up product by ID from URL
  const product = PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0]

  const defaultWeight = product.minWeight
  const [weight, setWeight] = useState<string>(String(defaultWeight))
  const [unit, setUnit] = useState<UnitOfMeasure>(product.unit)

  // Get category labels
  const categoryObj = CATEGORIES.find((c) => c.id === product.category)
  const subCategoryObj = categoryObj?.subcategories.find((s) => s.id === product.subCategory)
  const productTypeObj = subCategoryObj?.types.find((t) => t.id === product.productType)

  const categoryLabel = categoryObj?.name ?? product.category
  const subCategoryLabel = subCategoryObj?.name ?? product.subCategory
  const productTypeLabel = productTypeObj?.name ?? product.productType

  const unitLabel = unit === 'metric-tonne' ? 'metric tonne' : 'kg'
  const unitShort = unit === 'metric-tonne' ? 'MT' : 'kg'

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      sellerId: product.sellerId,
      sellerName: product.seller,
      sellerLocation: product.sellerLocation,
      pricePerUnit: product.price,
      unit,
      weight: Number(weight) || product.minWeight,
      icon: product.icon,
      category: product.category,
      subCategory: product.subCategory,
      productType: product.productType,
    })
    onNavigate('cart')
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Back to Marketplace */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium hover:underline transition-colors"
        style={{ color: '#1D9E75' }}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Marketplace
      </button>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-gray-400">
        <button onClick={onBack} className="hover:text-[#1D9E75]">Marketplace</button>
        <span>/</span>
        <span className="text-gray-600">{categoryLabel}</span>
        <span>/</span>
        <span className="text-gray-600">{subCategoryLabel}</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">{productTypeLabel}</span>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column — Image gallery */}
        <div className="md:w-1/2 space-y-3">
          {/* Main image placeholder */}
          <div
            className="w-full rounded-lg flex items-center justify-center"
            style={{ height: 220, backgroundColor: '#f3f4f6' }}
          >
            {PRODUCT_ICONS[product.icon] ?? <Wheat className="h-16 w-16" style={{ color: '#1D9E75' }} />}
          </div>

          {/* Thumbnail placeholders */}
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex-1 rounded-md flex items-center justify-center"
                style={{ height: 64, backgroundColor: '#f3f4f6' }}
              >
                {THUMB_ICONS[product.icon] ?? <Wheat className="h-5 w-5" style={{ color: '#5DCAA5' }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Right column — Product info */}
        <div className="md:w-1/2 space-y-4">
          {/* Product name */}
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

          {/* Category hierarchy */}
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="outline" className="text-xs border-[#5DCAA5] text-[#0F6E56]">{categoryLabel}</Badge>
            <span className="text-gray-300">→</span>
            <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">{subCategoryLabel}</Badge>
            <span className="text-gray-300">→</span>
            <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">{productTypeLabel}</Badge>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

          {/* Price */}
          <p className="text-3xl font-bold" style={{ color: '#1D9E75' }}>
            ₦{fmtNum(product.price)}/{unitLabel}
          </p>

          <Separator />

          {/* Info rows */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Minimum weight:</span>
              <Badge className="font-semibold border-0 bg-amber-50 text-amber-700">
                {product.minWeight} {unitShort}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Location:</span>
              <span className="text-sm text-gray-600">{product.sellerLocation}</span>
            </div>
          </div>

          <Separator />

          {/* Weight input */}
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-sm font-medium text-gray-700">
              Weight to order
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="weight"
                type="number"
                min={product.minWeight}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="flex-1"
              />
              <Select
                value={unit}
                onValueChange={(val) => setUnit(val as UnitOfMeasure)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  <SelectItem value="metric-tonne">Metric Tonne (MT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-start gap-1.5">
              <Info className="h-3.5 w-3.5 mt-0.5" style={{ color: '#5DCAA5' }} />
              <p className="text-xs text-gray-500">
                Minimum order weight is {product.minWeight} {unitShort}. 1 metric tonne = 1,000 kg. All products are sold by weight only.
              </p>
            </div>
          </div>

          {/* Add to cart button */}
          <Button
            className="w-full text-white font-semibold py-3"
            style={{ backgroundColor: '#1D9E75' }}
            onClick={handleAddToCart}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add to cart
          </Button>
        </div>
      </div>

      {/* Seller info card */}
      <Card
        className="overflow-hidden"
        style={{ borderColor: '#5DCAA5' }}
      >
        <CardContent className="p-4 flex items-center gap-4">
          <div
            className="flex items-center justify-center rounded-full shrink-0"
            style={{ width: 48, height: 48, backgroundColor: '#E1F5EE' }}
          >
            <Store className="h-5 w-5" style={{ color: '#1D9E75' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900">{product.seller}</p>
            <p className="text-sm text-gray-500">{product.sellerLocation}</p>
          </div>
          <Badge
            className="font-semibold border-0 shrink-0"
            style={{ backgroundColor: '#E1F5EE', color: '#0F6E56' }}
          >
            <Store className="h-3.5 w-3.5 mr-1" />
            {product.seller}
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}
