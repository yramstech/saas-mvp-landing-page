import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HireRoom — Paste the job. Get the CV. Land the interview.",
  description:
    "HireRoom auto-tailors your resume for every job posting in 30 seconds. Bullets re-ordered. Keywords matched. Irrelevant lines hidden. No more rewriting.",
  openGraph: {
    title: "HireRoom — Paste the job. Get the CV. Land the interview.",
    description:
      "AI-tailored CVs in 30 seconds. Built on Claude. First 100 waitlist signups get it free at launch.",
    url: "https://hireroom.yramstech.com",
    siteName: "HireRoom",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HireRoom — AI CV tailoring in 30 seconds",
    description:
      "Paste the job. Get the CV. Land the interview. Built on Claude AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
