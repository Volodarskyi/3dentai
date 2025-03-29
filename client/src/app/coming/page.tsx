import { Metadata } from "next";

import { ComingSoonScreen } from "@/screens/Coming/ComingSoonScreen";

export const metadata: Metadata = {
  title: "3DentAI | Coming Soon",
};

export default function Solutions() {
  return <ComingSoonScreen />;
}
