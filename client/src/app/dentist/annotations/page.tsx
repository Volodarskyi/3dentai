import { Metadata } from "next";
import {AnnotationsPageProtected} from "@/appPages/AnnotationsPage/AnnotationsPage";


export const metadata: Metadata = {
  title: "3DentAI - Annotations",
};

export default function Annotations() {
  return <AnnotationsPageProtected />;
}
