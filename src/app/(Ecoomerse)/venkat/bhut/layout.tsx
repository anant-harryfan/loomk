

import { ClerkProvider } from '@clerk/nextjs';

import { Header } from '@/components/src/components/header';
import { Footer } from '@/components/src/components/footer';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <ClerkProvider>
          {/* <Providers> */}
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          {/* </Providers> */}
        </ClerkProvider>
  );
}