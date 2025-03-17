import { FC } from "react";
import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";

// interface IDentistsHubSection {
// }

const DentistsHubSectionComponent: FC = () => {
  return (
    <div className={"mobileSection"} id="dentist-hub">
      <div className={"mobileSection__wrapper"}>
        <Row>
          <Col span={24}>
            <h2 className={"sectionTitle"}>dental hub</h2>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export const DentistsHubSection = observer(DentistsHubSectionComponent);
