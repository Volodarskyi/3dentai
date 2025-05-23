"use client";

import { Row } from "antd";
import { observer } from "mobx-react-lite";

import ScanSteps from "../../components/modules/ScanSteps";

import "./ScanPage.Styles.scss";
import {withAuth} from "@/hoc/WithAuth/withAuth";
import {EUserRole} from "@/types/enums/userEnums";

const ScanPageComponent = () => {
  return (
    <Row className={"scanScreen"}>
      <ScanSteps />
    </Row>
  );
};

const ScanPage = observer(ScanPageComponent);
export const ScanPageProtected = withAuth(ScanPage, [EUserRole.USER]) // ✅ here