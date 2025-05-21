import { Tabs as AntTabs } from "antd";

import "./tabs.styles.scss";

const onChange = (key: string) => {
  console.log(key);
};

import type { TabsProps } from "antd";

type TabsComponentProps = {
  items: TabsProps["items"];
};

const Tabs = ({ items }: TabsComponentProps) => (
  <div className="tabs">
    <AntTabs
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
      className={"tabs"}
      tabBarGutter={4}
    />
  </div>
);

export default Tabs;
