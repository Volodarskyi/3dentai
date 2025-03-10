import { Metadata } from "next";

import { SolutionsScreen } from "@/screens/Solutions/SolutionsScreen";

export const metadata: Metadata = {
  title: "3DentAI | Solutions",
};

export default function Solutions() {
  return <SolutionsScreen />;
}
