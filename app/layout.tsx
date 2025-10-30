import type React from "react"
import type { Metadata } from "next"
import { Share_Tech } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

const shareTech = Share_Tech({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech",
})

export const metadata: Metadata = {
  title: "TechScrawl - AI-Powered App Orchestration",
  description: "Enterprise-grade AI-Powered App Orchestration & Analytics Platform",
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico", // 👈 This points to your public/favicon.ico
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>  
 <link rel="icon" href="/favicon.png" type="image/png" /> 
      </head>
      <body className={`${shareTech.variable} font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
