"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "next/navigation";

import { useStores } from "@/hooks/useStores";

import "./ScansViewPage.Styles.scss";

const ScansViewPageComponent = () => {
  const searchParams = useSearchParams();
  const { scansViewStore } = useStores();
  const scanID = searchParams.get("scanID");

  useEffect(() => {
    if (scanID) {
      scansViewStore.setScanID(scanID);
    }
  }, [scanID, scansViewStore]);

  return (
    <div className="scans-view">
      <h1 className="scans-view_title">Scan Viewer</h1>
      <p className="scans-view_subtitle">
        ✅ scanID has been saved to the store:{scansViewStore.getScanID()}
      </p>
    </div>
  );
};

export const ScansViewPage = observer(ScansViewPageComponent);
