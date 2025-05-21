"use client";

import { FC, useEffect } from "react";
import type { TabsProps } from "antd";
import { observer } from "mobx-react-lite";

import Tabs from "@/components/modules/Tabs";
import { useStores } from "@/hooks/useStores";
import AIResultsIcon from "@/icons/ai-result.svg";
import MessagesIcon from "@/icons/messages.svg";
import PhotoIcon from "@/icons/photo.svg";
import QuestionsIcon from "@/icons/questions.svg";

import PhotoTab from "./sections/PhotoTab";

import "./ScansViewPage.Styles.scss";

type Scan = {
  scanId: string;
};

const ScansViewPageComponent: FC<Scan> = ({ scanId }) => {
  const { scansViewStore } = useStores();

  useEffect(() => {
    if (scanId) {
      scansViewStore.setScanID(scanId);
    }
  }, [scanId, scansViewStore]);

  const tabData = [
    {
      key: "1",
      icon: PhotoIcon,
      label: "photo",
      content: <PhotoTab />,
    },
    {
      key: "2",
      icon: QuestionsIcon,
      label: "questions",
      content: "Content of Tab Pane 2",
    },
    {
      key: "3",
      icon: AIResultsIcon,
      label: "ai result",
      content: "Content of Tab Pane 3",
    },
    {
      key: "4",
      icon: MessagesIcon,
      label: "messages",
      content: "Content of Tab Pane 4",
    },
  ];

  const items: TabsProps["items"] = tabData.map(
    ({ key, icon: Icon, label, content }) => ({
      key,
      label: (
        <div className="tab-label">
          <Icon width={50} height={50} />
          {label}
        </div>
      ),
      children: <div className="tab-content">{content}</div>,
    }),
  );

  return (
    <div className="scans-view">
      <Tabs items={items} />
    </div>
  );
};

export default observer(ScansViewPageComponent);
