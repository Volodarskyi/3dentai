"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import Authorization from "@/components/Authorization";
import Loading from "@/components/Loading";
import Navigation from "@/components/Navigation";
import { useStores } from "@/hooks/useStores";
import { ISteps } from "@/types/steps";

import Processor from "./components/Progress";
import Steps from "./components/Steps";

const initSteps: ISteps[] = [
  { name: "Step 1", description: "Upload video (photo)." },
  { name: "Step 2", description: "Send to Chat GPT API and receive response." },
  { name: "Step 3", description: "Convert photo to 3D." },
];

const ScanScreen = () => {
  const { scanStore } = useStores();
  const { setSteps, steps } = scanStore;

  useEffect(() => {
    setSteps(initSteps);
  }, [setSteps]);

  return (
    <div className="bg-white min-h-svh flex items-center flex-col">
      {steps.length ? (
        <>
          <Processor />
          <Steps />
          <Navigation />
          <Authorization />
        </>
      ) : (
        <div className={"min-h-56 w-full flex justify-center items-center"}>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default observer(ScanScreen);
