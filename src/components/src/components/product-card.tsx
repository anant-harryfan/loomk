'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useAddToCart } from '../hooks/use-cart';
import { formatPrice } from '../lib/utils';
import { useState } from 'react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    rating: number;
    category?: {
      name: string;
    };
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: addToCart } = useAddToCart();

  const handleAddToCart = () => {
    setIsLoading(true);
    addToCart(
      { productId: product.id, quantity: 1 },
      {
        onSettled: () => setIsLoading(false),
      }
    );
  };

  return (
    <div className="group overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-md">
      <Link
        href={`/products/${product.id}`}
        className="relative block h-48 w-full overflow-hidden bg-gray-100"
      >
        <Image
          src={product.images[0] || 'https://images.unsplash.com/photo-1567103472667-6898f3a79cf2'}
          alt={product.name}
          fill
          className="object-contain transition-transform group-hover:scale-105"
        />
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-medium line-clamp-1 hover:underline">
            {product.name}
          </h3>
        </Link>
        {product.category && (
          <p className="text-xs text-gray-500 mt-1">{product.category.name}</p>
        )}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold">{formatPrice(product.price)}</span>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="text-xs ml-1">{product.rating}</span>
          </div>
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="mt-3 w-full"
          size="sm"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}