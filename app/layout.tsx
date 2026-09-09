import type { Metadata } from "next";
import { Baloo_2, Inter } from "next/font/google";
import { Providers } from "@/components/shared/Providers";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { APP_NAME } from "@/lib/constants";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} | Find apprentices and junior trades talent`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Search young trades candidates by trade and location, then contact them directly. Candidates create a free profile and get found by employers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body
        className={`${baloo.variable} ${inter.variable} min-h-screen bg-workshop-white font-sans text-ink antialiased`}
      >
        <Providers>
          <SiteHeader />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
