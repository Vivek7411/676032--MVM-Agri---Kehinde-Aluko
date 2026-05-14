'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  LayoutDashboard,
  Truck,
  FileSpreadsheet,
  Wallet,
  ShieldCheck,
  CircleCheck,
  Upload,
  Download,
  ChevronDown,
  ChevronUp,
  Package,
  ArrowRight,
} from 'lucide-react'
import { useAgrimarketStore } from '@/store/agrimarket-store'
import { useState } from 'react'

const SIDEBAR_ITEMS = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'assigned-orders', label: 'Assigned orders', icon: Truck },
  { key: 'delivery-status', label: 'Delivery status', icon: Package },
  { key: 'shipping-rates', label: 'Shipping rates', icon: FileSpreadsheet },
  { key: 'my-payouts', label: 'My payouts', icon: Wallet },
]

const STATS = [
  { label: 'Assigned orders', value: '9' },
  { label: 'Delivered today', value: '3' },
  { label: 'Pending payout', value: '₦18.4k' },
  { label: 'In transit', value: '6' },
]

const ASSIGNED_ORDERS = [
  {
    orderId: '#ORD-0049',
    buyer: 'Customer C1',
    destination: 'Lagos',
    amount: '₦2,800',
    status: 'In transit' as const,
  },
  {
    orderId: '#ORD-0048',
    buyer: 'Customer C2',
    destination: 'Abuja',
    amount: '₦3,200',
    status: 'Pending pickup' as const,
  },
]

const QUICK_ACTIONS = [
  { key: 'assigned-orders', label: 'View assigned orders', icon: Truck, description: 'See all orders assigned to you' },
  { key: 'delivery-status', label: 'Verify a delivery', icon: ShieldCheck, description: 'Enter collection code to confirm delivery' },
  { key: 'shipping-rates', label: 'Configure shipping rates', icon: FileSpreadsheet, description: 'Upload CSV to set your rates' },
  { key: 'my-payouts', label: 'Check my payouts', icon: Wallet, description: 'View payout history and status' },
]

export function LogisticsDashboardPage() {
  const { logisticsSidebarItem, setLogisticsSidebarItem } = useAgrimarketStore()
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null)

  const toggleTemplate = (key: string) => {
    setExpandedTemplate(expandedTemplate === key ? null : key)
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Wireframe Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2">
        <p className="text-center text-xs text-amber-800 font-medium">
          ⚠️ Wireframe prototype
        </p>
      </div>

      {/* Sidebar */}
      <aside className="w-full border-b border-[#E1F5EE] bg-white md:w-[200px] md:border-b-0 md:border-r md:min-h-screen">
        <div className="p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#0F6E56]">
            Logistics menu
          </p>
          <nav className="flex flex-row gap-1 md:flex-col">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = logisticsSidebarItem === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => setLogisticsSidebarItem(item.key)}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E1F5EE] text-[#0F6E56]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50/50 p-4 md:p-6">

        {/* ── Overview ── */}
        {logisticsSidebarItem === 'overview' && (
          <>
            {/* Stats row */}
            <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {STATS.map((stat) => (
                <Card key={stat.label} className="border-0 shadow-sm">
                  <CardContent className="p-4 md:p-6">
                    <p className="text-xs font-medium text-gray-500 md:text-sm">{stat.label}</p>
                    <p className="mt-1 text-xl font-bold text-[#0F6E56] md:text-2xl">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary */}
            <Card className="mb-6 border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900">
                  Welcome back — Logistics overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  You have <span className="font-semibold text-[#0F6E56]">9 assigned orders</span> with{' '}
                  <span className="font-semibold text-[#0F6E56]">6 in transit</span>.{' '}
                  <span className="font-semibold text-amber-700">₦18,400</span> in pending payouts awaits
                  confirmation. Use the quick actions below to get started.
                </p>
              </CardContent>
            </Card>

            {/* Quick actions */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon
                return (
                  <Card
                    key={action.key}
                    className="cursor-pointer border-0 shadow-sm transition-shadow hover:shadow-md"
                    onClick={() => setLogisticsSidebarItem(action.key)}
                  >
                    <CardContent className="flex items-center gap-4 p-4 md:p-5">
                      <div
                        className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: '#E1F5EE' }}
                      >
                        <Icon className="size-5" style={{ color: '#1D9E75' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{action.label}</p>
                        <p className="text-xs text-gray-500">{action.description}</p>
                      </div>
                      <ArrowRight className="size-4 shrink-0 text-gray-400" />
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        )}

        {/* ── Assigned Orders ── */}
        {logisticsSidebarItem === 'assigned-orders' && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-gray-900">
                Assigned orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 pr-4 font-medium text-gray-500">Order ID / buyer</th>
                      <th className="pb-3 pr-4 font-medium text-gray-500">Destination</th>
                      <th className="pb-3 pr-4 font-medium text-gray-500">Amount</th>
                      <th className="pb-3 font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ASSIGNED_ORDERS.map((order) => (
                      <tr key={order.orderId} className="border-b last:border-0">
                        <td className="py-3 pr-4">
                          <p className="font-medium text-gray-900">{order.orderId}</p>
                          <p className="text-xs text-gray-500">{order.buyer}</p>
                        </td>
                        <td className="py-3 pr-4 text-gray-700">{order.destination}</td>
                        <td className="py-3 pr-4 font-medium text-gray-900">{order.amount}</td>
                        <td className="py-3">
                          <Badge
                            className="border-0 font-medium"
                            style={
                              order.status === 'In transit'
                                ? { backgroundColor: '#E6F1FB', color: '#185FA5' }
                                : { backgroundColor: '#FEF3C7', color: '#92400E' }
                            }
                          >
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

        {/* ── Delivery Status ── */}
        {logisticsSidebarItem === 'delivery-status' && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-[#1D9E75]" />
                <CardTitle className="text-base font-semibold text-gray-900">
                  Verify delivery — collection code
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-500">
                Ask the customer for their collection code to confirm delivery. Enter the code below to mark the order as delivered.
              </p>

              <div className="space-y-3">
                <div>
                  <Label className="mb-1.5 text-gray-700">Order ID</Label>
                  <Input value="#ORD-0049" readOnly className="bg-gray-50" />
                </div>
                <div>
                  <Label className="mb-1.5 text-gray-700">Collection code</Label>
                  <div className="flex gap-2">
                    <Input defaultValue="AGRI4F7K92" className="flex-1" />
                    <Button className="shrink-0 bg-[#1D9E75] text-white hover:bg-[#0F6E56]">
                      Verify & deliver
                    </Button>
                  </div>
                </div>
              </div>

              {/* Success message */}
              <div
                className="mt-4 flex items-center gap-2.5 rounded-lg border p-3"
                style={{ backgroundColor: '#E1F5EE', borderColor: '#5DCAA5' }}
              >
                <CircleCheck className="size-5 shrink-0" style={{ color: '#5DCAA5' }} />
                <p className="text-sm font-medium" style={{ color: '#0F6E56' }}>
                  Code verified — order #ORD-0049 marked as delivered
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Shipping Rates ── */}
        {logisticsSidebarItem === 'shipping-rates' && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="size-5 text-[#1D9E75]" />
                <CardTitle className="text-base font-semibold text-gray-900">
                  Shipping rate configuration
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-500">
                Upload a CSV file to set your shipping rates based on destination. Your coverage areas will be automatically determined from the destinations in your CSV.
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
                    {expandedTemplate === 'weight' ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                  </button>
                  {expandedTemplate === 'weight' && (
                    <div className="border-t border-gray-200 p-3 bg-gray-50">
                      <pre className="text-xs text-gray-600 overflow-x-auto">{`destination_state,weight_min_kg,weight_max_kg,rate_naira
Lagos,0,50,1500
Lagos,50,200,2800
Lagos,200,1000,4500
Abuja,0,50,2000
Abuja,50,200,3500
Kano,0,50,1800`}</pre>
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
                    {expandedTemplate === 'price' ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                  </button>
                  {expandedTemplate === 'price' && (
                    <div className="border-t border-gray-200 p-3 bg-gray-50">
                      <pre className="text-xs text-gray-600 overflow-x-auto">{`destination_state,order_value_min,order_value_max,rate_naira
Lagos,0,50000,1500
Lagos,50000,200000,2500
Lagos,200000,1000000,4000
Abuja,0,50000,2000
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
                    {expandedTemplate === 'items' ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                  </button>
                  {expandedTemplate === 'items' && (
                    <div className="border-t border-gray-200 p-3 bg-gray-50">
                      <pre className="text-xs text-gray-600 overflow-x-auto">{`destination_state,items_min,items_max,rate_naira
Lagos,1,5,1200
Lagos,6,20,2000
Lagos,21,100,3500
Abuja,1,5,1500
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

        {/* ── My Payouts ── */}
        {logisticsSidebarItem === 'my-payouts' && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Wallet className="size-5 text-[#1D9E75]" />
                <CardTitle className="text-base font-semibold text-gray-900">
                  My payouts
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-3">
                Payouts are generated when an order you delivered is confirmed. The admin will mark your payout as paid.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 pr-4 font-medium text-gray-500">Order</th>
                      <th className="pb-3 pr-4 font-medium text-gray-500">Amount</th>
                      <th className="pb-3 font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b last:border-0">
                      <td className="py-3 pr-4 font-medium text-gray-900">#ORD-0049</td>
                      <td className="py-3 pr-4 text-gray-900">₦2,800</td>
                      <td className="py-3">
                        <Badge className="border-0 font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>Pending</Badge>
                      </td>
                    </tr>
                    <tr className="border-b last:border-0">
                      <td className="py-3 pr-4 font-medium text-gray-900">#ORD-0042</td>
                      <td className="py-3 pr-4 text-gray-900">₦2,800</td>
                      <td className="py-3">
                        <Badge className="border-0 font-medium" style={{ backgroundColor: '#E1F5EE', color: '#0F6E56' }}>Paid</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

      </main>
    </div>
  )
}
