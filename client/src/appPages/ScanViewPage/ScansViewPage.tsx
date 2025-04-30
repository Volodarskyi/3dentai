"use client";

import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useStores } from "@/hooks/useStores";

import "./ScansViewPage.Styles.scss";

interface Scan {
  scanId: string;
}

const ScansViewPageComponent: FC<Scan> = ({ scanId }) => {
  const { scansViewStore } = useStores();

  useEffect(() => {
    if (scanId) {
      scansViewStore.setScanID(scanId);
    }
  }, [scanId, scansViewStore]);

  return (
    <div className="scans-view">
      <h1 className="scans-view_title">Scan Viewer</h1>
      <p className="scans-view_subtitle">
        ✅ scanID has been saved to the store:{scansViewStore.getScanID()}
      </p>
    </div>
  );
};

export default observer(ScansViewPageComponent);
