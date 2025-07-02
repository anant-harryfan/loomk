'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
  brand: string;
  stock: number;
  rating: number;
  features: string[];
  specifications: Record<string, string>;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
  };
};

export type ProductFilter = {
  categoryId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'rating';
};

// Fetch multiple products with optional filters
const fetchProducts = async (filters?: ProductFilter): Promise<Product[]> => {
  // Construct URL with query parameters
  let url = '/api/products';
  const queryParams: string[] = [];

  if (filters) {
    if (filters.categoryId) {
      queryParams.push(`categoryId=${filters.categoryId}`);
    }
    if (filters.search) {
      queryParams.push(`search=${encodeURIComponent(filters.search)}`);
    }
    if (filters.minPrice !== undefined) {
      queryParams.push(`minPrice=${filters.minPrice}`);
    }
    if (filters.maxPrice !== undefined) {
      queryParams.push(`maxPrice=${filters.maxPrice}`);
    }
    if (filters.sortBy) {
      queryParams.push(`sortBy=${filters.sortBy}`);
    }
  }

  if (queryParams.length > 0) {
    url += `?${queryParams.join('&')}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};

// Fetch a single product by ID
const fetchProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  return response.json();
};

// Create a new product
const createProduct = async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create product');
  }

  return response.json();
};

// Update an existing product
const updateProduct = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>;
}): Promise<Product> => {
  const response = await fetch(`/api/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update product');
  }

  return response.json();
};

// Delete a product
const deleteProduct = async (id: string): Promise<void> => {
  const response = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
};

// Hook to fetch multiple products
export const useProducts = (filters?: ProductFilter) => {
  return useQuery<Product[]>({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
  });
};

// Hook to fetch a single product
export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
};

// Hook to create a product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create product');
    },
  });
};

// Hook to update a product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', data.id] });
      toast.success('Product updated successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update product');
    },
  });
};

// Hook to delete a product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete product');
    },
  });
};