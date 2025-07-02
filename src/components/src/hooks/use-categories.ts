'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

// Fetch all categories
const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch('/api/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
};

// Fetch a single category by ID
const fetchCategory = async (id: string): Promise<Category> => {
  const response = await fetch(`/api/categories/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch category');
  }

  return response.json();
};

// Fetch a single category by slug
const fetchCategoryBySlug = async (slug: string): Promise<Category> => {
  const response = await fetch(`/api/categories/slug/${slug}`);
  if (!response.ok) {
    throw new Error('Failed to fetch category');
  }

  return response.json();
};

// Create a new category
const createCategory = async (data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> => {
  const response = await fetch('/api/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create category');
  }

  return response.json();
};

// Update an existing category
const updateCategory = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<Omit<Category, 'id' | 'createdAt' | 'updatedAt'>>;
}): Promise<Category> => {
  const response = await fetch(`/api/categories/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update category');
  }

  return response.json();
};

// Delete a category
const deleteCategory = async (id: string): Promise<void> => {
  const response = await fetch(`/api/categories/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete category');
  }
};

// Hook to fetch all categories
export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};

// Hook to fetch a single category by ID
export const useCategory = (id: string) => {
  return useQuery<Category>({
    queryKey: ['category', id],
    queryFn: () => fetchCategory(id),
    enabled: !!id,
  });
};

// Hook to fetch a single category by slug
export const useCategoryBySlug = (slug: string) => {
  return useQuery<Category>({
    queryKey: ['category', 'slug', slug],
    queryFn: () => fetchCategoryBySlug(slug),
    enabled: !!slug,
  });
};

// Hook to create a category
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create category');
    },
  });
};

// Hook to update a category
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', data.id] });
      queryClient.invalidateQueries({ queryKey: ['category', 'slug', data.slug] });
      toast.success('Category updated successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update category');
    },
  });
};

// Hook to delete a category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete category');
    },
  });
};