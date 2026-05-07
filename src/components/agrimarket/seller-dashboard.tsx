'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import {
  LayoutDashboard,
  Package,
  Plus,
  ShoppingBag,
  Truck,
  Wallet,
  User,
  Upload,
  Download,
  Wheat,
} from 'lucide-react'
import { useAgrimarketStore } from '@/store/agrimarket-store'

const SIDEBAR_ITEMS = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'my-products', label: 'My products', icon: Package },
  { key: 'add-product', label: 'Add product', icon: Plus },
  { key: 'orders', label: 'Orders', icon: ShoppingBag },
  { key: 'shipping', label: 'Shipping rates', icon: Truck },
  { key: 'payouts', label: 'Payouts', icon: Wallet },
  { key: 'profile', label: 'Profile', icon: User },
] as const

const STATS = [
  { label: 'Total orders', value: '38', icon: ShoppingBag },
  { label: 'Pending payouts', value: '₦184k', icon: Wallet },
  { label: 'Active listings', value: '12', icon: Package },
  { label: 'Stock kg', value: '1,420', icon: Wheat },
] as const

const PRODUCTS_TABLE = [
  { name: 'Premium Wheat', stock: '100kg', minQty: '50kg', status: 'Live' },
  { name: 'Yellow Corn', stock: '400kg', minQty: '100kg', status: 'Live' },
  { name: 'Sesame Seeds', stock: '220kg', minQty: '25kg', status: 'Pending approval' },
] as const

export function SellerDashboardPage() {
  const sellerSidebarItem = useAgrimarketStore((s) => s.sellerSidebarItem)
  const setSellerSidebarItem = useAgrimarketStore((s) => s.setSellerSidebarItem)

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[200px_1fr]">
          {/* Sidebar */}
          <aside className="w-full lg:w-[200px]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Seller menu
            </p>
            <nav className="flex flex-row gap-1 overflow-x-auto lg:flex-col">
              {SIDEBAR_ITEMS.map((item) => {
                const isActive = sellerSidebarItem === item.key
                const Icon = item.icon
                return (
                  <button
                    key={item.key}
                    onClick={() => setSellerSidebarItem(item.key)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-[#E1F5EE] text-[#0F6E56]'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="min-w-0 space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((stat) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center gap-1 rounded-xl bg-muted px-4 py-5 text-center"
                  >
                    <Icon className="mb-1 h-5 w-5 text-[#1D9E75]" />
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                    <span className="text-xs text-gray-500">{stat.label}</span>
                  </div>
                )
              })}
            </div>

            {/* My Products Card */}
            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-[#1D9E75]" />
                  <CardTitle className="text-lg font-bold text-gray-900">My products</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                        <th className="pb-3 pr-4">Product</th>
                        <th className="pb-3 pr-4">Stock</th>
                        <th className="pb-3 pr-4">Min qty</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PRODUCTS_TABLE.map((product) => (
                        <tr key={product.name} className="border-b last:border-0">
                          <td className="py-3 pr-4 font-medium text-gray-900">{product.name}</td>
                          <td className="py-3 pr-4 text-gray-600">{product.stock}</td>
                          <td className="py-3 pr-4 text-gray-600">{product.minQty}</td>
                          <td className="py-3">
                            {product.status === 'Live' ? (
                              <Badge className="border-green-300 bg-green-50 text-green-700 hover:bg-green-100">
                                Live
                              </Badge>
                            ) : (
                              <Badge className="border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100">
                                Pending approval
                              </Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Add New Product Card */}
            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-[#1D9E75]" />
                  <CardTitle className="text-lg font-bold text-gray-900">Add new product</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="product-name" className="text-sm font-medium text-gray-700">
                      Product name
                    </Label>
                    <Input
                      id="product-name"
                      placeholder="e.g. Premium Wheat"
                      className="border-gray-300 focus-visible:ring-[#1D9E75]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                      Category
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full border-gray-300 focus:ring-[#1D9E75]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grains-cereals">Grains & Cereals</SelectItem>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                        <SelectItem value="fruits">Fruits</SelectItem>
                        <SelectItem value="livestock">Livestock</SelectItem>
                        <SelectItem value="seeds">Seeds</SelectItem>
                        <SelectItem value="legumes">Legumes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price-per-kg" className="text-sm font-medium text-gray-700">
                      Price per kg
                    </Label>
                    <Input
                      id="price-per-kg"
                      type="number"
                      placeholder="₦0"
                      className="border-gray-300 focus-visible:ring-[#1D9E75]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="available-qty" className="text-sm font-medium text-gray-700">
                      Available quantity
                    </Label>
                    <Input
                      id="available-qty"
                      type="number"
                      placeholder="kg"
                      className="border-gray-300 focus-visible:ring-[#1D9E75]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-purchase-qty" className="text-sm font-medium text-gray-700">
                      Min purchase quantity
                    </Label>
                    <Input
                      id="min-purchase-qty"
                      type="number"
                      placeholder="kg"
                      className="border-gray-300 focus-visible:ring-[#1D9E75]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="short-desc" className="text-sm font-medium text-gray-700">
                      Short description
                    </Label>
                    <Input
                      id="short-desc"
                      placeholder="Brief product description"
                      className="border-gray-300 focus-visible:ring-[#1D9E75]"
                    />
                  </div>
                </div>

                {/* Image Upload Area */}
                <div className="mt-4">
                  <div className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-[#1D9E75] hover:bg-[#E1F5EE]/30">
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <Upload className="h-8 w-8" />
                      <p className="text-sm font-medium">Drag & drop images</p>
                      <p className="text-xs">or click to browse</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-5" />

                <Button className="bg-[#1D9E75] text-white hover:bg-[#0F6E56]">
                  <Plus className="mr-2 h-4 w-4" />
                  Submit product
                </Button>
              </CardContent>
            </Card>

            {/* Shipping Rate Configuration Card */}
            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-[#1D9E75]" />
                  <CardTitle className="text-lg font-bold text-gray-900">
                    Shipping rate configuration
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-500">
                  Upload a CSV file to configure shipping rates for different regions and weight
                  brackets. The CSV should include columns for destination state, weight range (kg),
                  and rate (₦). Use the template below to ensure the correct format.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Download className="mr-2 h-4 w-4" />
                    Download CSV template
                  </Button>
                  <Button className="bg-[#1D9E75] text-white hover:bg-[#0F6E56]">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload shipping CSV
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
