'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  LayoutDashboard,
  Truck,
  MapPin,
  FileSpreadsheet,
  Wallet,
  ShieldCheck,
  CircleCheck,
} from 'lucide-react'
import { useAgrimarketStore } from '@/store/agrimarket-store'

const SIDEBAR_ITEMS = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'assigned-orders', label: 'Assigned orders', icon: Truck },
  { key: 'delivery-tracking', label: 'Delivery tracking', icon: MapPin },
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

export function LogisticsDashboardPage() {
  const { logisticsSidebarItem, setLogisticsSidebarItem } = useAgrimarketStore()

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
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

        {/* Assigned orders card */}
        <Card className="mb-6 border-0 shadow-sm">
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

        {/* Verify delivery card */}
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
              Ask the customer for their collection code to confirm delivery of their order. Enter
              the code below to verify and mark the order as delivered.
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
                  <Button
                    className="shrink-0 bg-[#1D9E75] text-white hover:bg-[#0F6E56]"
                  >
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
      </main>
    </div>
  )
}
