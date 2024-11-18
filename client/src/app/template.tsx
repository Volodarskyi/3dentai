"use client";

import {ReactNode} from "react";
import {usePathname} from "next/navigation";

import Header from "@/components/Header";
import {StoreWrapper} from "@/store/provider";
import {Footer} from "@/components/Footer/Footer";
import {UiModal} from "@/components/UI/UiModal/UiModal";


interface TemplateProps {
    readonly children: ReactNode;
}

function Template(props: TemplateProps) {
    const {children} = props;

    const pathname = usePathname();

    if (pathname === "/scan") {
        console.log("display or hide footer");
    }

    return (
        <StoreWrapper>
            <Header/>
            {children}
            <UiModal/>
            <Footer/>
        </StoreWrapper>
    );
}
export default Template;
