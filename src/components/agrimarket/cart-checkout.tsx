'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ShoppingCart, Receipt, ShieldCheck, Truck, CircleCheck, Wheat, X } from 'lucide-react'
import { useAgrimarketStore } from '@/store/agrimarket-store'

const PRODUCT_ICONS: Record<string, React.ReactNode> = {
  wheat: <Wheat className="h-5 w-5 text-[#1D9E75]" />,
  grain: <Wheat className="h-5 w-5 text-amber-600" />,
  barley: <Wheat className="h-5 w-5 text-yellow-700" />,
}

type ShippingMethod = 'seller' | 'third-party'

interface SellerShippingState {
  method: ShippingMethod
  thirdPartyProvider: string
}

export function CartCheckoutPage() {
  const cartItems = useAgrimarketStore((state) => state.cartItems)

  const [sellerShipping, setSellerShipping] = useState<Record<string, SellerShippingState>>({
    'seller-a': { method: 'seller', thirdPartyProvider: 'fastlogix' },
    'seller-b': { method: 'third-party', thirdPartyProvider: 'fastlogix' },
  })

  // Group cart items by seller
  const groupedItems = useMemo(() => {
    const groups: Record<string, typeof cartItems> = {}
    for (const item of cartItems) {
      if (!groups[item.sellerId]) {
        groups[item.sellerId] = []
      }
      groups[item.sellerId].push(item)
    }
    return groups
  }, [cartItems])

  // Shipping costs per seller
  const shippingCosts: Record<string, number> = useMemo(() => {
    const costs: Record<string, number> = {}
    for (const sellerId of Object.keys(groupedItems)) {
      const shipping = sellerShipping[sellerId]
      if (!shipping) {
        costs[sellerId] = 0
        continue
      }
      if (shipping.method === 'seller') {
        if (sellerId === 'seller-a') costs[sellerId] = 1500
        else if (sellerId === 'seller-b') costs[sellerId] = 3200
        else costs[sellerId] = 0
      } else {
        if (shipping.thirdPartyProvider === 'fastlogix') costs[sellerId] = 2800
        else if (shipping.thirdPartyProvider === 'swiftcargo') costs[sellerId] = 3100
        else costs[sellerId] = 0
      }
    }
    return costs
  }, [groupedItems, sellerShipping])

  // Shipping labels for order summary
  const shippingLabels: Record<string, { label: string; cost: number }> = useMemo(() => {
    const labels: Record<string, { label: string; cost: number }> = {}
    for (const sellerId of Object.keys(groupedItems)) {
      const shipping = sellerShipping[sellerId]
      const items = groupedItems[sellerId]
      if (!shipping || !items.length) continue

      const sellerName = items[0].sellerName

      if (shipping.method === 'seller') {
        labels[sellerId] = {
          label: `${sellerName} shipping`,
          cost: shippingCosts[sellerId],
        }
      } else {
        const providerName =
          shipping.thirdPartyProvider === 'fastlogix'
            ? 'FastLogix'
            : shipping.thirdPartyProvider === 'swiftcargo'
              ? 'SwiftCargo'
              : 'Logistics'
        labels[sellerId] = {
          label: `${providerName} (${sellerName})`,
          cost: shippingCosts[sellerId],
        }
      }
    }
    return labels
  }, [groupedItems, sellerShipping, shippingCosts])

  // Calculate subtotal
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.pricePerKg * item.quantityKg, 0)
  }, [cartItems])

  const totalShipping = useMemo(() => {
    return Object.values(shippingCosts).reduce((sum, cost) => sum + cost, 0)
  }, [shippingCosts])

  const total = subtotal + totalShipping

  const handleShippingMethodChange = (sellerId: string, method: ShippingMethod) => {
    setSellerShipping((prev) => ({
      ...prev,
      [sellerId]: { ...prev[sellerId], method },
    }))
  }

  const handleThirdPartyProviderChange = (sellerId: string, provider: string) => {
    setSellerShipping((prev) => ({
      ...prev,
      [sellerId]: { ...prev[sellerId], thirdPartyProvider: provider },
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50/50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Cart & Checkout</h1>
          <p className="mt-1 text-sm text-gray-500">Review your items and choose shipping for each seller</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT COLUMN - Cart */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E1F5EE]">
                    <ShoppingCart className="h-5 w-5 text-[#1D9E75]" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">Cart</CardTitle>
                  <Badge className="ml-auto border-[#5DCAA5] bg-[#E1F5EE] text-[#0F6E56]" variant="outline">
                    {cartItems.length} items
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                {Object.entries(groupedItems).map(([sellerId, items]) => {
                  const isSellerA = sellerId === 'seller-a'
                  const sellerBg = isSellerA ? '#E1F5EE' : '#E6F1FB'
                  const sellerBorder = isSellerA ? '#9FE1CB' : '#B5D4F4'
                  const sellerAccent = isSellerA ? '#1D9E75' : '#185FA5'
                  const sellerAccentDark = isSellerA ? '#0F6E56' : '#042C53'
                  const shipping = sellerShipping[sellerId]

                  return (
                    <div
                      key={sellerId}
                      className="overflow-hidden rounded-xl border-2"
                      style={{ backgroundColor: sellerBg, borderColor: sellerBorder }}
                    >
                      {/* Seller Header */}
                      <div
                        className="flex items-center gap-2 px-4 py-3"
                        style={{ borderBottom: `1px solid ${sellerBorder}` }}
                      >
                        <Truck className="h-4 w-4" style={{ color: sellerAccent }} />
                        <span className="text-sm font-bold" style={{ color: sellerAccentDark }}>
                          {items[0].sellerName}
                        </span>
                        <Badge
                          className="text-xs"
                          style={{
                            backgroundColor: 'rgba(255,255,255,0.7)',
                            color: sellerAccent,
                            borderColor: sellerBorder,
                          }}
                          variant="outline"
                        >
                          {items[0].sellerLocation}
                        </Badge>
                      </div>

                      {/* Product Rows */}
                      <div className="space-y-0">
                        {items.map((item, index) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 px-4 py-3"
                            style={{
                              backgroundColor: 'rgba(255,255,255,0.5)',
                              borderBottom: index < items.length - 1 ? `1px solid ${sellerBorder}` : 'none',
                            }}
                          >
                            {/* Product Icon */}
                            <div
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                              style={{ backgroundColor: `${sellerBg}` }}
                            >
                              {PRODUCT_ICONS[item.icon] ?? <Wheat className="h-5 w-5" style={{ color: sellerAccent }} />}
                            </div>

                            {/* Product Info */}
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-gray-900">{item.name}</p>
                              <p className="text-xs text-gray-500">
                                ₦{item.pricePerKg.toLocaleString()}/kg
                              </p>
                            </div>

                            {/* Quantity */}
                            <div className="shrink-0 text-right">
                              <p className="text-sm font-medium text-gray-700">{item.quantityKg} kg</p>
                            </div>

                            {/* Line Total */}
                            <div className="shrink-0 text-right">
                              <p className="text-sm font-bold" style={{ color: sellerAccentDark }}>
                                ₦{(item.pricePerKg * item.quantityKg).toLocaleString()}
                              </p>
                            </div>

                            {/* Remove */}
                            <button
                              className="shrink-0 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-200/60 hover:text-gray-600"
                              aria-label={`Remove ${item.name}`}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Shipping Options */}
                      <div className="px-4 py-3">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: sellerAccent }}>
                          Shipping method
                        </p>
                        <RadioGroup
                          value={shipping?.method ?? 'seller'}
                          onValueChange={(value) => handleShippingMethodChange(sellerId, value as ShippingMethod)}
                          className="space-y-2"
                        >
                          {/* Seller's own shipping */}
                          <label
                            className="flex cursor-pointer items-center gap-3 rounded-lg border bg-white/70 p-3 transition-all"
                            style={{
                              borderColor: shipping?.method === 'seller' ? sellerAccent : '#e5e7eb',
                              boxShadow: shipping?.method === 'seller' ? `0 0 0 1px ${sellerAccent}` : 'none',
                            }}
                          >
                            <RadioGroupItem
                              value="seller"
                              style={{ borderColor: sellerAccent, color: sellerAccent }}
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-1.5">
                                <Truck className="h-3.5 w-3.5" style={{ color: sellerAccent }} />
                                <span className="text-sm font-medium text-gray-800">Seller&apos;s own shipping</span>
                              </div>
                              <span className="text-xs text-gray-500">
                                {sellerId === 'seller-a'
                                  ? '₦1,500 flat rate'
                                  : sellerId === 'seller-b'
                                    ? '₦3,200'
                                    : 'Calculated at checkout'}
                              </span>
                            </div>
                            {shipping?.method === 'seller' && (
                              <CircleCheck className="h-4 w-4" style={{ color: sellerAccent }} />
                            )}
                          </label>

                          {/* Third-party logistics */}
                          <label
                            className="flex cursor-pointer items-center gap-3 rounded-lg border bg-white/70 p-3 transition-all"
                            style={{
                              borderColor: shipping?.method === 'third-party' ? sellerAccent : '#e5e7eb',
                              boxShadow: shipping?.method === 'third-party' ? `0 0 0 1px ${sellerAccent}` : 'none',
                            }}
                          >
                            <RadioGroupItem
                              value="third-party"
                              style={{ borderColor: sellerAccent, color: sellerAccent }}
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-1.5">
                                <Truck className="h-3.5 w-3.5" style={{ color: sellerAccent }} />
                                <span className="text-sm font-medium text-gray-800">Third-party logistics</span>
                              </div>
                              {shipping?.method === 'third-party' && (
                                <div className="mt-2">
                                  <Select
                                    value={shipping.thirdPartyProvider}
                                    onValueChange={(value) => handleThirdPartyProviderChange(sellerId, value)}
                                  >
                                    <SelectTrigger
                                      className="h-8 w-full border-gray-300 text-xs"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <SelectValue placeholder="Select provider" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="fastlogix">
                                        FastLogix Nigeria — ₦2,800
                                      </SelectItem>
                                      <SelectItem value="swiftcargo">
                                        SwiftCargo NG — ₦3,100
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                            </div>
                            {shipping?.method === 'third-party' && (
                              <CircleCheck className="h-4 w-4" style={{ color: sellerAccent }} />
                            )}
                          </label>
                        </RadioGroup>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN - Order Summary */}
          <div className="space-y-4 lg:col-span-1">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E1F5EE]">
                    <Receipt className="h-5 w-5 text-[#1D9E75]" />
                  </div>
                  <CardTitle className="text-lg text-gray-900">Order summary</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-2">
                {/* Product Line Items */}
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {item.name}{' '}
                      <span className="text-gray-400">{item.quantityKg}kg</span>
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      ₦{(item.pricePerKg * item.quantityKg).toLocaleString()}
                    </span>
                  </div>
                ))}

                {/* Shipping Line Items */}
                {Object.entries(shippingLabels).map(([sellerId, { label, cost }]) => (
                  <div key={sellerId} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {label}
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      ₦{cost.toLocaleString()}
                    </span>
                  </div>
                ))}

                <Separator className="my-2" />

                {/* Total */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-base font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-[#1D9E75]">
                    ₦{total.toLocaleString()}
                  </span>
                </div>

                {/* Place Order Button */}
                <Button className="mt-2 h-12 w-full bg-[#1D9E75] text-base font-semibold text-white hover:bg-[#0F6E56]">
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Place order
                </Button>

                <p className="text-center text-xs text-gray-400">
                  Secured by AgriMarket Nigeria
                </p>
              </CardContent>
            </Card>

            {/* Collection Code Card */}
            <Card className="border-[#9FE1CB] bg-[#E1F5EE]/50 shadow-sm">
              <CardContent className="space-y-3 pt-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#1D9E75]" />
                  <span className="text-sm font-semibold text-[#0F6E56]">Collection code</span>
                </div>
                <p className="text-xs leading-relaxed text-[#0F6E56]/80">
                  After placing your order, you will receive a unique collection code via email. Present this code at the pickup point to collect your order.
                </p>
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-[#5DCAA5] bg-white px-4 py-3">
                  <span className="text-2xl font-bold tracking-widest text-[#1D9E75]">
                    AGRI4F7K92
                  </span>
                </div>
                <p className="text-center text-[10px] text-[#0F6E56]/50">
                  Sample code — your actual code will be generated upon order placement
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
