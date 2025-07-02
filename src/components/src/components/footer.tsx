"use client"
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      {/* Back to top button */}
      <div className="bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full py-3 text-sm font-medium"
        >
          Back to top
        </button>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Get to Know Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">Get to Know Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-white hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-white hover:underline">
                  Press Releases
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-white hover:underline">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Make Money with Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">Make Money with Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/sell" className="hover:text-white hover:underline">
                  Sell products
                </Link>
              </li>
              <li>
                <Link href="/associates" className="hover:text-white hover:underline">
                  Become an Affiliate
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="hover:text-white hover:underline">
                  Advertise Your Products
                </Link>
              </li>
              <li>
                <Link href="/publish" className="hover:text-white hover:underline">
                  Self-Publish
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Products */}
          <div>
            <h3 className="font-bold text-lg mb-4">Payment Products</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/business-card" className="hover:text-white hover:underline">
                  Business Card
                </Link>
              </li>
              <li>
                <Link href="/shop-with-points" className="hover:text-white hover:underline">
                  Shop with Points
                </Link>
              </li>
              <li>
                <Link href="/reload-balance" className="hover:text-white hover:underline">
                  Reload Your Balance
                </Link>
              </li>
              <li>
                <Link href="/currency-converter" className="hover:text-white hover:underline">
                  Currency Converter
                </Link>
              </li>
            </ul>
          </div>

          {/* Let Us Help You */}
          <div>
            <h3 className="font-bold text-lg mb-4">Let Us Help You</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/account" className="hover:text-white hover:underline">
                  Your Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white hover:underline">
                  Your Orders
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white hover:underline">
                  Shipping Rates & Policies
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white hover:underline">
                  Returns & Replacements
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white hover:underline">
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center">
            <Link href="/" className="mb-4">
              <span className="font-bold text-xl text-primary">amazon</span>
            </Link>
            <div className="flex flex-wrap justify-center gap-4 mb-4 text-xs text-gray-400">
              <Link href="/conditions" className="hover:text-white hover:underline">
                Conditions of Use
              </Link>
              <Link href="/privacy" className="hover:text-white hover:underline">
                Privacy Notice
              </Link>
              <Link href="/interest-based-ads" className="hover:text-white hover:underline">
                Interest-Based Ads
              </Link>
            </div>
            <p className="text-xs text-gray-400">
              &copy; {currentYear}, Amazon Clone. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}