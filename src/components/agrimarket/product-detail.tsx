'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Wheat, Info, Store, ShieldCheck, ArrowLeft, Plus } from 'lucide-react';
import { useAgrimarketStore, PRODUCTS } from '@/store/agrimarket-store';

export function ProductDetailPage() {
  const { selectedProduct, setScreen } = useAgrimarketStore();
  const product = selectedProduct ?? PRODUCTS[0];
  const [quantity, setQuantity] = useState<string>('50');

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Back to Marketplace */}
      <button
        onClick={() => setScreen('home')}
        className="inline-flex items-center gap-2 text-sm font-medium hover:underline transition-colors"
        style={{ color: '#1D9E75' }}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Marketplace
      </button>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column — Image gallery */}
        <div className="md:w-1/2 space-y-3">
          {/* Main image placeholder */}
          <div
            className="w-full rounded-lg flex items-center justify-center"
            style={{ height: 220, backgroundColor: '#f3f4f6' }}
          >
            <Wheat className="h-16 w-16" style={{ color: '#1D9E75' }} />
          </div>

          {/* Thumbnail placeholders */}
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex-1 rounded-md flex items-center justify-center"
                style={{ height: 64, backgroundColor: '#f3f4f6' }}
              >
                <Wheat className="h-5 w-5" style={{ color: '#5DCAA5' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Right column — Product info */}
        <div className="md:w-1/2 space-y-4">
          {/* Product name */}
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

          {/* Price */}
          <p className="text-3xl font-bold" style={{ color: '#1D9E75' }}>
            ₦{product.price.toLocaleString()}/kg
          </p>

          <Separator />

          {/* Info rows */}
          <div className="space-y-3">
            {/* Available stock */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Available stock:</span>
              <Badge
                className="font-semibold border-0"
                style={{ backgroundColor: '#E1F5EE', color: '#0F6E56' }}
              >
                {product.available} kg
              </Badge>
            </div>

            {/* Minimum purchase */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Minimum purchase:</span>
              <Badge className="font-semibold border-0 bg-amber-50 text-amber-700">
                {product.minQty} kg
              </Badge>
            </div>

            {/* Category */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Category:</span>
              <Badge
                variant="outline"
                className="font-medium"
                style={{ borderColor: '#5DCAA5', color: '#1D9E75' }}
              >
                {product.category}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Quantity input */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
              Quantity
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="quantity"
                type="number"
                min={product.minQty}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="flex-1"
              />
              <span className="text-sm font-medium text-gray-500">kg</span>
            </div>
            <div className="flex items-start gap-1.5">
              <Info className="h-3.5 w-3.5 mt-0.5" style={{ color: '#5DCAA5' }} />
              <p className="text-xs text-gray-500">
                Minimum quantity is {product.minQty} kg
              </p>
            </div>
          </div>

          {/* Add to cart button */}
          <Button
            className="w-full text-white font-semibold py-3"
            style={{ backgroundColor: '#1D9E75' }}
            onClick={() => setScreen('cart')}
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
            <ShieldCheck className="h-3.5 w-3.5 mr-1" />
            Verified
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}
