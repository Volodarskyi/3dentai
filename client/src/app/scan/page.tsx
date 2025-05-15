import { Metadata } from "next";

import { ScanPage } from "@/appPages/ScanPage/ScanPage";

export const metadata: Metadata = {
  title: "3DentAI - Scan",
};

export default function Scan() {
  return <ScanPage />;
}
