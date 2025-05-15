import { FC } from "react";
import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";

// import Image from "next/image";
import { UiIcon } from "@/components/UI/UiIcon/UiIcon";

import "../SolutionsPage.Styles.scss";

// import phoneURL from "@/assets/images/3dentai-mockup-iphone16_v3.png";
// import cartificateURL from "@/assets/images/CERTIFICATE_3dentai-icon-hologram 1.png";
// import diagnosesURL from "@/assets/images/DIAGNOSES_3dentai-icon-hologram 1.png";
// import unicURL from "@/assets/images/UNIC_3dentai-icon-hologram 1.png";

const AiMobileSectionComponent: FC = () => {
  return (
    <div className={"mobileSection"} id={"ai-mobile"}>
      <div className={"mobileSection__wrapper"}>
        <Row>
          <Col xs={24}>
            <h2 className={"sectionTitle"}>PERSONAL AI DENTIST</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={12}>
            <div className={"mobileSection__content"}>
              <div className={"mobileSection__textWrapper"}>
                Our AI-powered technology enables primary examination and
                analysis of the oral cavity at home using a specialized camera.
                This helps detect dental, gum, and mucosal diseases, including
                oral cancer, at an early stage. Early diagnosis prevents serious
                complications, making treatment faster, more comfortable, and
                more affordable.
              </div>

              <div className={"mobileSection__buttonGroup"}>
                <div className={"mobileSection__button"}>
                  {/*<Image src={unicURL} width={52} height={52} alt={" "} />*/}
                  <UiIcon
                    name="unic-hologram"
                    idIcon="unic-hologram"
                    size={52}
                  />
                  Uniqueness – No analogs on the market.
                </div>
                <div className={"mobileSection__button"}>
                  <UiIcon
                    name="certificate-hologram"
                    idIcon="diagnoses-hologram"
                    size={52}
                  />
                  {/*<Image src={diagnosesURL} width={52} height={52} alt={" "} />*/}
                  AI model Trained by certified dentists
                </div>
                <div className={"mobileSection__button"}>
                  {/*<Image*/}
                  {/*  src={cartificateURL}*/}
                  {/*  width={52}*/}
                  {/*  height={52}*/}
                  {/*  alt={" "}*/}
                  {/*/>*/}
                  <UiIcon
                    name="diagnoses-hologram"
                    idIcon="diagnoses-hologram"
                    size={52}
                  />
                  Diagnoses 9 of the most common conditions
                </div>
              </div>
            </div>
          </Col>
          <Col xs={0} md={2} />
          <Col span={24} md={10}>
            <div className={"mobileSection__imageWrapper"}>
              <img
                src={"/assets/images/3dentai-mockup-iphone16_v3.png"}
                alt={"phone"}
                width={280}
                height={280}
                className={"mobileSection__image"}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export const AiMobileSection = observer(AiMobileSectionComponent);
