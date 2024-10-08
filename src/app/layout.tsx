import type { Metadata } from "next";
import "./globals.css";
import { Afacad } from "next/font/google";

const afacad = Afacad({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FPL's Magnificent 7",
  description:
    "Who have been the stars of the Fantasy Premier League season so far?",
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
