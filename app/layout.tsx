import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ViewTransitionProvider } from "@components/view-transition"
import { translations } from "@/lib/i18n"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// Default metadata (can be overridden by pages)
// Default to Romanian as per app default
const defaultLang: "ro" | "en" = "ro"
const t = translations[defaultLang]

export const metadata: Metadata = {
  title: {
    default: t.siteTitle,
    template: `%s | ${t.siteTitle}`,
  },
  description: t.siteDescription,
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  other: {
    "view-transition": "same-origin",
  },
  openGraph: {
    title: t.siteTitle,
    description: t.siteDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: t.siteTitle,
    description: t.siteDescription,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ViewTransitionProvider>
          {children}
        </ViewTransitionProvider>
        <Analytics />
      </body>
    </html>
  )
}
