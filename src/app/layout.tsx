import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "@/app/globals.css";
import "./globals.css"
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme";
import ReactQueryProvider from "@/react-query";



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
          className={`${manrope.className} bg-[#171717] antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"

            
          >
            <ReactQueryProvider>
            {children}
            </ReactQueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
