import { Metadata } from "next";

import { ComingSoonPage } from "@/appPages/ComingPage/ComingSoonPage";
import {DevPage} from "@/appPages/DevPage/DevPage";

export const metadata: Metadata = {
    title: "3DentAI | Dev",
};

export default function Solutions() {
    return <DevPage/>;
}
