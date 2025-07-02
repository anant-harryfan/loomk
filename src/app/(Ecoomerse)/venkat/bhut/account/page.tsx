'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CreditCard, LogOut, Package, Settings, User } from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { isSignedIn, signOut } = useAuth();
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState('profile');

  // Redirect to sign in if not authenticated
  if (isLoaded && !isSignedIn) {
    router.push('/sign-in?redirect=/account');
    return null;
  }

  // Show loading state while user data is loading
  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-24 w-24 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="flex flex-col items-center mb-6 p-4 border border-gray-200 rounded-lg">
            <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
              <img
                src={user?.imageUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'}
                alt={user?.fullName || 'User'}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold">{user?.fullName}</h2>
            <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${activeTab === 'profile' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
            >
              <User className="mr-3 h-5 w-5" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${activeTab === 'orders' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
            >
              <Package className="mr-3 h-5 w-5" />
              Orders
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${activeTab === 'payment' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
            >
              <CreditCard className="mr-3 h-5 w-5" />
              Payment Methods
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${activeTab === 'settings' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </button>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center px-4 py-2 text-sm text-red-600 rounded-md hover:bg-red-50"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </button>
          </nav>
        </div>

        {/* Main content */}
        <div className="md:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    defaultValue={user?.fullName || ''}
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    defaultValue={user?.primaryEmailAddress?.emailAddress || ''}
                    readOnly
                  />
                </div>
                
                <div className="pt-4">
                  <p className="text-sm text-gray-500 mb-4">
                    To update your profile information, please use the Clerk user profile.
                  </p>
                  <Button variant="outline">
                    Manage Account with Clerk
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Your Orders</h2>
              
              {/* Sample orders - in a real app, these would come from an API */}
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Order #AMZ-1234567</p>
                      <p className="text-sm text-gray-500">Placed on {new Date().toLocaleDateString()}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Delivered
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-3">
                    <p className="text-sm">3 items • {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(129.99)}</p>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/account/orders/AMZ-1234567">
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Order #AMZ-7654321</p>
                      <p className="text-sm text-gray-500">Placed on {new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      Shipped
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-3">
                    <p className="text-sm">1 item • {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(49.99)}</p>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/account/orders/AMZ-7654321">
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Order #AMZ-9876543</p>
                      <p className="text-sm text-gray-500">Placed on {new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Delivered
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-3">
                    <p className="text-sm">2 items • {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(89.98)}</p>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/account/orders/AMZ-9876543">
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button asChild>
                  <Link href="/products">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === 'payment' && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                  <div className="bg-gray-100 p-3 rounded-md mr-4">
                    <CreditCard className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/25</p>
                  </div>
                  <div>
                    <Button size="sm" variant="outline">Remove</Button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Notification Preferences</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary mr-2" defaultChecked />
                      <span>Order updates</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary mr-2" defaultChecked />
                      <span>Promotions and deals</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary mr-2" />
                      <span>Product recommendations</span>
                    </label>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium mb-3">Privacy Settings</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary mr-2" defaultChecked />
                      <span>Allow personalized recommendations</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary mr-2" />
                      <span>Share my purchase history with partners</span>
                    </label>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium mb-3 text-red-600">Danger Zone</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive">
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}