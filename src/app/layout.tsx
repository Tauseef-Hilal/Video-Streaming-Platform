import "@/global/globals.css";
import type { Metadata } from "next";

import data from "@/lib/metadata";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import AuthProvider from "@/context/AuthContext";
import ApolloWrapper from "../components/ApolloWrapper";
import { roboto } from "@/global/fonts";
import { SCROLLBAR_BG } from "@/lib/constants";
import { Suspense } from "react";

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
        <AuthProvider>
          <body className={`${roboto.className}`}>
            <Suspense>
              <Header />
            </Suspense>
            <div className="flex">
              <Sidebar className="pt-2" />
              <main className="min-h-screen w-full pt-[68px]">{children}</main>
            </div>
          </body>
        </AuthProvider>
      </ApolloWrapper>
    </html>
  );
}
