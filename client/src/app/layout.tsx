import { ReactNode } from "react";
import type { Metadata } from "next";

import "./globals.scss";
import "@/styles/index.scss";

export const metadata: Metadata = {
  title: "3DentAI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
