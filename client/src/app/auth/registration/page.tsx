import { Metadata } from "next";

import RegistrationScreen from "@/screens/AuthRegistration";

export const metadata: Metadata = {
  title: "Registration",
};

export default function Registration() {
  return <RegistrationScreen />;
}
