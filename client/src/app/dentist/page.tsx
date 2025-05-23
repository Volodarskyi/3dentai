import { Metadata } from "next";
import {DentistPageProtected} from "@/appPages/DentistPage/DentistPage";

export const metadata: Metadata = {
  title: "3DentAI - Dentist",
};

export default function Dentist() {
  return <DentistPageProtected />;
}
