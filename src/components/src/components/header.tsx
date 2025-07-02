'use client';

import Link from 'next/link';
import Image from 'next/image';
import { UserButton, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X, Search, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../hooks/use-cart';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isSignedIn } = useAuth();
  const { data: cartItems } = useCart();

  // Calculate total items in cart
  const cartItemCount = cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  ) ?? 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="w-full bg-black text-white">
      {/* Top navigation bar */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl text-primary">amazon</span>
          </Link>

          {/* Delivery location */}
          <div className="hidden md:flex items-center space-x-1">
            <MapPin size={18} />
            <div className="text-xs">
              <p className="text-gray-300">Deliver to</p>
              <p className="font-bold">United States</p>
            </div>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-4">
            <div className="relative w-full flex">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-l-md border-0 py-2 px-3 text-black focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white rounded-r-md px-4 flex items-center justify-center"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {isSignedIn ? (
              <div className="flex items-center space-x-1">
                <div className="text-xs">
                  <p className="text-gray-300">Hello, User</p>
                  <p className="font-bold">Account & Lists</p>
                </div>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <Button asChild variant="ghost" className="text-white">
                <Link href="/sign-in">
                  <div className="text-xs">
                    <p className="text-gray-300">Hello, sign in</p>
                    <p className="font-bold">Account & Lists</p>
                  </div>
                </Link>
              </Button>
            )}
            <Link href="/orders" className="text-xs">
              <p className="text-gray-300">Returns</p>
              <p className="font-bold">& Orders</p>
            </Link>
            <Link href="/cart" className="relative">
              <div className="flex items-end">
                <div className="relative">
                  <ShoppingCart size={24} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </div>
                <span className="font-bold ml-1">Cart</span>
              </div>
            </Link>
          </nav>
        </div>

        {/* Mobile search bar */}
        <form onSubmit={handleSearch} className="mt-2 md:hidden">
          <div className="relative w-full flex">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-l-md border-0 py-2 px-3 text-black focus:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white rounded-r-md px-4 flex items-center justify-center"
            >
              <Search size={20} />
            </button>
          </div>
        </form>
      </div>

      {/* Categories navigation */}
      <div className="bg-primary-foreground/10 py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-6 text-sm">
            <Link href="/" className="hover:text-primary transition-colors">
              All
            </Link>
            <Link href="/categories/electronics" className="hover:text-primary transition-colors">
              Electronics
            </Link>
            <Link href="/categories/books" className="hover:text-primary transition-colors">
              Books
            </Link>
            <Link href="/categories/fashion" className="hover:text-primary transition-colors">
              Fashion
            </Link>
            <Link href="/categories/home-kitchen" className="hover:text-primary transition-colors">
              Home & Kitchen
            </Link>
            <Link href="/deals" className="hover:text-primary transition-colors">
              Today's Deals
            </Link>
            <Link href="/customer-service" className="hover:text-primary transition-colors">
              Customer Service
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900">
          <nav className="flex flex-col p-4 space-y-4">
            {isSignedIn ? (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Account</span>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )}
            <Link
              href="/products"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/orders"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Orders
            </Link>
            <Link
              href="/cart"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center justify-between"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}