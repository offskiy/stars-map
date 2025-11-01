import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Star Map - Capture Your Special Moment in the Stars",
  description: "Create personalized star maps for weddings, anniversaries, birthdays and memorable occasions. Beautiful custom night sky prints that capture your special moment.",
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
