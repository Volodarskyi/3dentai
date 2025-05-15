import { Metadata } from "next";

import { SolutionsPage } from "@/appPages/SolutionsPage/SolutionsPage";

export const metadata: Metadata = {
  title: "3DentAI | Solutions",
};

export default function Solutions() {
  return <SolutionsPage />;
}
