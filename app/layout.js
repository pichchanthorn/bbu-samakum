import { Kantumruy_Pro, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import AppShell from "@/components/AppShell";

const kantumruyPro = Kantumruy_Pro({
  variable: "--font-kantumruy-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const description =
  "The verified community for Build Bright University's IT Department — students and lecturers only.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BBU Samakum — IT Department",
    template: "%s — BBU Samakum",
  },
  description,
  openGraph: {
    title: "BBU Samakum — IT Department",
    description,
    url: "/",
    siteName: "BBU Samakum",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BBU Samakum — IT Department",
    description,
  },
};

export const viewport = {
  themeColor: "#142E28",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${kantumruyPro.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
