import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { Providers } from "@/store/providers";
import { ToastProvider } from "@/context/ToastContext";
import CheckAuth from "./client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Turnos médicos",
  description: "Aplicación web para turnos médicos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <CheckAuth />
          <ToastProvider>{children}</ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
