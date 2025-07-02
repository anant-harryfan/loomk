
// import Link from 'next/link';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import { ChevronRight } from 'lucide-react';

// async function getCategories() {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/venkat/bhut/api/categories`, {
//       cache: 'no-store',
//     });
//     if (!res.ok) {
//       console.log("nocate");
//     }
//     return res.json();
//   } catch (error) {
//     console.error('Error loading categories:', error);
//     return [];
//   }
// }

// async function getFeaturedProducts() {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_HOST_URL}/venkat/bhut/api/products?featured=true&limit=4`,
//       {
//         cache: 'no-store',
//       }
//     );
//     if (!res.ok) {
//       // throw new Error('Failed to fetch featured products');
//       console.log("no produ");
//     }
//     return res.json();
//   } catch (error) {
//     console.error('Error loading featured products:', error);
//     return [];
//   }
// }

// export default async function Home() {
//   const [categories, featuredProducts] = await Promise.all([
//     getCategories(),
//     getFeaturedProducts(),
//   ]);

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Hero Banner */}
//       <section className="relative w-full h-[500px] overflow-hidden">
//         <Image
//           src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=2070"
//           alt="Amazon Hero"
//           fill
//           priority
//           className="object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
//           <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16">
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//               Shop the Latest Products
//             </h1>
//             <p className="text-xl text-white mb-8 max-w-2xl">
//               Discover amazing deals on electronics, books, fashion, and more.
//             </p>
//             <Button asChild size="lg" className="w-fit">
//               <Link href="/products">Shop Now</Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Shop by Category */}
//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-2xl font-bold">Shop by Category</h2>
//             <Button asChild variant="ghost" className="flex items-center">
//               <Link href="/categories">
//                 View all categories
//                 <ChevronRight className="ml-1 h-4 w-4" />
//               </Link>
//             </Button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {categories.length > 0 ? (
//               categories.slice(0, 3).map((category) => (
//                 <Link
//                   key={category.id}
//                   href={`/categories/${category.slug}`}
//                   className="group overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg"
//                 >
//                   <div className="relative h-48 w-full overflow-hidden">
//                     <Image
//                       src={category.image || 'https://images.unsplash.com/photo-1567103472667-6898f3a79cf2'}
//                       alt={category.name}
//                       fill
//                       className="object-cover transition-transform group-hover:scale-105"
//                     />
//                   </div>
//                   <div className="p-4">
//                     <h3 className="text-lg font-semibold">{category.name}</h3>
//                     <p className="text-sm text-gray-500 mt-1">
//                       {category.description}
//                     </p>
//                   </div>
//                 </Link>
//               ))
//             ) : (
//               // Loading skeletons
//               Array.from({ length: 3 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="rounded-lg shadow-md overflow-hidden animate-pulse"
//                 >
//                   <div className="h-48 bg-gray-300" />
//                   <div className="p-4">
//                     <div className="h-5 bg-gray-300 rounded w-1/2 mb-2" />
//                     <div className="h-4 bg-gray-200 rounded w-3/4" />
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="py-12">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-2xl font-bold">Featured Products</h2>
//             <Button asChild variant="ghost" className="flex items-center">
//               <Link href="/products">
//                 View all products
//                 <ChevronRight className="ml-1 h-4 w-4" />
//               </Link>
//             </Button>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {featuredProducts.length > 0 ? (
//               featuredProducts.map((product) => (
//                 <Link
//                   key={product.id}
//                   href={`/products/${product.id}`}
//                   className="group overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-md"
//                 >
//                   <div className="relative h-48 w-full overflow-hidden bg-gray-100">
//                     <Image
//                       src={product.images[0] || 'https://images.unsplash.com/photo-1567103472667-6898f3a79cf2'}
//                       alt={product.name}
//                       fill
//                       className="object-contain transition-transform group-hover:scale-105"
//                     />
//                   </div>
//                   <div className="p-4">
//                     <h3 className="text-sm font-medium line-clamp-1">
//                       {product.name}
//                     </h3>
//                     <p className="text-xs text-gray-500 mt-1">
//                       {product.category?.name}
//                     </p>
//                     <div className="mt-2 flex items-center justify-between">
//                       <span className="text-lg font-bold">
//                         ${product.price.toFixed(2)}
//                       </span>
//                       <div className="flex items-center">
//                         <span className="text-yellow-400">★</span>
//                         <span className="text-xs ml-1">{product.rating}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))
//             ) : (
//               // Loading skeletons
//               Array.from({ length: 4 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="rounded-lg border border-gray-200 overflow-hidden animate-pulse"
//                 >
//                   <div className="h-48 bg-gray-200" />
//                   <div className="p-4">
//                     <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
//                     <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
//                     <div className="flex items-center justify-between mt-2">
//                       <div className="h-5 bg-gray-300 rounded w-1/4" />
//                       <div className="h-4 bg-gray-200 rounded w-1/6" />
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-16 bg-primary text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-4">
//             Ready to discover amazing products?
//           </h2>
//           <p className="text-lg mb-8 max-w-2xl mx-auto">
//             Join millions of customers and experience the best online shopping
//             experience.
//           </p>
//           <Button asChild size="lg" variant="secondary">
//             <Link href="/products">Shop Now</Link>
//           </Button>
//         </div>
//       </section>
//     </div>
//   );
// }

"use client"
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page