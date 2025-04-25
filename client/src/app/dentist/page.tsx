import { Metadata } from "next";

import { DentistPage } from "@/appPages/DentistPage/DentistPage";

export const metadata: Metadata = {
  title: "3DentAI - Dentist",
};

export default function Dentist() {
  return <DentistPage />;
}
