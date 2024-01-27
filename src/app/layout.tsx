import type { Metadata } from "next";
import "@/global/globals.css";

import data from "@/lib/metadata";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { roboto } from "@/global/fonts";

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
      <body className={roboto.className + " overflow-hidden w-full"}>
        <Header />
        <div className="flex h-full">
          <Sidebar />
          <main className="p-4 h-full w-full overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
