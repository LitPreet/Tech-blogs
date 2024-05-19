import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/nav/Navbar";
import SessionProvider from "@/components/session-provider";
import { Toaster } from "@/components/ui/toaster";
import Icon from "@/public/publication.png";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Tech blogs",
    default: "Tech blogs",
  },
  authors: {
    name: "Preet Bhardwaj",
  },
  description:
    "Unlock a world of coding insights and knowledge on our tech blog, where each article helps you master programming and stay ahead in the dynamic tech landscape",
  openGraph: {
    title: "Daily Blog",
    description:
      "Explore a world of captivating stories and insightful articles on our blog. From the latest trends to in-depth analyses, our blog covers a wide range of topics to keep you informed and entertained. Join our community of readers and discover thought-provoking content that sparks curiosity and fosters discussion. Stay updated with our diverse collection of blog posts, written by passionate contributors who share their expertise and unique perspectives. Engage with a platform that goes beyond the ordinary, providing you with enriching content that resonates with your interests.",
    url: "https://tech-blogs2.vercel.app/",
    siteName: "Tech Blogs",
    images: "/og.png",
    type: "website",
  },
  keywords: ["Tech Blog", "preet bhardwaj", "techblogs"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="max-w-7xl mx-auto p-10 space-y-10">
            <Navbar />
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <SessionProvider />
        <Footer />
      </body>
    </html>
  );
}
