"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import { UserProvider } from "../contexts/userContext";
import "./globals.css";
import Nav from "../components/Nav.jsx";
import Footer from "../components/FooterCus.jsx";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();

  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <UserProvider>
          {!pathName.includes("dashboard") && <Nav />}
          <div className="flex-grow">{children}</div>
          {!pathName.includes("dashboard") && <Footer />}
        </UserProvider>
      </body>
    </html>
  );
}
