import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "stars-map",
  description: "A Next.js application with TypeScript and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
