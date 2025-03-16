import { FC } from "react";
import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import phoneURL from "@/assets/images/3DentAI_camera-brush_v1_CLEANPNG.png";

import "../SolutionsScreen.styles.scss";

// interface ISmartCameraSection {
// }

const SmartCameraSectionComponent: FC = () => {
  return (
    <section className={"mobileSection"} id="smart-camera">
      <Row>
        <Col span={24}>
          <h2 className={"sectionTitle"}>personal AI dentist</h2>
        </Col>
      </Row>
      <Row>
        <Col span={12} className={"mobileSection__imageWrapper"}>
          <Image
            src={phoneURL}
            alt={"phone"}
            width={120}
            className={"mobileSection__image"}
          />
        </Col>
        <Col span={12} className={"mobileSection__content"}>
          <div className={"mobileSection__textWrapper"}>
            Thanks to advanced imaging technology, our oral camera creates a
            detailed 3D model of your oral cavity, allowing dentists to perform
            precise remote examinations at any time.
          </div>

          <div className={"mobileSection__buttonGroup"}>
            <div className={"mobileSection__button"}>
              Convenient and Accessible for Home Use
            </div>
            <div className={"mobileSection__button"}>
              Smart and Advanced Auto-Calibration
            </div>
            <div className={"mobileSection__button"}>
              Secure and Reliable Cloud 3D Model Storage
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export const SmartCameraSection = observer(SmartCameraSectionComponent);
