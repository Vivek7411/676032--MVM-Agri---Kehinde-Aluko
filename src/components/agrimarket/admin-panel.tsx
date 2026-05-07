'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  UserCheck,
  Truck,
  Package,
  Percent,
  Wallet,
  Settings,
  Users,
  DollarSign,
  TrendingUp,
  X,
  Menu,
} from 'lucide-react'
import { useAgrimarketStore } from '@/store/agrimarket-store'
import { useState } from 'react'
import { useHydrated } from '@/hooks/use-hydrated'

const SIDEBAR_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'seller-approvals', label: 'Seller approvals', icon: UserCheck },
  { key: 'logistics-approvals', label: 'Logistics approvals', icon: Truck },
  { key: 'product-approvals', label: 'Product approvals', icon: Package },
  { key: 'commission-settings', label: 'Commission settings', icon: Percent },
  { key: 'payout-management', label: 'Payout management', icon: Wallet },
  { key: 'platform-settings', label: 'Platform settings', icon: Settings },
]

const STATS = [
  { label: 'Pending sellers', value: '7', icon: Users, color: '#1D9E75' },
  { label: 'Pending products', value: '14', icon: Package, color: '#1D9E75' },
  { label: 'Pending payouts', value: '₦2.1M', icon: DollarSign, color: '#1D9E75' },
  { label: 'Active logistics', value: '5', icon: TrendingUp, color: '#1D9E75' },
]

export function AdminPanelPage() {
  const adminSidebarItem = useAgrimarketStore((s) => s.adminSidebarItem)
  const setAdminSidebarItem = useAgrimarketStore((s) => s.setAdminSidebarItem)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [productReviewMode, setProductReviewMode] = useState<'manual' | 'auto'>('manual')
  const [commissionDefault, setCommissionDefault] = useState('10')
  const [commissionOverrideSeller, setCommissionOverrideSeller] = useState('')
  const hydrated = useHydrated()

  const activeItem = adminSidebarItem || 'dashboard'

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile menu toggle — only render after mount to avoid hydration mismatch */}
      {hydrated && (
        <button
          className="fixed top-4 left-4 z-50 rounded-lg bg-[#1D9E75] p-2 text-white shadow-lg md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      )}

      {/* Sidebar overlay for mobile */}
      {hydrated && mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-[200px] shrink-0 border-r border-gray-200 bg-white transition-transform duration-200 md:static md:translate-x-0 ${
          hydrated && mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Admin menu
          </p>
          <nav className="flex flex-col gap-1">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setAdminSidebarItem(item.key)
                    setMobileMenuOpen(false)
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
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
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
          {/* Stats Row */}
          <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="border border-gray-200">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: '#E1F5EE' }}
                    >
                      <Icon className="h-5 w-5" style={{ color: '#1D9E75' }} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Seller Approvals */}
          <Card className="mb-6 border border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-900">
                <UserCheck className="h-5 w-5" style={{ color: '#1D9E75' }} />
                Seller approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-left">
                      <th className="pb-2 pr-4 font-medium text-gray-500">Seller name</th>
                      <th className="pb-2 pr-4 font-medium text-gray-500">Type</th>
                      <th className="pb-2 pr-4 font-medium text-gray-500">Registered</th>
                      <th className="pb-2 font-medium text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-50">
                      <td className="py-3 pr-4 font-medium text-gray-900">Aminu Farms Ltd.</td>
                      <td className="py-3 pr-4">
                        <Badge
                          className="border-0 text-xs font-medium"
                          style={{ backgroundColor: '#E6F1FB', color: '#185FA5' }}
                        >
                          Farmer
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 text-gray-500">2 days ago</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="h-7 bg-[#1D9E75] text-xs text-white hover:bg-[#0F6E56]"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 border-red-200 text-xs text-red-700 hover:bg-red-50"
                          >
                            Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-gray-900">Delta Agro Co.</td>
                      <td className="py-3 pr-4">
                        <Badge
                          className="border-0 text-xs font-medium"
                          style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
                        >
                          Aggregator
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 text-gray-500">3 days ago</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="h-7 bg-[#1D9E75] text-xs text-white hover:bg-[#0F6E56]"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 border-red-200 text-xs text-red-700 hover:bg-red-50"
                          >
                            Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Product Approvals */}
          <Card className="mb-6 border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-900">
                  <Package className="h-5 w-5" style={{ color: '#1D9E75' }} />
                  Product approvals
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className={`h-8 text-xs ${
                      productReviewMode === 'manual'
                        ? 'bg-[#1D9E75] text-white hover:bg-[#0F6E56]'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                    variant={productReviewMode === 'manual' ? 'default' : 'outline'}
                    onClick={() => setProductReviewMode('manual')}
                  >
                    Manual review
                  </Button>
                  <Button
                    size="sm"
                    className={`h-8 text-xs ${
                      productReviewMode === 'auto'
                        ? 'bg-[#1D9E75] text-white hover:bg-[#0F6E56]'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                    variant={productReviewMode === 'auto' ? 'default' : 'outline'}
                    onClick={() => setProductReviewMode('auto')}
                  >
                    Auto-publish
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-left">
                      <th className="pb-2 pr-4 font-medium text-gray-500">Product</th>
                      <th className="pb-2 pr-4 font-medium text-gray-500">Seller</th>
                      <th className="pb-2 pr-4 font-medium text-gray-500">Status</th>
                      <th className="pb-2 pr-4 font-medium text-gray-500">Quantity</th>
                      <th className="pb-2 font-medium text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-gray-900">Sesame Seeds</td>
                      <td className="py-3 pr-4 text-gray-500">Seller A</td>
                      <td className="py-3 pr-4">
                        <Badge
                          className="border-0 text-xs font-medium"
                          style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
                        >
                          Pending
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 text-gray-500">220kg</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="h-7 bg-[#1D9E75] text-xs text-white hover:bg-[#0F6E56]"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 border-red-200 text-xs text-red-700 hover:bg-red-50"
                          >
                            Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Commission Settings */}
          <Card className="mb-6 border border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-900">
                <Percent className="h-5 w-5" style={{ color: '#1D9E75' }} />
                Commission settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Default commission
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={commissionDefault}
                      onChange={(e) => setCommissionDefault(e.target.value)}
                      className="pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                      %
                    </span>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Per-seller override
                  </label>
                  <Select
                    value={commissionOverrideSeller}
                    onValueChange={setCommissionOverrideSeller}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select seller" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seller-a">Seller A</SelectItem>
                      <SelectItem value="seller-b">Seller B</SelectItem>
                      <SelectItem value="aminu-farms">Aminu Farms Ltd.</SelectItem>
                      <SelectItem value="delta-agro">Delta Agro Co.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="my-5" />

              <div>
                <p className="mb-3 text-sm font-medium text-gray-700">Payout calculation example</p>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Order total</span>
                    <span className="font-semibold text-gray-900">₦100</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-gray-600">Admin commission ({commissionDefault}%)</span>
                    <span className="font-semibold text-gray-900">
                      ₦{((100 * Number(commissionDefault)) / 100).toFixed(0)}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium" style={{ color: '#0F6E56' }}>
                      Seller payout
                    </span>
                    <span className="text-lg font-bold" style={{ color: '#1D9E75' }}>
                      ₦{(100 - (100 * Number(commissionDefault)) / 100).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payout Management */}
          <Card className="mb-6 border border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-900">
                <Wallet className="h-5 w-5" style={{ color: '#1D9E75' }} />
                Payout management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-left">
                      <th className="pb-2 pr-4 font-medium text-gray-500">Seller</th>
                      <th className="pb-2 pr-4 font-medium text-gray-500">Amount</th>
                      <th className="pb-2 pr-4 font-medium text-gray-500">Status</th>
                      <th className="pb-2 font-medium text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-50">
                      <td className="py-3 pr-4 font-medium text-gray-900">Seller A</td>
                      <td className="py-3 pr-4 text-gray-900">₦90,000</td>
                      <td className="py-3 pr-4">
                        <Badge
                          className="border-0 text-xs font-medium"
                          style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
                        >
                          Pending
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Button
                          size="sm"
                          className="h-7 bg-[#1D9E75] text-xs text-white hover:bg-[#0F6E56]"
                        >
                          Mark paid
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-50">
                      <td className="py-3 pr-4 font-medium text-gray-900">FastLogix NG</td>
                      <td className="py-3 pr-4 text-gray-900">₦2,800</td>
                      <td className="py-3 pr-4">
                        <Badge
                          className="border-0 text-xs font-medium"
                          style={{ backgroundColor: '#E6F1FB', color: '#185FA5' }}
                        >
                          Delivered ✓
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Button
                          size="sm"
                          className="h-7 bg-[#1D9E75] text-xs text-white hover:bg-[#0F6E56]"
                        >
                          Mark paid
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-gray-900">Seller B</td>
                      <td className="py-3 pr-4 text-gray-900">₦132,000</td>
                      <td className="py-3 pr-4">
                        <Badge
                          className="border-0 text-xs font-medium"
                          style={{ backgroundColor: '#E1F5EE', color: '#0F6E56' }}
                        >
                          Paid
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs text-gray-700"
                        >
                          View record
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
