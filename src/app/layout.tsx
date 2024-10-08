import type { Metadata } from "next";
import "./globals.css";
import { Afacad } from "next/font/google";

const afacad = Afacad({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FPL's Magnificent 7",
  description: "How have been the stars of the season so far?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={afacad.className}>{children}</body>
    </html>
  );
}
