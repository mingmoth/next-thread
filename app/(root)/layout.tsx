import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google";
import "../globals.css";
// types
import type { Metadata } from "next";
// components
import TopBar from "@/components/shared/TopBar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import BottomBar from "@/components/shared/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Threads",
  description: "A Next Threads Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <TopBar />
        <main className="flex flex-row">
          <LeftSidebar />
          <section className="main-container">
            <div className="w-full max-w-4xl">
              { children }
            </div>
          </section>
          <RightSidebar />
        </main>
        <BottomBar />
      </body>
    </html>
    </ClerkProvider>
  );
}
