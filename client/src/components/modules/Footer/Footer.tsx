import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import AuthNavigation from "./components/AuthNavigation";
import ScanNavigation from "./components/ScanNavigation";

import "./footer.styles.scss";

const getFooter: Record<string, ReactNode> = {
  "/": <AuthNavigation />,
  "/scan": <ScanNavigation />,
};

const Footer = () => {
  const pathname = usePathname();

  return <div className={"footer"}>{getFooter[pathname]}</div>;
};

export default Footer;
