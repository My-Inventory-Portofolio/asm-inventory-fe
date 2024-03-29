import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import "../styles/globals.css"
import type { Metadata } from "next"
import { PrimeReactProvider } from "primereact/api"

export const metadata: Metadata = {
  title: "ASM Inventory",
  description: "Web Inventory ASM",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PrimeReactProvider>
      <html lang="en">
        <head>
          <link
            rel="shortcut icon"
            href="https://erp.sampurna-group.com/assets/layout/images/logo-white.png"
          />
        </head>
        <body>{children}</body>
      </html>
    </PrimeReactProvider>
  )
}
