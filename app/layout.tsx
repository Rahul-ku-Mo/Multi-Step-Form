import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/libs/queryClient";
import { FormProvider } from "@/context/FormContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Multi step Form",
  description: "A multi step form built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <FormProvider>{children}</FormProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
