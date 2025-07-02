import { ProductCard } from '@/components/src/components/product-card';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';

async function getProducts(searchParams: {
  categoryId?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  page?: string;
}) {
  try {
    // Build query string from search params
    const queryParams = new URLSearchParams();
    
    if (searchParams.categoryId) {
      queryParams.append('categoryId', searchParams.categoryId);
    }
    
    if (searchParams.search) {
      queryParams.append('search', searchParams.search);
    }
    
    if (searchParams.minPrice) {
      queryParams.append('minPrice', searchParams.minPrice);
    }
    
    if (searchParams.maxPrice) {
      queryParams.append('maxPrice', searchParams.maxPrice);
    }
    
    if (searchParams.sortBy) {
      queryParams.append('sortBy', searchParams.sortBy);
    }
    
    // Default to page 1 if not specified
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    queryParams.append('page', page.toString());
    queryParams.append('limit', '12'); // Show 12 products per page
    
    const queryString = queryParams.toString();
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/products${queryString ? `?${queryString}` : ''}`;
    
    const res = await fetch(url, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error loading products:', error);
    return { products: [], totalCount: 0 };
  }
}

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

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    categoryId?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    page?: string;
  };
}) {
  const [{ products, totalCount }, categories] = await Promise.all([
    getProducts(searchParams),
    getCategories(),
  ]);

  // Calculate pagination
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const totalPages = Math.ceil(totalCount / 12);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  // Create URLs for pagination
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-20 bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Filter className="h-5 w-5" />
            </div>
            
            {/* Categories filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                <a
                  href="/products"
                  className={`block text-sm ${!searchParams.categoryId ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
                >
                  All Categories
                </a>
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={`/products?categoryId=${category.id}`}
                    className={`block text-sm ${searchParams.categoryId === category.id ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Price range filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Price Range</h3>
              <form className="space-y-2" action="/products" method="get">
                {/* Preserve other query params */}
                {searchParams.categoryId && (
                  <input
                    type="hidden"
                    name="categoryId"
                    value={searchParams.categoryId}
                  />
                )}
                {searchParams.search && (
                  <input
                    type="hidden"
                    name="search"
                    value={searchParams.search}
                  />
                )}
                {searchParams.sortBy && (
                  <input
                    type="hidden"
                    name="sortBy"
                    value={searchParams.sortBy}
                  />
                )}
                
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    defaultValue={searchParams.minPrice}
                    className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    defaultValue={searchParams.maxPrice}
                    className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm"
                  />
                </div>
                <Button type="submit" size="sm" className="w-full">
                  Apply
                </Button>
              </form>
            </div>
            
            {/* Sort options */}
            <div>
              <h3 className="text-sm font-medium mb-2">Sort By</h3>
              <div className="space-y-2">
                <a
                  href={`/products?${new URLSearchParams({
                    ...Object.fromEntries(
                      Object.entries(searchParams).filter(
                        ([key]) => key !== 'sortBy' && key !== 'page'
                      )
                    ),
                    sortBy: 'newest',
                  }).toString()}`}
                  className={`block text-sm ${searchParams.sortBy === 'newest' || !searchParams.sortBy ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
                >
                  Newest
                </a>
                <a
                  href={`/products?${new URLSearchParams({
                    ...Object.fromEntries(
                      Object.entries(searchParams).filter(
                        ([key]) => key !== 'sortBy' && key !== 'page'
                      )
                    ),
                    sortBy: 'price_asc',
                  }).toString()}`}
                  className={`block text-sm ${searchParams.sortBy === 'price_asc' ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
                >
                  Price: Low to High
                </a>
                <a
                  href={`/products?${new URLSearchParams({
                    ...Object.fromEntries(
                      Object.entries(searchParams).filter(
                        ([key]) => key !== 'sortBy' && key !== 'page'
                      )
                    ),
                    sortBy: 'price_desc',
                  }).toString()}`}
                  className={`block text-sm ${searchParams.sortBy === 'price_desc' ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
                >
                  Price: High to Low
                </a>
                <a
                  href={`/products?${new URLSearchParams({
                    ...Object.fromEntries(
                      Object.entries(searchParams).filter(
                        ([key]) => key !== 'sortBy' && key !== 'page'
                      )
                    ),
                    sortBy: 'rating',
                  }).toString()}`}
                  className={`block text-sm ${searchParams.sortBy === 'rating' ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
                >
                  Highest Rated
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          {/* Search and results info */}
          <div className="mb-6">
            <form action="/products" method="get" className="mb-4">
              {/* Preserve other query params */}
              {searchParams.categoryId && (
                <input
                  type="hidden"
                  name="categoryId"
                  value={searchParams.categoryId}
                />
              )}
              {searchParams.minPrice && (
                <input
                  type="hidden"
                  name="minPrice"
                  value={searchParams.minPrice}
                />
              )}
              {searchParams.maxPrice && (
                <input
                  type="hidden"
                  name="maxPrice"
                  value={searchParams.maxPrice}
                />
              )}
              {searchParams.sortBy && (
                <input
                  type="hidden"
                  name="sortBy"
                  value={searchParams.sortBy}
                />
              )}
              
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Search products..."
                  defaultValue={searchParams.search}
                  className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2">
                  Search
                </Button>
              </div>
            </form>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {products.length} of {totalCount} products
              </p>
              {searchParams.search && (
                <p className="text-sm">
                  Search results for: <span className="font-medium">{searchParams.search}</span>
                </p>
              )}
            </div>
          </div>
          
          {/* Products grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button asChild>
                <a href="/products">View All Products</a>
              </Button>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                disabled={!hasPrevPage}
                asChild={hasPrevPage}
              >
                {hasPrevPage ? (
                  <a href={createPageURL(currentPage - 1)}>Previous</a>
                ) : (
                  'Previous'
                )}
              </Button>
              
              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show pages around current page
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? 'default' : 'outline'}
                      size="sm"
                      asChild
                    >
                      <a href={createPageURL(pageNumber)}>{pageNumber}</a>
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                disabled={!hasNextPage}
                asChild={hasNextPage}
              >
                {hasNextPage ? (
                  <a href={createPageURL(currentPage + 1)}>Next</a>
                ) : (
                  'Next'
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}