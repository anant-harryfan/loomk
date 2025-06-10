import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "@/app/globals.css";
import "./globals.css"
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme";
import ReactQueryProvider from "@/react-query";
import { ReduxProvider } from "@/redux/provider";
import { Toaster } from "sonner";



const manrope = Manrope({
  subsets: ['latin']
}

)

export const metadata: Metadata = {
  title: "AllInThings",
  description: "All things to create",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning >
        <body
          className={`${manrope.className} no-scrollbar bg-black antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"

            
          >
            <ReduxProvider>
            <ReactQueryProvider>
            {children}
            <Toaster/>
            </ReactQueryProvider>
            </ReduxProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
