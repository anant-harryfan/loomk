// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   // Clear existing data
//   await prisma.review.deleteMany();
//   await prisma.orderItem.deleteMany();
//   await prisma.order.deleteMany();
//   await prisma.cartItem.deleteMany();
//   await prisma.address.deleteMany();
//   await prisma.product.deleteMany();
//   await prisma.category.deleteMany();
//   await prisma.user.deleteMany();

//   console.log('Seeding database...');

//   // Create main categories
//   const categories = await Promise.all([
//     prisma.category.create({
//       data: {
//         name: 'Electronics',
//         description: 'Latest electronic devices and accessories',
//         image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661',
//       },
//     }),
//     prisma.category.create({
//       data: {
//         name: 'Books',
//         description: 'Wide collection of books across genres',
//         image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d',
//       },
//     }),
//     prisma.category.create({
//       data: {
//         name: 'Fashion',
//         description: 'Trendy clothing and accessories',
//         image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
//       },
//     }),
//     prisma.category.create({
//       data: {
//         name: 'Home & Kitchen',
//         description: 'Everything for your home',
//         image: 'https://images.unsplash.com/photo-1556911220-bda9f7f7597b',
//       },
//     }),
//   ]);

//   // Create products
//   const products = await Promise.all([
//     // Electronics
//     prisma.product.create({
//       data: {
//         name: 'Smart Watch Pro',
//         description: 'Advanced smartwatch with health tracking features',
//         price: 19999, // $199.99
//         images: [
//           'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
//         ],
//         categoryId: categories[0].id,
//         brand: 'TechGear',
//         stock: 50,
//         features: [
//           'Heart rate monitoring',
//           'Sleep tracking',
//           'GPS',
//           'Water resistant',
//         ],
//         specifications: {
//           display: '1.4 inch AMOLED',
//           battery: '5 days',
//           compatibility: 'iOS and Android',
//         },
//         isPublished: true,
//       },
//     }),
//     // Books
//     prisma.product.create({
//       data: {
//         name: 'The Art of Programming',
//         description: 'Comprehensive guide to modern programming practices',
//         price: 3999, // $39.99
//         images: [
//           'https://images.unsplash.com/photo-1532012197267-da84d127e765',
//         ],
//         categoryId: categories[1].id,
//         brand: 'Tech Publications',
//         stock: 100,
//         features: [
//           'Beginner friendly',
//           'Practical examples',
//           'Modern techniques',
//         ],
//         specifications: {
//           format: 'Hardcover',
//           pages: 500,
//           language: 'English',
//         },
//         isPublished: true,
//       },
//     }),
//     // Fashion
//     prisma.product.create({
//       data: {
//         name: 'Classic Leather Jacket',
//         description: 'Timeless leather jacket for all seasons',
//         price: 12999, // $129.99
//         images: [
//           'https://images.unsplash.com/photo-1551028719-00167b16eac5',
//         ],
//         categoryId: categories[2].id,
//         brand: 'FashionStyle',
//         stock: 30,
//         features: [
//           'Genuine leather',
//           'Multiple pockets',
//           'Quilted lining',
//         ],
//         specifications: {
//           material: 'Full grain leather',
//           care: 'Dry clean only',
//           sizes: ['S', 'M', 'L', 'XL'],
//         },
//         isPublished: true,
//       },
//     }),
//     // Home & Kitchen
//     prisma.product.create({
//       data: {
//         name: 'Smart Coffee Maker',
//         description: 'WiFi-enabled coffee maker with smartphone control',
//         price: 8999, // $89.99
//         images: [
//           'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
//         ],
//         categoryId: categories[3].id,
//         brand: 'HomeComfort',
//         stock: 25,
//         features: [
//           'App control',
//           'Schedule brewing',
//           'Multiple brew strengths',
//         ],
//         specifications: {
//           capacity: '12 cups',
//           power: '1000W',
//           warranty: '2 years',
//         },
//         isPublished: true,
//       },
//     }),
//   ]);

//   console.log('Database seeded successfully!');
//   console.log(`Created ${categories.length} categories`);
//   console.log(`Created ${products.length} products`);
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });