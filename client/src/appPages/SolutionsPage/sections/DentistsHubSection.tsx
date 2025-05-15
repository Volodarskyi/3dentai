import { FC } from "react";
import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";

import { UiIcon } from "@/components/UI/UiIcon/UiIcon";

// interface IDentistsHubSection {
// }

const DentistsHubSectionComponent: FC = () => {
  return (
    <div className={"mobileSection"} id="dentist-hub">
      <div className={"mobileSection__wrapper"}>
        <Row>
          <Col xs={24}>
            <h2 className={"sectionTitle"}>DENTAL HUB</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <div className={"mobileSection__content"}>
              <div className={"mobileSection__textWrapper"}>
                Our Dental Hub is a smart system for quickly finding and
                seamlessly interacting with your dentist. It includes features
                such as secure messaging, medical history storage, and the
                ability to share high-quality images and 3D models for detailed
                diagnostics.
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={12}>
            <div className={"mobileSection__content"}>
              <div className={"mobileSection__buttonGroup"}>
                <div className={"mobileSection__button"}>
                  <UiIcon
                    name="location-hologram"
                    idIcon="unic-hologram"
                    size={52}
                  />
                  Smart Dentist Search by Location & Needs
                </div>
                <div className={"mobileSection__button"}>
                  <UiIcon
                    name="rating-hologram"
                    idIcon="rating-hologram"
                    size={52}
                  />
                  Verified Reviews and Rating System
                </div>
                <div className={"mobileSection__button"}>
                  <UiIcon
                    name="telemedicine-hologram"
                    idIcon="telemedicine-hologram"
                    size={44}
                  />
                  Seamless Telemedicine Consultations
                </div>
              </div>
            </div>
          </Col>
          <Col xs={0} md={2} />
          <Col span={24} md={10}>
            <div className={"mobileSection__imageWrapper"}>
              {/*<Image*/}
              {/*  src={"/assets/images/3dentai-mock-macbook-hub_v3_1.png"}*/}
              {/*  alt={"phone"}*/}
              {/*  width={120}*/}
              {/*  height={120}*/}
              {/*  className={"mobileSection__image"}*/}
              {/*/>*/}
              <img
                src={"/assets/images/3dentai-mock-macbook-hub_v3_1.png"}
                alt={"phone"}
                className={"mobileSection__image_pc"}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export const DentistsHubSection = observer(DentistsHubSectionComponent);
