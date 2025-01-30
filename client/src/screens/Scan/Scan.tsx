"use client";

import { Row } from "antd";
import { observer } from "mobx-react-lite";

import ScanSteps from "../../components/modules/ScanSteps";

import "./scanScreen.styles.scss";

const ScanScreen = () => {
  return (
    <Row className={"scanScreen"}>
      <ScanSteps />
    </Row>
  );
};

export default observer(ScanScreen);
