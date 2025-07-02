'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart, useCartTotal } from '@/components/src/hooks/use-cart';
import { formatPrice } from '@/components/src/lib/utils';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Check, ChevronRight, CreditCard, MapPin, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { data: cartItems, isLoading } = useCart();
  const cartTotal = useCartTotal();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect to sign in if not authenticated
  if (!isLoading && !isSignedIn) {
    router.push('/sign-in?redirect=/checkout');
    return null;
  }

  // Redirect to cart if cart is empty
  if (!isLoading && (!cartItems || cartItems.length === 0)) {
    router.push('/cart');
    return null;
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      router.push('/checkout/success');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      {/* Checkout steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div
            className={`flex flex-col items-center ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              {step > 1 ? <Check className="h-4 w-4" /> : '1'}
            </div>
            <span className="text-xs">Shipping</span>
          </div>

          <div className="w-20 h-0.5 bg-gray-200">
            <div
              className="h-full bg-primary"
              style={{ width: step >= 2 ? '100%' : '0%' }}
            />
          </div>

          <div
            className={`flex flex-col items-center ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              {step > 2 ? <Check className="h-4 w-4" /> : '2'}
            </div>
            <span className="text-xs">Payment</span>
          </div>

          <div className="w-20 h-0.5 bg-gray-200">
            <div
              className="h-full bg-primary"
              style={{ width: step >= 3 ? '100%' : '0%' }}
            />
          </div>

          <div
            className={`flex flex-col items-center ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              3
            </div>
            <span className="text-xs">Review</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main checkout form */}
        <div className="lg:col-span-2">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-primary mr-2" />
                <h2 className="text-lg font-semibold">Shipping Address</h2>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium mb-1"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium mb-1"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium mb-1"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="zip"
                      className="block text-sm font-medium mb-1"
                    >
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-3">Shipping Method</h3>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border border-gray-200 rounded-md cursor-pointer hover:border-primary">
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        className="mr-3"
                        defaultChecked
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">Standard Shipping</span>
                          <span>
                            {cartTotal >= 35 ? (
                              <span className="text-green-600">Free</span>
                            ) : (
                              formatPrice(5.99)
                            )}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Delivery in 3-5 business days
                        </p>
                      </div>
                    </label>

                    <label className="flex items-center p-3 border border-gray-200 rounded-md cursor-pointer hover:border-primary">
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">Express Shipping</span>
                          <span>{formatPrice(12.99)}</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Delivery in 1-2 business days
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button type="submit" className="w-full md:w-auto">
                    Continue to Payment
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="h-5 w-5 text-primary mr-2" />
                <h2 className="text-lg font-semibold">Payment Method</h2>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(3);
                }}
                className="space-y-4"
              >
                <div className="space-y-2 mb-4">
                  <label className="flex items-center p-3 border border-gray-200 rounded-md cursor-pointer hover:border-primary">
                    <input
                      type="radio"
                      name="payment"
                      value="credit"
                      className="mr-3"
                      defaultChecked
                    />
                    <span className="font-medium">Credit / Debit Card</span>
                  </label>

                  <label className="flex items-center p-3 border border-gray-200 rounded-md cursor-pointer hover:border-primary">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      className="mr-3"
                    />
                    <span className="font-medium">PayPal</span>
                  </label>
                </div>

                <div className="p-4 border border-gray-200 rounded-md">
                  <h3 className="text-sm font-medium mb-3">Card Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block text-sm font-medium mb-1"
                      >
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="expiry"
                          className="block text-sm font-medium mb-1"
                        >
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          placeholder="MM/YY"
                          className="w-full rounded-md border border-gray-300 px-3 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cvc"
                          className="block text-sm font-medium mb-1"
                        >
                          CVC
                        </label>
                        <input
                          type="text"
                          id="cvc"
                          placeholder="123"
                          className="w-full rounded-md border border-gray-300 px-3 py-2"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="nameOnCard"
                        className="block text-sm font-medium mb-1"
                      >
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="nameOnCard"
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Back to Shipping
                  </Button>
                  <Button type="submit">
                    Review Order
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Review Your Order</h2>

              <div className="space-y-6">
                {/* Shipping info summary */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-1" /> Shipping Address
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep(1)}
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>John Doe</p>
                    <p>123 Main St</p>
                    <p>New York, NY 10001</p>
                    <p>United States</p>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>

                {/* Payment info summary */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium flex items-center">
                      <CreditCard className="h-4 w-4 mr-1" /> Payment Method
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep(2)}
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Credit Card ending in 3456</p>
                    <p>Expires 12/25</p>
                  </div>
                </div>

                {/* Shipping method summary */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium flex items-center">
                      <Truck className="h-4 w-4 mr-1" /> Shipping Method
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep(1)}
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Standard Shipping (3-5 business days)</p>
                    <p>
                      {cartTotal >= 35 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        formatPrice(5.99)
                      )}
                    </p>
                  </div>
                </div>

                {/* Order items */}
                <div>
                  <h3 className="font-medium mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {cartItems?.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center py-2 border-b border-gray-100"
                      >
                        <div className="relative h-16 w-16 flex-shrink-0">
                          <Image
                            src={item.product.images[0] || 'https://images.unsplash.com/photo-1567103472667-6898f3a79cf2'}
                            alt={item.product.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="text-sm font-medium">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-sm font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <Button
                  onClick={handlePlaceOrder}
                  className="w-full"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>
                <p className="text-xs text-center text-gray-500 mt-2">
                  By placing your order, you agree to our{' '}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          )}
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

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Free shipping on orders over $35</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>30-day hassle-free returns</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}