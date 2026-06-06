import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  style: ['italic', 'normal']
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vinaygogula.site"),
  title: {
    default: "Vinay Gogula | Video Editor",
    template: "%s | Vinay Gogula",
  },
  description: "Professional video editor portfolio showcasing creative and high-quality video editing projects by Vinay Gogula.",
  keywords: [
    "Vinay Gogula",
    "Video Editor",
    "Video Editing",
    "Portfolio",
    "Freelance Video Editor",
    "Creative Editor",
    "Content Creator",
    "Video Production"
  ],
  authors: [{ name: "Vinay Gogula" }],
  creator: "Vinay Gogula",
  publisher: "Vinay Gogula",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vinaygogula.site",
    title: "Vinay Gogula | Professional Video Editor",
    description: "Professional video editor portfolio showcasing creative and high-quality video editing projects by Vinay Gogula.",
    siteName: "Vinay Gogula Portfolio",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Vinay Gogula - Video Editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinay Gogula | Professional Video Editor",
    description: "Professional video editor portfolio showcasing creative and high-quality video editing projects by Vinay Gogula.",
    images: ["/image.png"],
    creator: "@vinaygogula",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
