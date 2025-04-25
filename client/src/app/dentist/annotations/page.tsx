import { Metadata } from "next";

import { AnnotationsPage } from "@/appPages/AnnotationsPage/AnnotationsPage";

export const metadata: Metadata = {
  title: "3DentAI - Annotations",
};

export default function Annotations() {
  return <AnnotationsPage />;
}
