'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export type CartItem = {
  id: string;
  productId: string;
  userId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    stock: number;
  };
};

// Fetch cart items
const fetchCartItems = async (): Promise<CartItem[]> => {
  const response = await fetch('/api/cart');
  if (!response.ok) {
    throw new Error('Failed to fetch cart items');
  }
  return response.json();
};

// Add item to cart
const addToCart = async (data: { productId: string; quantity: number }): Promise<CartItem> => {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to add item to cart');
  }

  return response.json();
};

// Update cart item quantity
const updateCartItem = async (data: { id: string; quantity: number }): Promise<CartItem> => {
  const response = await fetch(`/api/cart/${data.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity: data.quantity }),
  });

  if (!response.ok) {
    throw new Error('Failed to update cart item');
  }

  return response.json();
};

// Remove item from cart
const removeFromCart = async (id: string): Promise<void> => {
  const response = await fetch(`/api/cart/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to remove item from cart');
  }
};

// Hook to get cart items
export const useCart = () => {
  return useQuery<CartItem[]>({
    queryKey: ['cart'],
    queryFn: fetchCartItems,
  });
};

// Hook to add item to cart
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Item added to cart');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add item to cart');
    },
  });
};

// Hook to update cart item quantity
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Cart updated');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update cart');
    },
  });
};

// Hook to remove item from cart
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Item removed from cart');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to remove item from cart');
    },
  });
};

// Calculate cart total
export const useCartTotal = () => {
  const { data: cartItems } = useCart();

  if (!cartItems) {
    return 0;
  }

  return cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
};