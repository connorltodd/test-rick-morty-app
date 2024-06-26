import type { Metadata } from "next";
import { ApolloWrapper } from "./ApolloWrapper";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "Rick and Morty API Explorer APP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-300 h-100`}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
