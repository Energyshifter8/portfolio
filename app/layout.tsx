import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CursorTrailEffect from "@/components/ui/CursorTrailEffect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "[YH] — Дизайнер & Хөгжүүлэгч",
  description: "Чөлөөт дизайнер, хөгжүүлэгчид зориулсан хар бараан, редакцын, Swiss/терминалаас сэдэвлэсэн портфолио.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-foreground selection:text-background">
        <CursorTrailEffect 
          particleCount={40} 
          baseSize={10} 
          color="#00FF00" 
          stiffness={300}
          damping={30}
        />
        {children}
      </body>
    </html>
  );
}
