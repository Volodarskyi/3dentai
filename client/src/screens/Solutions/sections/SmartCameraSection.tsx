import { FC } from "react";
import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import phoneURL from "@/assets/images/3DentAI_camera-brush_v1_CLEANPNG.png";
import cloudURL from "@/assets/images/CLOUD_3dentai-icon-hologram 1.png";
import homeURL from "@/assets/images/HOME_3dentai-icon-hologram 1.png";
import lensURL from "@/assets/images/LENS_3dentai-icon-hologram 1.png";

import "../SolutionsScreen.styles.scss";

// interface ISmartCameraSection {
// }

const SmartCameraSectionComponent: FC = () => {
  return (
    <div className={"mobileSection"} id="smart-camera">
      <div className={"mobileSection__wrapper"}>

        <Row>
          <Col span={10}>
            <div className={"mobileSection__imageWrapper"}>
              <Image
                src={phoneURL}
                alt={"phone"}
                width={120}
                className={"mobileSection__image"}
              />
            </div>
          </Col>
          <Col span={2} />
          <Col span={12}>
            <div className={"mobileSection__content"}>
              <div className={"mobileSection__textWrapper"}>
                Thanks to advanced imaging technology, our oral camera creates a
                detailed 3D model of your oral cavity, allowing dentists to
                perform precise remote examinations at any time.
              </div>

              <div className={"mobileSection__buttonGroup"}>
                <div className={"mobileSection__button"}>
                  <Image src={homeURL} width={52} height={52} alt={" "} />
                  Convenient and Accessible for Home Use
                </div>
                <div className={"mobileSection__button"}>
                  <Image src={lensURL} width={52} height={52} alt={" "} />
                  Smart and Advanced Auto-Calibration
                </div>
                <div className={"mobileSection__button"}>
                  <Image src={cloudURL} width={52} height={52} alt={" "} />
                  Secure and Reliable Cloud 3D Model Storage
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export const SmartCameraSection = observer(SmartCameraSectionComponent);
