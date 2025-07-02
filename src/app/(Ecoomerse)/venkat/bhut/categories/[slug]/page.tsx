import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/src/components/product-card';
import { ArrowLeft } from 'lucide-react';

async function getCategoryBySlug(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/categories/slug/${slug}`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch category');
    }

    return res.json();
  } catch (error) {
    console.error('Error loading category:', error);
    return null;
  }
}

async function getProductsByCategory(categoryId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/products?categoryId=${categoryId}`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.id);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/categories" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Link>
      </Button>

      {/* Category header */}
      <div className="relative h-64 w-full overflow-hidden rounded-lg mb-8">
        <Image
          src={category.image || 'https://images.unsplash.com/photo-1567103472667-6898f3a79cf2'}
          alt={category.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              {category.name}
            </h1>
            <p className="text-white/80 max-w-2xl">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Products in {category.name}</h2>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
            <h3 className="text-lg font-medium mb-2">
              No products found in this category
            </h3>
            <p className="text-gray-500 mb-4">
              Check back later for new products
            </p>
            <Button asChild>
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Call to action */}
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold mb-2">
          Can't find what you're looking for?
        </h3>
        <p className="text-gray-600 mb-4">
          Browse our complete collection of products across all categories.
        </p>
        <Button asChild>
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
    </div>
  );
}