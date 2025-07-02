'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OrderSuccessPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState('');
  
  useEffect(() => {
    // Generate a random order ID
    const randomOrderId = `AMZ-${Math.floor(Math.random() * 1000000).toString().padStart(7, '0')}`;
    setOrderId(randomOrderId);
    
    // In a real application, we would clear the cart here
    // clearCart();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
        <p className="text-gray-600 mb-4">
          Your order has been placed successfully and is being processed.
        </p>
        <div className="bg-gray-50 p-3 rounded-md inline-block">
          <p className="text-sm text-gray-600">Order Number:</p>
          <p className="font-mono font-bold text-lg">{orderId}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Order Details</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-4">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Order Confirmation</h3>
              <p className="text-sm text-gray-600">
                We've sent a confirmation email to your registered email address.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-4">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Shipping Information</h3>
              <p className="text-sm text-gray-600">
                Your order will be shipped within 1-2 business days. You'll receive
                a shipping confirmation with tracking details once your order ships.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Estimated Delivery</h2>
        
        <div className="relative">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center z-10">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 ml-4">
              <p className="font-medium">Order Placed</p>
              <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="absolute top-4 left-4 h-full w-0.5 bg-gray-200 -z-10" />
          
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center z-10">
              <Package className="h-5 w-5 text-gray-500" />
            </div>
            <div className="flex-1 ml-4">
              <p className="font-medium">Processing</p>
              <p className="text-sm text-gray-500">1-2 business days</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center z-10">
              <Truck className="h-5 w-5 text-gray-500" />
            </div>
            <div className="flex-1 ml-4">
              <p className="font-medium">Estimated Delivery</p>
              <p className="text-sm text-gray-500">
                {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()} - 
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/products">
            Continue Shopping
          </Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/account/orders">
            View My Orders
          </Link>
        </Button>
      </div>
    </div>
  );
}