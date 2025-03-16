import { FC } from "react";
import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import phoneURL from "@/assets/images/3dentai-mockup-iphone16_v3.png";

import "../SolutionsScreen.styles.scss";

const AiMobileSectionComponent: FC = () => {
  return (
    <section className={"mobileSection"} id={"ai-mobile"}>
      <Row>
        <Col span={24}>
          <h2 className={"sectionTitle"}>3D ORAL CAMERA</h2>
        </Col>
      </Row>
      <Row>
        <Col span={12} className={"mobileSection__content"}>
          <div className={"mobileSection__textWrapper"}>
            Our AI-powered technology enables primary examination and analysis
            of the oral cavity at home using a specialized camera. This helps
            detect dental, gum, and mucosal diseases, including oral cancer, at
            an early stage. Early diagnosis prevents serious complications,
            making treatment faster, more comfortable, and more affordable.
          </div>

          <div className={"mobileSection__buttonGroup"}>
            <div className={"mobileSection__button"}>
              Uniqueness – No analogs on the market.
            </div>
            <div className={"mobileSection__button"}>
              AI model Trained by certified dentists
            </div>
            <div className={"mobileSection__button"}>
              Diagnoses 9 of the most common conditions
            </div>
          </div>
        </Col>
        <Col span={12} className={"mobileSection__imageWrapper"}>
          <Image
            src={phoneURL}
            alt={"phone"}
            width={280}
            className={"mobileSection__image"}
          />
        </Col>
      </Row>
    </section>
  );
};

export const AiMobileSection = observer(AiMobileSectionComponent);
