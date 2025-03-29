import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { SolutionNavigation } from "@/components/modules/Footer/components/SolutionsNavigation/SolutionsNavigation";

import AuthNavigation from "./components/AuthNavigation";
import ScanNavigation from "./components/ScanNavigation";

import "./footer.styles.scss";

const getFooter: Record<string, ReactNode> = {
  "/": <AuthNavigation />,
  "/scan": <ScanNavigation />,
  "/solutions": <SolutionNavigation />,
};

const Footer = () => {
  const pathname = usePathname();

  return <div className={"footer"}>{getFooter[pathname]}</div>;
};

export default Footer;
