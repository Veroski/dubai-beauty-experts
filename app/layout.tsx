import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dubai Beauty Experts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

