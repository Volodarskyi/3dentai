import { Metadata } from "next";

import { DentistPage } from "@/appPages/DentistPage/DentistPage";
import {UserPage} from "@/appPages/UserPage/UserPage";

export const metadata: Metadata = {
    title: "3DentAI - User",
};

export default function Dentist() {
    return <UserPage/>;
}
