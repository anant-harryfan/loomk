import { ProductCard } from '@/components/src/components/product-card';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

async function searchProducts(query: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/products?search=${encodeURIComponent(query)}`,
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
    console.error('Error searching products:', error);
    return [];
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q || '';
  const products = await searchProducts(query);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>

        {/* Search form */}
        <form action="/search" method="get" className="mb-6">
          <div className="relative max-w-xl">
            <input
              type="text"
              name="q"
              placeholder="Search products..."
              defaultValue={query}
              className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2"
              required
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2">
              Search
            </Button>
          </div>
        </form>

        {query ? (
          <p className="text-gray-600">
            {products.length} results for <span className="font-medium">"{query}"</span>
          </p>
        ) : (
          <p className="text-gray-600">Please enter a search term</p>
        )}
      </div>

      {query ? (
        products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">
              We couldn't find any products matching "{query}"
            </p>
            <div className="space-y-2">
              <p className="text-sm">Suggestions:</p>
              <ul className="text-sm list-disc list-inside text-gray-600">
                <li>Check your spelling</li>
                <li>Try more general keywords</li>
                <li>Try different keywords</li>
              </ul>
            </div>
            <Button asChild className="mt-6">
              <a href="/products">Browse All Products</a>
            </Button>
          </div>
        )
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Enter a search term to find products</p>
        </div>
      )}
    </div>
  );
}