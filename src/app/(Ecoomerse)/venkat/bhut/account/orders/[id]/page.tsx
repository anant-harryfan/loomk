'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/components/src/lib/utils';
import { ArrowLeft, Check, Download, HelpCircle, MapPin, Package, Truck } from 'lucide-react';

// Mock order type
type OrderItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type Order = {
  id: string;
  date: Date;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  shipping: number;
  tax: number;
  address: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
};

// Mock data function - in a real app, this would fetch from an API
const getMockOrder = (id: string): Order => {
  return {
    id,
    date: new Date(),
    status: ['processing', 'shipped', 'delivered', 'cancelled'][Math.floor(Math.random() * 4)] as any,
    items: [
      {
        id: '1',
        productId: 'prod_1',
        name: 'Smart Watch Pro',
        price: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12'
      },
      {
        id: '2',
        productId: 'prod_2',
        name: 'Wireless Earbuds',
        price: 79.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb'
      }
    ],
    total: 359.97,
    shipping: 5.99,
    tax: 28.80,
    address: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States'
    },
    paymentMethod: 'Visa ending in 4242',
    trackingNumber: 'TRK' + Math.floor(Math.random() * 10000000)
  };
};

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect to sign in if not authenticated
    if (!isSignedIn) {
      router.push('/sign-in?redirect=/account/orders');
      return;
    }

    // Simulate API call to fetch order details
    const fetchOrder = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        const orderData = getMockOrder(params.id);
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [params.id, isSignedIn, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
        <Button asChild>
          <Link href="/account/orders">Back to Orders</Link>
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/account/orders">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
          </Link>
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Order #{order.id}</h1>
            <p className="text-gray-600">
              Placed on {order.date.toLocaleDateString()} at {order.date.toLocaleTimeString()}
            </p>
          </div>
          <div className="mt-2 md:mt-0">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <Link href={`/products/${item.productId}`} className="font-medium hover:text-primary">
                      {item.name}
                    </Link>
                    <div className="flex justify-between mt-1">
                      <div className="text-sm text-gray-500">
                        <p>Qty: {item.quantity}</p>
                        <p>{formatPrice(item.price)} each</p>
                      </div>
                      <div className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <MapPin className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-lg font-semibold">Shipping Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-sm text-gray-500 mb-1">Shipping Address</h3>
                <p className="font-medium">{order.address.name}</p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state} {order.address.zip}
                </p>
                <p>{order.address.country}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-sm text-gray-500 mb-1">Shipping Method</h3>
                <p className="font-medium">Standard Shipping</p>
                <p className="text-sm">Delivered in 3-5 business days</p>
                
                {order.status === 'shipped' || order.status === 'delivered' ? (
                  <div className="mt-4">
                    <h3 className="font-medium text-sm text-gray-500 mb-1">Tracking Number</h3>
                    <p className="font-mono font-medium">{order.trackingNumber}</p>
                    <Button size="sm" variant="outline" className="mt-2">
                      <Truck className="mr-2 h-4 w-4" />
                      Track Package
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          {(order.status === 'shipped' || order.status === 'delivered') && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Order Timeline</h2>
              
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
                
                <div className="relative z-10 flex items-center mb-6">
                  <div className="bg-green-500 rounded-full h-8 w-8 flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Order Placed</p>
                    <p className="text-sm text-gray-500">{order.date.toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="relative z-10 flex items-center mb-6">
                  <div className={`${order.status === 'processing' ? 'bg-yellow-500' : 'bg-green-500'} rounded-full h-8 w-8 flex items-center justify-center`}>
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Order Processed</p>
                    <p className="text-sm text-gray-500">
                      {order.status === 'processing' ? 'In progress' : new Date(order.date.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="relative z-10 flex items-center mb-6">
                  <div className={`${order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'} rounded-full h-8 w-8 flex items-center justify-center`}>
                    <Truck className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Order Shipped</p>
                    <p className="text-sm text-gray-500">
                      {order.status === 'shipped' || order.status === 'delivered' ? new Date(order.date.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString() : 'Pending'}
                    </p>
                  </div>
                </div>
                
                <div className="relative z-10 flex items-center">
                  <div className={`${order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'} rounded-full h-8 w-8 flex items-center justify-center`}>
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Order Delivered</p>
                    <p className="text-sm text-gray-500">
                      {order.status === 'delivered' ? new Date(order.date.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString() : 'Pending'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(order.total - order.shipping - order.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-gray-500 mb-1">Payment Method</h3>
                <p>{order.paymentMethod}</p>
              </div>
              
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Need Help?
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}