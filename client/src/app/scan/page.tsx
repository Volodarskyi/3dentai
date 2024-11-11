import { Metadata } from "next";

import ScanScreen from "@/screens/Scan";

export const metadata: Metadata = {
  title: "3DentAI - Scan",
};

export default function Scan() {
  return <ScanScreen />;
}
