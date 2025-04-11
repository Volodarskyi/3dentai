"use client";

import { Row } from "antd";
import { observer } from "mobx-react-lite";

import ScanSteps from "../../components/modules/ScanSteps";

import "./ScanPage.Styles.scss";

const ScanPageComponent = () => {
  return (
    <Row className={"scanScreen"}>
      <ScanSteps />
    </Row>
  );
};

export const ScanPage = observer(ScanPageComponent);
