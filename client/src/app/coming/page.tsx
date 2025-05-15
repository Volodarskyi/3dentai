import { Metadata } from "next";

import { ComingSoonPage } from "@/appPages/ComingPage/ComingSoonPage";

export const metadata: Metadata = {
  title: "3DentAI | Coming Soon",
};

export default function Solutions() {
  return <ComingSoonPage />;
}
