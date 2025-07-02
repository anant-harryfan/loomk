import Link from 'next/link';
import Image from 'next/image';

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }
    return res.json();
  } catch (error) {
    console.error('Error loading categories:', error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Categories</h1>
        <p className="text-gray-600">
          Browse our wide selection of product categories
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={category.image || 'https://images.unsplash.com/photo-1567103472667-6898f3a79cf2'}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // Loading skeletons
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-300" />
              <div className="p-4">
                <div className="h-5 bg-gray-300 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}