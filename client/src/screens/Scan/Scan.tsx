"use client";

import { Row } from "antd";
import { observer } from "mobx-react-lite";

import GlobalLoading from "@/components/GlobalLoading";
import Loading from "@/components/Loading";
import BottomNavigation from "@/containers/BottomNavigation";
import ScanSteps from "@/containers/ScanSteps";
import { useStores } from "@/hooks/useStores";

import ScanNavigation from "./components/ScanNavigation";

import styles from "./scan.module.scss";

const ScanScreen = () => {
  const { scanStore } = useStores();
  const { isLoading } = scanStore;

  return (
    <>
      <Row className={styles.page}>
        {isLoading && <GlobalLoading />}
        {!isLoading ? (
          <ScanSteps />
        ) : (
          <div className={"min-h-56 w-full flex justify-center items-center"}>
            <Loading />
          </div>
        )}
      </Row>
      <BottomNavigation>
        <ScanNavigation />
      </BottomNavigation>
    </>
  );
};

export default observer(ScanScreen);
