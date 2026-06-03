import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "The V Spot — Marketing Tools",
  description: "Marketing tools for The V Spot, powered by Hedgehog Marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#F1F1F1]">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="py-4 px-6 text-center text-xs text-[#1B1918]/40">
          Powered by Hedgehog Marketing
        </footer>
      </body>
    </html>
  );
}
