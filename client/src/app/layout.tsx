import { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { Saira } from "next/font/google";

import "./globals.scss";
import "@/styles/index.scss";
import "@/styles/styles.css";

const saira = Saira({
  subsets: ["latin"],
  weight: ["400", "700"], // Add desired font weights
  variable: "--font-saira", // Optional: for CSS variables
});

export const metadata: Metadata = {
  title: "3DentAI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={saira.variable}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
