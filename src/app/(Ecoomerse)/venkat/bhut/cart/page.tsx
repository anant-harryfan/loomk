'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart, useUpdateCartItem, useRemoveFromCart, useCartTotal } from '@/components/src/hooks/use-cart';
import { formatPrice } from '@/components/src/lib/utils';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function CartPage() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { data: cartItems, isLoading, error } = useCart();
  const { mutate: updateCartItem } = useUpdateCartItem();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const cartTotal = useCartTotal();
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({});

  const handleQuantityChange = (id: string, quantity: number, stock: number) => {
    // Ensure quantity is within valid range
    const newQuantity = Math.max(1, Math.min(quantity, stock));
    
    setIsUpdating((prev) => ({ ...prev, [id]: true }));
    updateCartItem(
      { id, quantity: newQuantity },
      {
        onSettled: () => {
          setIsUpdating((prev) => ({ ...prev, [id]: false }));
        },
      }
    );
  };

  const handleRemoveItem = (id: string) => {
    setIsUpdating((prev) => ({ ...prev, [id]: true }));
    removeFromCart(id, {
      onSettled: () => {
        setIsUpdating((prev) => ({ ...prev, [id]: false }));
      },
    });
  };

  const handleCheckout = () => {
    if (!isSignedIn) {
      router.push('/sign-in?redirect=/checkout');
      return;
    }
    router.push('/checkout');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse space-y-4 w-full max-w-2xl">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex border rounded-lg p-4">
                <div className="bg-gray-300 h-24 w-24 rounded-md mr-4"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p>There was an error loading your cart. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
        <div className="text-center py-12">
          <div className="mb-6 flex justify-center">
            <ShoppingBag className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row"
              >
                {/* Product image */}
                <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 mb-4 sm:mb-0">
                  <Link href={`/products/${item.productId}`}>
                    <Image
                      src={item.product.images[0] || 'https://images.unsplash.com/photo-1567103472667-6898f3a79cf2'}
                      alt={item.product.name}
                      fill
                      className="object-contain"
                    />
                  </Link>
                </div>

                {/* Product details */}
                <div className="flex-1 sm:ml-6 flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <Link
                        href={`/products/${item.productId}`}
                        className="text-lg font-medium hover:text-primary hover:underline"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatPrice(item.product.price)} each
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 text-lg font-bold">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between">
                    {/* Quantity controls */}
                    <div className="flex items-center">
                      <span className="mr-3 text-sm">Quantity:</span>
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none rounded-l-md"
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              item.quantity - 1,
                              item.product.stock
                            )
                          }
                          disabled={
                            item.quantity <= 1 || isUpdating[item.id]
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none rounded-r-md"
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              item.quantity + 1,
                              item.product.stock
                            )
                          }
                          disabled={
                            item.quantity >= item.product.stock ||
                            isUpdating[item.id]
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Remove button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 sm:mt-0 text-red-500 hover:text-red-700 hover:bg-red-50 self-start"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={isUpdating[item.id]}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-lg p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>
                  {cartTotal >= 35 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    formatPrice(5.99)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>{formatPrice(cartTotal * 0.07)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>
                  {formatPrice(
                    cartTotal + (cartTotal >= 35 ? 0 : 5.99) + cartTotal * 0.07
                  )}
                </span>
              </div>
            </div>

            <Button
              className="w-full mb-3"
              size="lg"
              onClick={handleCheckout}
            >
              Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Free shipping on orders over $35
            </p>

            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">We Accept</h3>
              <div className="flex space-x-2">
                <div className="h-8 w-12 bg-gray-200 rounded"></div>
                <div className="h-8 w-12 bg-gray-200 rounded"></div>
                <div className="h-8 w-12 bg-gray-200 rounded"></div>
                <div className="h-8 w-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}