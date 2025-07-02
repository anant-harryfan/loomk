'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { useAddToCart } from '../hooks/use-cart';

interface AddToCartButtonProps {
  productId: string;
  stock: number;
}

export default function AddToCartButton({ productId, stock }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: addToCart } = useAddToCart();

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    setIsLoading(true);
    addToCart(
      { productId, quantity },
      {
        onSettled: () => setIsLoading(false),
      }
    );
  };

  return (
    <div className="space-y-4">
      {/* Quantity selector */}
      <div className="flex items-center">
        <span className="mr-3 text-sm font-medium">Quantity:</span>
        <div className="flex items-center border border-gray-300 rounded-md">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none rounded-l-md"
            onClick={decreaseQuantity}
            disabled={quantity <= 1 || isLoading}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-10 text-center text-sm">{quantity}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none rounded-r-md"
            onClick={increaseQuantity}
            disabled={quantity >= stock || isLoading}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Add to cart button */}
      <Button
        onClick={handleAddToCart}
        disabled={isLoading || stock === 0}
        className="w-full"
        size="lg"
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </Button>

      {/* Buy now button */}
      <Button
        variant="secondary"
        className="w-full"
        size="lg"
        disabled={stock === 0}
        onClick={() => {
          handleAddToCart();
          // Redirect to cart after adding
          setTimeout(() => {
            window.location.href = '/cart';
          }, 500);
        }}
      >
        Buy Now
      </Button>
    </div>
  );
}