'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
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
  FileSpreadsheet,
  MapPin,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Clock,
  CheckCircle2,
  CircleDot,
  Banknote,
  TrendingUp,
} from 'lucide-react'
import { useAgrimarketStore, CATEGORIES, LOCATIONS } from '@/store/agrimarket-store'
import { useState } from 'react'

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
  { label: 'Stock weight', value: '1,420 kg', icon: Wheat },
] as const

const PRODUCTS_TABLE = [
  { name: 'Premium Wheat', stock: '100 kg', minQty: '50 kg', unit: 'kg', status: 'Live' },
  { name: 'Yellow Corn', stock: '400 kg', minQty: '100 kg', unit: 'kg', status: 'Live' },
  { name: 'Sesame Seeds', stock: '220 kg', minQty: '25 kg', unit: 'kg', status: 'Pending approval' },
  { name: 'NPK Fertilizer', stock: '10 MT', minQty: '1 MT', unit: 'metric-tonne', status: 'Live' },
] as const

const SAMPLE_ORDERS = [
  { id: 'ORD-1042', buyer: 'Lagos Fresh Markets', product: 'Premium Wheat', weight: '50 kg', total: '₦62,500', status: 'Processing', date: '2025-02-28' },
  { id: 'ORD-1039', buyer: 'Abuja Grains Hub', product: 'Yellow Corn', weight: '200 kg', total: '₦110,000', status: 'Shipped', date: '2025-02-26' },
  { id: 'ORD-1035', buyer: 'Kano Agro Processing', product: 'Sesame Seeds', weight: '100 kg', total: '₦280,000', status: 'Delivered', date: '2025-02-22' },
  { id: 'ORD-1030', buyer: 'Port Harcourt Foods', product: 'NPK Fertilizer', weight: '2 MT', total: '₦360,000', status: 'Pending', date: '2025-02-20' },
  { id: 'ORD-1028', buyer: 'Ibadan Co-op Ltd.', product: 'Premium Wheat', weight: '75 kg', total: '₦93,750', status: 'Delivered', date: '2025-02-18' },
] as const

const SAMPLE_PAYOUTS = [
  { id: 'PAY-208', amount: '₦62,500', order: 'ORD-1042', method: 'Bank Transfer', status: 'Pending', date: '2025-03-01' },
  { id: 'PAY-207', amount: '₦110,000', order: 'ORD-1039', method: 'Bank Transfer', status: 'Processing', date: '2025-02-27' },
  { id: 'PAY-206', amount: '₦280,000', order: 'ORD-1035', method: 'Bank Transfer', status: 'Paid', date: '2025-02-24' },
  { id: 'PAY-205', amount: '₦360,000', order: 'ORD-1030', method: 'Bank Transfer', status: 'Pending', date: '2025-02-21' },
  { id: 'PAY-204', amount: '₦93,750', order: 'ORD-1028', method: 'Bank Transfer', status: 'Paid', date: '2025-02-19' },
] as const

export function SellerDashboardPage() {
  const sellerSidebarItem = useAgrimarketStore((s) => s.sellerSidebarItem)
  const setSellerSidebarItem = useAgrimarketStore((s) => s.setSellerSidebarItem)
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null)

  const toggleTemplate = (key: string) => {
    setExpandedTemplate(expandedTemplate === key ? null : key)
  }

  const orderStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'border-green-300 bg-green-50 text-green-700 hover:bg-green-100'
      case 'Shipped': return 'border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100'
      case 'Processing': return 'border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100'
      case 'Pending': return 'border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100'
      default: return 'border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100'
    }
  }

  const orderStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle2 className="h-3.5 w-3.5" />
      case 'Shipped': return <Truck className="h-3.5 w-3.5" />
      case 'Processing': return <Clock className="h-3.5 w-3.5" />
      case 'Pending': return <CircleDot className="h-3.5 w-3.5" />
      default: return <CircleDot className="h-3.5 w-3.5" />
    }
  }

  const payoutStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'border-green-300 bg-green-50 text-green-700 hover:bg-green-100'
      case 'Processing': return 'border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100'
      case 'Pending': return 'border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100'
      default: return 'border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Wireframe Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2">
        <p className="text-center text-xs text-amber-800 font-medium">
          ⚠️ Wireframe prototype — final implementation may vary
        </p>
      </div>

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

            {/* ===== OVERVIEW ===== */}
            {sellerSidebarItem === 'overview' && (
              <>
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

                {/* Quick Actions / Summary Card */}
                <Card className="border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <LayoutDashboard className="h-5 w-5 text-[#1D9E75]" />
                      <CardTitle className="text-lg font-bold text-gray-900">Quick actions</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                      Welcome back, Aminu Farms Ltd. Here&apos;s a snapshot of your store.
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      <button
                        onClick={() => setSellerSidebarItem('my-products')}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-4 text-left transition-colors hover:border-[#1D9E75] hover:bg-[#E1F5EE]/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E1F5EE]">
                            <Package className="h-4 w-4 text-[#0F6E56]" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">My products</p>
                            <p className="text-xs text-gray-500">12 active listings</p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => setSellerSidebarItem('add-product')}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-4 text-left transition-colors hover:border-[#1D9E75] hover:bg-[#E1F5EE]/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E1F5EE]">
                            <Plus className="h-4 w-4 text-[#0F6E56]" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Add product</p>
                            <p className="text-xs text-gray-500">List a new product</p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => setSellerSidebarItem('orders')}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-4 text-left transition-colors hover:border-[#1D9E75] hover:bg-[#E1F5EE]/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E1F5EE]">
                            <ShoppingBag className="h-4 w-4 text-[#0F6E56]" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Orders</p>
                            <p className="text-xs text-gray-500">2 pending</p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => setSellerSidebarItem('shipping')}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-4 text-left transition-colors hover:border-[#1D9E75] hover:bg-[#E1F5EE]/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E1F5EE]">
                            <Truck className="h-4 w-4 text-[#0F6E56]" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Shipping rates</p>
                            <p className="text-xs text-gray-500">Configure CSV rates</p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => setSellerSidebarItem('payouts')}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-4 text-left transition-colors hover:border-[#1D9E75] hover:bg-[#E1F5EE]/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E1F5EE]">
                            <Wallet className="h-4 w-4 text-[#0F6E56]" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Payouts</p>
                            <p className="text-xs text-gray-500">₦184k pending</p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => setSellerSidebarItem('profile')}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-4 text-left transition-colors hover:border-[#1D9E75] hover:bg-[#E1F5EE]/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E1F5EE]">
                            <User className="h-4 w-4 text-[#0F6E56]" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Profile</p>
                            <p className="text-xs text-gray-500">Update your info</p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Orders Summary */}
                <Card className="border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-[#1D9E75]" />
                        <CardTitle className="text-lg font-bold text-gray-900">Recent orders</CardTitle>
                      </div>
                      <button
                        onClick={() => setSellerSidebarItem('orders')}
                        className="text-sm font-medium text-[#1D9E75] hover:text-[#0F6E56] transition-colors"
                      >
                        View all →
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {SAMPLE_ORDERS.slice(0, 3).map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 p-3"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">{order.product}</p>
                            <p className="text-xs text-gray-500">{order.buyer} · {order.weight}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-3">
                            <span className="text-sm font-semibold text-gray-900">{order.total}</span>
                            <Badge className={`text-xs ${orderStatusColor(order.status)}`}>
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* ===== MY PRODUCTS ===== */}
            {sellerSidebarItem === 'my-products' && (
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
                          <th className="pb-3 pr-4">Stock weight</th>
                          <th className="pb-3 pr-4">Min weight</th>
                          <th className="pb-3 pr-4">Unit</th>
                          <th className="pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {PRODUCTS_TABLE.map((product) => (
                          <tr key={product.name} className="border-b last:border-0">
                            <td className="py-3 pr-4 font-medium text-gray-900">{product.name}</td>
                            <td className="py-3 pr-4 text-gray-600">{product.stock}</td>
                            <td className="py-3 pr-4 text-gray-600">{product.minQty}</td>
                            <td className="py-3 pr-4 text-gray-600">{product.unit === 'metric-tonne' ? 'MT' : 'kg'}</td>
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
            )}

            {/* ===== ADD PRODUCT ===== */}
            {sellerSidebarItem === 'add-product' && (
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
                          {CATEGORIES.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                          className="flex-1 border-gray-300 focus-visible:ring-[#1D9E75]"
                        />
                        <Select>
                          <SelectTrigger className="w-[150px] border-gray-300">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">kg</SelectItem>
                            <SelectItem value="metric-tonne">Metric tonne (MT)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="min-weight" className="text-sm font-medium text-gray-700">
                        Min order weight
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="min-weight"
                          type="number"
                          placeholder="0"
                          className="flex-1 border-gray-300 focus-visible:ring-[#1D9E75]"
                        />
                        <Select>
                          <SelectTrigger className="w-[150px] border-gray-300">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">kg</SelectItem>
                            <SelectItem value="metric-tonne">Metric tonne (MT)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="short-desc" className="text-sm font-medium text-gray-700">
                        Description
                      </Label>
                      <Textarea
                        id="short-desc"
                        placeholder="Brief product description"
                        className="border-gray-300 focus-visible:ring-[#1D9E75] min-h-[40px]"
                      />
                    </div>
                  </div>

                  {/* Image Upload Area */}
                  <div className="mt-4">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Product images</Label>
                    <div className="flex h-28 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-[#1D9E75] hover:bg-[#E1F5EE]/30">
                      <div className="flex flex-col items-center gap-1.5 text-gray-400">
                        <Upload className="h-6 w-6" />
                        <p className="text-sm font-medium">Drag & drop images</p>
                        <p className="text-xs">or click to browse</p>
                      </div>
                    </div>
                  </div>

                  {/* Document Upload */}
                  <div className="mt-4">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Product documents</Label>
                    <p className="text-xs text-gray-400 mb-2">Upload certificates, lab results, or quality reports (optional)</p>
                    <div className="flex h-20 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-[#1D9E75] hover:bg-[#E1F5EE]/30">
                      <div className="flex flex-col items-center gap-1 text-gray-400">
                        <Upload className="h-5 w-5" />
                        <p className="text-xs font-medium">Upload documents</p>
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
            )}

            {/* ===== ORDERS ===== */}
            {sellerSidebarItem === 'orders' && (
              <Card className="border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-[#1D9E75]" />
                    <CardTitle className="text-lg font-bold text-gray-900">Orders</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    Manage and track all incoming orders from buyers across Nigeria.
                  </p>

                  {/* Order Summary Mini-Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-5 sm:grid-cols-4">
                    <div className="rounded-lg bg-gray-50 p-3 text-center">
                      <p className="text-lg font-bold text-gray-900">38</p>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                    <div className="rounded-lg bg-amber-50 p-3 text-center">
                      <p className="text-lg font-bold text-amber-700">2</p>
                      <p className="text-xs text-amber-600">Pending</p>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-3 text-center">
                      <p className="text-lg font-bold text-blue-700">1</p>
                      <p className="text-xs text-blue-600">Processing</p>
                    </div>
                    <div className="rounded-lg bg-green-50 p-3 text-center">
                      <p className="text-lg font-bold text-green-700">2</p>
                      <p className="text-xs text-green-600">Delivered</p>
                    </div>
                  </div>

                  {/* Orders Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                          <th className="pb-3 pr-4">Order ID</th>
                          <th className="pb-3 pr-4">Buyer</th>
                          <th className="pb-3 pr-4">Product</th>
                          <th className="pb-3 pr-4">Weight</th>
                          <th className="pb-3 pr-4">Total</th>
                          <th className="pb-3 pr-4">Date</th>
                          <th className="pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SAMPLE_ORDERS.map((order) => (
                          <tr key={order.id} className="border-b last:border-0">
                            <td className="py-3 pr-4 font-medium text-[#0F6E56]">{order.id}</td>
                            <td className="py-3 pr-4 text-gray-600">{order.buyer}</td>
                            <td className="py-3 pr-4 text-gray-900 font-medium">{order.product}</td>
                            <td className="py-3 pr-4 text-gray-600">{order.weight}</td>
                            <td className="py-3 pr-4 font-semibold text-gray-900">{order.total}</td>
                            <td className="py-3 pr-4 text-gray-500">{order.date}</td>
                            <td className="py-3">
                              <Badge className={`gap-1 ${orderStatusColor(order.status)}`}>
                                {orderStatusIcon(order.status)}
                                {order.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ===== SHIPPING RATES ===== */}
            {sellerSidebarItem === 'shipping' && (
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
                    Upload a CSV file to configure shipping rates for different destinations. The rates you set here will automatically show your available regions to buyers.
                  </p>

                  {/* Sample CSV Templates */}
                  <div className="mb-5 space-y-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sample CSV templates</p>

                    {/* Weight vs Destination */}
                    <div className="rounded-lg border border-gray-200">
                      <button
                        onClick={() => toggleTemplate('weight')}
                        className="flex w-full items-center justify-between p-3 text-left"
                      >
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-4 w-4 text-[#1D9E75]" />
                          <span className="text-sm font-medium text-gray-700">Weight v. Destination</span>
                        </div>
                        {expandedTemplate === 'weight' ? (
                          <ChevronUp className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                      {expandedTemplate === 'weight' && (
                        <div className="border-t border-gray-200 p-3 bg-gray-50">
                          <pre className="text-xs text-gray-600 overflow-x-auto">{`destination_state,weight_min_kg,weight_max_kg,rate_naira
Lagos,0,50,1500
Lagos,50,200,2800
Lagos,200,1000,4500
Abuja,0,50,2000
Abuja,50,200,3500
Kano,0,50,1800
Kano,50,200,3200`}</pre>
                          <Button variant="outline" size="sm" className="mt-2 text-xs border-gray-300">
                            <Download className="mr-1 h-3 w-3" />
                            Download template
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Price vs Destination */}
                    <div className="rounded-lg border border-gray-200">
                      <button
                        onClick={() => toggleTemplate('price')}
                        className="flex w-full items-center justify-between p-3 text-left"
                      >
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-4 w-4 text-[#1D9E75]" />
                          <span className="text-sm font-medium text-gray-700">Price v. Destination</span>
                        </div>
                        {expandedTemplate === 'price' ? (
                          <ChevronUp className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                      {expandedTemplate === 'price' && (
                        <div className="border-t border-gray-200 p-3 bg-gray-50">
                          <pre className="text-xs text-gray-600 overflow-x-auto">{`destination_state,order_value_min,order_value_max,rate_naira
Lagos,0,50000,1500
Lagos,50000,200000,2500
Lagos,200000,1000000,4000
Abuja,0,50000,2000
Abuja,50000,200000,3200
Kano,0,50000,1800`}</pre>
                          <Button variant="outline" size="sm" className="mt-2 text-xs border-gray-300">
                            <Download className="mr-1 h-3 w-3" />
                            Download template
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Number of Items vs Destination */}
                    <div className="rounded-lg border border-gray-200">
                      <button
                        onClick={() => toggleTemplate('items')}
                        className="flex w-full items-center justify-between p-3 text-left"
                      >
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-4 w-4 text-[#1D9E75]" />
                          <span className="text-sm font-medium text-gray-700">Number of Items v. Destination</span>
                        </div>
                        {expandedTemplate === 'items' ? (
                          <ChevronUp className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                      {expandedTemplate === 'items' && (
                        <div className="border-t border-gray-200 p-3 bg-gray-50">
                          <pre className="text-xs text-gray-600 overflow-x-auto">{`destination_state,items_min,items_max,rate_naira
Lagos,1,5,1200
Lagos,6,20,2000
Lagos,21,100,3500
Abuja,1,5,1500
Abuja,6,20,2500
Kano,1,5,1400`}</pre>
                          <Button variant="outline" size="sm" className="mt-2 text-xs border-gray-300">
                            <Download className="mr-1 h-3 w-3" />
                            Download template
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-[#1D9E75] text-white hover:bg-[#0F6E56]">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload shipping CSV
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ===== PAYOUTS ===== */}
            {sellerSidebarItem === 'payouts' && (
              <>
                {/* Payout Summary Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-4 rounded-xl bg-[#E1F5EE] p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1D9E75]/20">
                      <Banknote className="h-5 w-5 text-[#0F6E56]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#0F6E56] font-medium">Total earned</p>
                      <p className="text-xl font-bold text-[#0F6E56]">₦1,245,000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-xl bg-amber-50 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100">
                      <Clock className="h-5 w-5 text-amber-700" />
                    </div>
                    <div>
                      <p className="text-xs text-amber-700 font-medium">Pending payouts</p>
                      <p className="text-xl font-bold text-amber-800">₦184,000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-xl bg-green-50 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
                      <TrendingUp className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <p className="text-xs text-green-700 font-medium">Last payout</p>
                      <p className="text-xl font-bold text-green-800">₦280,000</p>
                    </div>
                  </div>
                </div>

                {/* Payouts Table */}
                <Card className="border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-[#1D9E75]" />
                      <CardTitle className="text-lg font-bold text-gray-900">Payout history</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                      Payouts are processed after delivery confirmation. Bank transfers typically arrive within 1–3 business days.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                            <th className="pb-3 pr-4">Payout ID</th>
                            <th className="pb-3 pr-4">Order</th>
                            <th className="pb-3 pr-4">Amount</th>
                            <th className="pb-3 pr-4">Method</th>
                            <th className="pb-3 pr-4">Date</th>
                            <th className="pb-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {SAMPLE_PAYOUTS.map((payout) => (
                            <tr key={payout.id} className="border-b last:border-0">
                              <td className="py-3 pr-4 font-medium text-[#0F6E56]">{payout.id}</td>
                              <td className="py-3 pr-4 text-gray-600">{payout.order}</td>
                              <td className="py-3 pr-4 font-semibold text-gray-900">{payout.amount}</td>
                              <td className="py-3 pr-4 text-gray-600">{payout.method}</td>
                              <td className="py-3 pr-4 text-gray-500">{payout.date}</td>
                              <td className="py-3">
                                <Badge className={payoutStatusColor(payout.status)}>
                                  {payout.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400">
                        Showing 5 of 38 payouts
                      </p>
                      <Button variant="outline" size="sm" className="text-xs border-gray-300">
                        Export payouts CSV
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* ===== PROFILE ===== */}
            {sellerSidebarItem === 'profile' && (
              <Card className="border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-[#1D9E75]" />
                    <CardTitle className="text-lg font-bold text-gray-900">Profile & Location</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    Your location is synced to all your products and helps buyers filter by area.
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="business-name" className="text-sm font-medium text-gray-700">
                        Business name
                      </Label>
                      <Input
                        id="business-name"
                        defaultValue="Aminu Farms Ltd."
                        className="border-gray-300 focus-visible:ring-[#1D9E75]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="aminu@farms.com"
                        className="border-gray-300 focus-visible:ring-[#1D9E75]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                        State
                      </Label>
                      <Select defaultValue="Kano">
                        <SelectTrigger className="w-full border-gray-300 focus:ring-[#1D9E75]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {LOCATIONS.map((loc) => (
                            <SelectItem key={loc.state} value={loc.state}>{loc.state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                        City
                      </Label>
                      <Select defaultValue="Kano City">
                        <SelectTrigger className="w-full border-gray-300 focus:ring-[#1D9E75]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Kano City">Kano City</SelectItem>
                          <SelectItem value="Fagge">Fagge</SelectItem>
                          <SelectItem value="Dala">Dala</SelectItem>
                          <SelectItem value="Gwale">Gwale</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <Button className="bg-[#1D9E75] text-white hover:bg-[#0F6E56]">
                    Save profile
                  </Button>
                </CardContent>
              </Card>
            )}

          </main>
        </div>
      </div>
    </div>
  )
}
