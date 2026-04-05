import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BBCode Editor",
    template: "%s | BBCode Editor",
  },
  description:
    "A real-time BBCode editor with live preview. Supports bold, italic, colors, lists, tables, media and more.",
  keywords: [
    "bbcode",
    "bbcode editor",
    "bbcode parser",
    "online editor",
    "forum editor",
    "bbcode preview",
    "real-time preview",
  ],
  authors: [{ name: "grkndev" }],
  creator: "grkndev",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "BBCode Editor",
    description:
      "A real-time BBCode editor with live preview. Format text easily with the toolbar.",
    siteName: "BBCode Editor",
  },
  twitter: {
    card: "summary",
    title: "BBCode Editor",
    description:
      "A real-time BBCode editor with live preview.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}