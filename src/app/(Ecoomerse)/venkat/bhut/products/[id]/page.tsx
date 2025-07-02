import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/components/src/lib/utils';
import { Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import AddToCartButton from '@/components/src/components/add-to-cart-button';

async function getProduct(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/${id}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch product');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error loading product:', error);
    return null;
  }
}

async function getRelatedProducts(categoryId: string, currentProductId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/products?categoryId=${categoryId}&limit=4`,
      {
        cache: 'no-store',
      }
    );
    
    if (!res.ok) {
      throw new Error('Failed to fetch related products');
    }
    
    const { products } = await res.json();
    // Filter out the current product
    return products.filter((product) => product.id !== currentProductId);
  } catch (error) {
    console.error('Error loading related products:', error);
    return [];
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }
  
  const relatedProducts = await getRelatedProducts(product.categoryId, product.id);
  
  // Generate star rating display
  const renderRating = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : i < rating ? 'text-yellow-400 fill-yellow-400 opacity-50' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/products" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
            <Image
              src={product.images[0] || 'https://images.unsplash.com/photo-1567103472667-6898f3a79cf2'}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>
          
          {/* Thumbnail images */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-md border border-gray-200 bg-gray-100"
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Product details */}
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-2">
              <div className="flex mr-2">{renderRating(product.rating)}</div>
              <span className="text-sm text-gray-500">{product.rating} stars</span>
            </div>
            <div className="text-2xl font-bold text-primary mb-4">
              {formatPrice(product.price)}
            </div>
            
            {/* Brand */}
            <div className="mb-4">
              <span className="text-sm text-gray-500">Brand: </span>
              <span className="font-medium">{product.brand}</span>
            </div>
            
            {/* Stock status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <span className="text-sm text-green-600 font-medium">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-sm text-red-600 font-medium">
                  Out of Stock
                </span>
              )}
            </div>
            
            {/* Add to cart */}
            <div className="mb-6">
              <AddToCartButton productId={product.id} stock={product.stock} />
            </div>
            
            {/* Shipping and returns */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm">
                  Free shipping on orders over $35
                </span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm">30-day hassle-free returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product description and details */}
      <div className="mb-12">
        <div className="border-b border-gray-200 mb-6">
          <h2 className="text-xl font-bold mb-4">Product Description</h2>
          <div className="prose max-w-none mb-6">
            <p className="whitespace-pre-line">{product.description}</p>
          </div>
        </div>
        
        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <ul className="list-disc pl-5 space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-700">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex">
                  <span className="font-medium w-1/3">{key}:</span>
                  <span className="text-gray-700">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.id}`}
                className="group overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-md"
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={relatedProduct.images[0] || 'https://images.unsplash.com/photo-1567103472667-6898f3a79cf2'}
                    alt={relatedProduct.name}
                    fill
                    className="object-contain transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium line-clamp-1">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {relatedProduct.category?.name}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold">
                      {formatPrice(relatedProduct.price)}
                    </span>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-xs ml-1">{relatedProduct.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}