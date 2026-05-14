'use client'

import { useState } from 'react'
import {
  UserPlus,
  Store,
  Truck,
  GitBranch,
  ChevronRight,
  Check,
  Upload,
  FileText,
  MapPin,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LOCATIONS } from '@/store/agrimarket-store'

type SellerType = 'farmer' | 'aggregator' | 'input-supplier'

export function RegistrationPage() {
  const [sellerType, setSellerType] = useState<SellerType>('farmer')
  const [sellerState, setSellerState] = useState('')
  const [logisticsState, setLogisticsState] = useState('')

  // Get cities for selected state
  const sellerCities = LOCATIONS.find((l) => l.state === sellerState)?.cities ?? []
  const logisticsCities = LOCATIONS.find((l) => l.state === logisticsState)?.cities ?? []

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
      {/* Wireframe Disclaimer */}
      <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5">
        <p className="text-center text-xs text-amber-800 font-medium">
          ⚠️ This is a wireframe prototype for demonstration purposes only. The final implementation may vary in design and functionality.
        </p>
      </div>

      <div className="mx-auto max-w-7xl space-y-8">
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Registration
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Choose your role and create an account on AgriMarket Nigeria
          </p>
        </div>

        {/* Registration Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* Buyer Registration */}
          <Card className="border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="space-y-3 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E1F5EE]">
                <UserPlus className="h-5 w-5 text-[#1D9E75]" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Buyer Registration
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Create an account to start purchasing agricultural products
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="buyer-name" className="text-sm font-medium text-gray-700">Full name</Label>
                <Input id="buyer-name" placeholder="Enter your full name" className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyer-email" className="text-sm font-medium text-gray-700">Email</Label>
                <Input id="buyer-email" type="email" placeholder="you@example.com" className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyer-phone" className="text-sm font-medium text-gray-700">Phone</Label>
                <div className="flex">
                  <div className="flex h-10 items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">+234</div>
                  <Input id="buyer-phone" type="tel" placeholder="8012345678" className="h-10 rounded-l-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyer-password" className="text-sm font-medium text-gray-700">Password</Label>
                <Input id="buyer-password" type="password" placeholder="Create a password" className="h-10" />
              </div>
              <Button className="h-10 w-full bg-[#1D9E75] text-white hover:bg-[#0F6E56]">
                Create account
              </Button>
            </CardContent>
          </Card>

          {/* Seller Registration */}
          <Card className="border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="space-y-3 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E1F5EE]">
                <Store className="h-5 w-5 text-[#1D9E75]" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Seller Registration
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Register to list and sell agricultural products
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seller-business" className="text-sm font-medium text-gray-700">Business name</Label>
                <Input id="seller-business" placeholder="Enter your business name" className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seller-email" className="text-sm font-medium text-gray-700">Email</Label>
                <Input id="seller-email" type="email" placeholder="you@example.com" className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seller-phone" className="text-sm font-medium text-gray-700">Phone</Label>
                <div className="flex">
                  <div className="flex h-10 items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">+234</div>
                  <Input id="seller-phone" type="tel" placeholder="8012345678" className="h-10 rounded-l-none" />
                </div>
              </div>

              {/* Seller Type Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Seller type</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(['farmer', 'aggregator', 'input-supplier'] as SellerType[]).map((type) => {
                    const labels: Record<SellerType, string> = {
                      'farmer': 'Farmer',
                      'aggregator': 'Aggregator',
                      'input-supplier': 'Input Supplier',
                    }
                    const descriptions: Record<SellerType, string> = {
                      'farmer': 'Grows produce',
                      'aggregator': 'Buys & resells',
                      'input-supplier': 'Fertilizers, seeds',
                    }
                    return (
                      <button
                        key={type}
                        onClick={() => setSellerType(type)}
                        className={`flex flex-col items-center gap-1 rounded-lg border-2 p-3 transition-colors text-center ${
                          sellerType === type
                            ? 'border-[#1D9E75] bg-[#E1F5EE]/50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                          sellerType === type ? 'border-[#1D9E75] bg-[#1D9E75]' : 'border-gray-300 bg-white'
                        }`}>
                          {sellerType === type && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
                        </div>
                        <span className={`text-xs font-medium ${sellerType === type ? 'text-[#0F6E56]' : 'text-gray-600'}`}>
                          {labels[type]}
                        </span>
                        <span className="text-[10px] text-gray-400">{descriptions[type]}</span>
                      </button>
                    )
                  })}
                </div>
                <p className="text-xs text-muted-foreground">
                  This is for records only — all seller types have identical features.
                </p>
              </div>

              {/* Location - State and City */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  Business location
                </Label>
                <p className="text-xs text-muted-foreground">Your location is synced to all your products for buyer filtration.</p>
                <div className="grid grid-cols-2 gap-2">
                  <Select value={sellerState} onValueChange={setSellerState}>
                    <SelectTrigger className="h-10 border-gray-300">
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map((loc) => (
                        <SelectItem key={loc.state} value={loc.state}>{loc.state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select disabled={!sellerState}>
                    <SelectTrigger className="h-10 border-gray-300">
                      <SelectValue placeholder="City" />
                    </SelectTrigger>
                    <SelectContent>
                      {sellerCities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seller-password" className="text-sm font-medium text-gray-700">Password</Label>
                <Input id="seller-password" type="password" placeholder="Create a password" className="h-10" />
              </div>

              {/* Document Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  Business documents
                </Label>
                <p className="text-xs text-muted-foreground">Upload CAC registration, ID, or business proof (required for approval)</p>
                <div className="flex h-20 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-[#1D9E75] hover:bg-[#E1F5EE]/30">
                  <div className="flex flex-col items-center gap-1 text-gray-400">
                    <Upload className="h-5 w-5" />
                    <p className="text-xs font-medium">Upload documents</p>
                  </div>
                </div>
              </div>

              <Button className="h-10 w-full bg-[#1D9E75] text-white hover:bg-[#0F6E56]">
                Submit for approval
              </Button>
            </CardContent>
          </Card>

          {/* Logistics Provider Registration */}
          <Card className="border border-gray-200 shadow-sm transition-shadow hover:shadow-md md:col-span-2 xl:col-span-1">
            <CardHeader className="space-y-3 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E1F5EE]">
                <Truck className="h-5 w-5 text-[#1D9E75]" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Logistics Provider Registration
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Register to offer delivery services
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logistics-company" className="text-sm font-medium text-gray-700">Company name</Label>
                <Input id="logistics-company" placeholder="Enter your company name" className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logistics-email" className="text-sm font-medium text-gray-700">Email</Label>
                <Input id="logistics-email" type="email" placeholder="you@example.com" className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logistics-phone" className="text-sm font-medium text-gray-700">Phone</Label>
                <div className="flex">
                  <div className="flex h-10 items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">+234</div>
                  <Input id="logistics-phone" type="tel" placeholder="8012345678" className="h-10 rounded-l-none" />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  Base location
                </Label>
                <p className="text-xs text-muted-foreground">Your coverage areas are determined by the destinations in your shipping CSV.</p>
                <div className="grid grid-cols-2 gap-2">
                  <Select value={logisticsState} onValueChange={setLogisticsState}>
                    <SelectTrigger className="h-10 border-gray-300">
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map((loc) => (
                        <SelectItem key={loc.state} value={loc.state}>{loc.state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select disabled={!logisticsState}>
                    <SelectTrigger className="h-10 border-gray-300">
                      <SelectValue placeholder="City" />
                    </SelectTrigger>
                    <SelectContent>
                      {logisticsCities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logistics-password" className="text-sm font-medium text-gray-700">Password</Label>
                <Input id="logistics-password" type="password" placeholder="Create a password" className="h-10" />
              </div>

              {/* Document Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  Company documents
                </Label>
                <p className="text-xs text-muted-foreground">Upload business registration or proof of operations</p>
                <div className="flex h-20 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-[#1D9E75] hover:bg-[#E1F5EE]/30">
                  <div className="flex flex-col items-center gap-1 text-gray-400">
                    <Upload className="h-5 w-5" />
                    <p className="text-xs font-medium">Upload documents</p>
                  </div>
                </div>
              </div>

              <Button className="h-10 w-full bg-[#1D9E75] text-white hover:bg-[#0F6E56]">
                Submit for approval
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Approved by Super Admin before dashboard access
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Approval Flow Overview */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="space-y-3 pb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E1F5EE]">
                <GitBranch className="h-5 w-5 text-[#1D9E75]" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Approval Flow Overview
              </CardTitle>
            </div>
            <CardDescription className="text-sm text-muted-foreground">
              How seller and logistics provider accounts get activated
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#1D9E75] text-sm font-bold text-white">1</div>
                <p className="text-sm font-semibold text-gray-900">User registers</p>
                <p className="text-xs text-muted-foreground">Seller / Logistics submits form & documents</p>
              </div>
              <ChevronRight className="hidden h-5 w-5 flex-shrink-0 text-[#5DCAA5] sm:block" />
              <ChevronRight className="rotate-90 h-5 w-5 flex-shrink-0 text-[#5DCAA5] sm:hidden" />

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#1D9E75] text-sm font-bold text-white">2</div>
                <p className="text-sm font-semibold text-gray-900">Super Admin reviews</p>
                <p className="text-xs text-muted-foreground">Approves or rejects application</p>
              </div>
              <ChevronRight className="hidden h-5 w-5 flex-shrink-0 text-[#5DCAA5] sm:block" />
              <ChevronRight className="rotate-90 h-5 w-5 flex-shrink-0 text-[#5DCAA5] sm:hidden" />

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#1D9E75] text-sm font-bold text-white">3</div>
                <p className="text-sm font-semibold text-gray-900">Account activated</p>
                <p className="text-xs text-muted-foreground">User notified & gains access</p>
              </div>
              <ChevronRight className="hidden h-5 w-5 flex-shrink-0 text-[#5DCAA5] sm:block" />
              <ChevronRight className="rotate-90 h-5 w-5 flex-shrink-0 text-[#5DCAA5] sm:hidden" />

              {/* Step 4 */}
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#1D9E75] text-sm font-bold text-white">4</div>
                <p className="text-sm font-semibold text-gray-900">Dashboard access</p>
                <p className="text-xs text-muted-foreground">Full role-based capabilities</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
