"use client";
import { FC } from "react";
import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";

import { UiEmailLink } from "@/components/UI/UiEmailLink/UiEmailLink";

import "./ComingSoonScreen.Styles.scss";

const ComingSoonScreenComponent: FC = () => {
  return (
    <div className="coming-soon">
      <div className="coming-soon__background" />
      <h1 className="coming-soon__title">Coming Soon!</h1>
      <Row>
        <Col xs={24}>
          <h2 className="coming-soon__sectionTitle">Let’s Keep in Touch</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={{ span: 12, offset: 6 }}>
          <div className="coming-soon__text">
            Still in Progress — Stay Tuned! Our team is hard at work developing
            and testing our products. It won’t be long before we’re ready to
            share them with you. In the meantime, we’d love to stay connected.
            Questions or suggestions? Send us a message at{" "}
            <UiEmailLink email={"office@3dentai.ca"} />.
          </div>
        </Col>
      </Row>

      {/*DENTAL*/}
      <Row>
        <Col xs={24}>
          <h2 className="coming-soon__sectionTitle">
            Join the Future of Dental AI
          </h2>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={{ span: 12, offset: 6 }}>
          <div className="coming-soon__text">
            We’re inviting dental professionals to be part of something special.
            Your expertise will help shape a tool made with dentists in mind and
            contribute to the future of AI in dentistry.
            <br />
            <br />
            You can:
            <br />
            1. <strong>Join our focus group</strong> – Share your expertise
            through short surveys. <br />
            2. <strong>Train the AI model</strong> – Use a simple,
            dentist-friendly platform created just for you. <br />
            3. <strong>Be a beta tester</strong> – Get early access to the tools
            you help shape.
            <br />
            <br />
            Your participation matters — together, we can shape the future of
            digital dentistry.
            <br />
            <br />
            Interested? Reach out to us at{" "}
            <UiEmailLink email={"dental@3dentai.ca"} />.
          </div>
        </Col>
      </Row>

      {/*INVESTOR*/}
      <Row>
        <Col xs={24}>
          <h2 className="coming-soon__sectionTitle">Invest in the Future</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={{ span: 12, offset: 6 }}>
          <div className="coming-soon__text">
            We’re on a mission to transform dental care through smart,
            accessible technology powered by AI.
            <br />
            <br />
            We’re currently open to early-stage investors who want to support
            innovation at the intersection of healthcare and artificial
            intelligence.
            <br />
            <br />
            📩 To book a one-on-one presentation and see a live demo of our
            product, reach us at <UiEmailLink email={"business@3dentai.ca"} />.
            <br />
            <br />
            Let’s talk about how we can build the future — together.
          </div>
        </Col>
      </Row>
    </div>
  );
};

export const ComingSoonScreen = observer(ComingSoonScreenComponent);
