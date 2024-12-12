"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import { UserProvider } from "../contexts/userContext";
import "./globals.css";
import Nav from "../components/Nav.jsx";
import Footer from "../components/FooterCus.jsx";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={inter.className}>
        <UserProvider>
          <Nav />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
