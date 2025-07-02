import "@/app/globals.css";
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

 
            {children}
  
    </ClerkProvider>
  );
}
