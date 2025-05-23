import { Metadata } from "next";
import {UserPageProtected} from "@/appPages/UserPage/UserPage";

export const metadata: Metadata = {
    title: "3DentAI - User",
};

export default function User() {
    return <UserPageProtected/>;
}
