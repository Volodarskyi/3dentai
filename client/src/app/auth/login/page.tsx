import { Metadata } from "next";

import AuthScreen from "@/screens/AuthLogin";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return <AuthScreen />;
}
