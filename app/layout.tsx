import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from 'next/font/google';
import "./globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import Header from "@/Components/partials/Navbar";
import Footer from "@/Components/partials/Footer";
import MouseLight from "@/Components/shared/MouseLight";
import GoogleAnalytics from "@/Components/shared/GoogleAnalytics";

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tech-abyss.com'),
  title: {
    default: "Tech Abyss | Full-Stack Engineering & Strategy",
    template: "%s | Tech Abyss"
  },
  description: "High-performance web applications, scalable architecture, and strategic digital solutions. Expert full-stack development by Bikash Chapagain.",
  keywords: ["Full-Stack Developer", "Next.js", "React", "Node.js", "Web Engineering", "Software Strategy", "Tech Abyss", "Bikash Chapagain", "Belgium Developer", "Full-Stack Development Belgium"],
  authors: [{ name: "Bikash Chapagain", url: "https://linkedin.com/in/b-kash" }],
  creator: "Bikash Chapagain",
  publisher: "Tech Abyss",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Tech Abyss | Full-Stack Engineering & Strategy",
    description: "Building the future of the web with precision, high-performance architecture, and strategic digital excellence.",
    url: "https://tech-abyss.com",
    siteName: "Tech Abyss",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tech Abyss - Professional Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Abyss | Full-Stack Engineering",
    description: "Building high-performance web applications and scalable systems with precision.",
    images: ["/og-image.png"],
    creator: "@b_kash",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={`${bricolage.variable} ${inter.variable} antialiased  text-white font-bricolage relative`}>
        <GoogleAnalytics />
        <MouseLight />
        <MantineProvider defaultColorScheme="dark">
          <div className="relative z-20">
            <Header />
          </div>
          <main className="min-h-screen relative z-10">
            {children}
          </main>
          <div className="relative z-20">
            <Footer />
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
