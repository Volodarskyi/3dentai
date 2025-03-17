import { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";

import "./globals.scss";
import "@/styles/index.scss";
import "@/styles/styles.css";

export const metadata: Metadata = {
  title: "3DentAI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
