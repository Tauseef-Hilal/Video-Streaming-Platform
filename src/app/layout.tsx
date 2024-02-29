import "@/global/globals.css";
import type { Metadata } from "next";

import data from "@/lib/metadata";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import ApolloWrapper from "../components/ApolloWrapper";
import { roboto } from "@/global/fonts";
import { SCROLLBAR_BG } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL ?? "https://localhost:3000"),
  ...data,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content={`${SCROLLBAR_BG}`} />
      </head>
      <ApolloWrapper>
        <body className={`${roboto.className}`}>
          <Header />
          <div className="flex">
            <Sidebar className="pt-2" />
            <main className="min-h-screen w-full pt-[68px] p-4">
              {children}
            </main>
          </div>
        </body>
      </ApolloWrapper>
    </html>
  );
}
