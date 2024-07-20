import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import "../globals.css"

export const metadata = {
  title: "Next Threads",
  description: "A Next Threads Application",
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider afterSignOutUrl={"/"}>
      <html lang="en">
        <body className={ `${inter.className} bd-dark-1` }>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}