"use client";

import { ReactNode } from "react";
import { Layout, Row } from "antd";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { StoreWrapper } from "@/store/provider";

const { Content } = Layout;

interface TemplateProps {
  readonly children: ReactNode;
}

function Template(props: TemplateProps) {
  const { children } = props;

  return (
    <StoreWrapper>
      <Header />
      <Content
        style={{
          padding: "0 48px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Row className={"max-w-7xl"} style={{ width: "100%" }}>
          {children}
        </Row>
      </Content>
      <Footer />
    </StoreWrapper>
  );
}

export default Template;
