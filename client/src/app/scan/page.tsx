"use client";

import { useEffect } from "react";

import Steps from "@/app/scan/components/Steps";
import { useStores } from "@/hooks/useStores";
import { ISteps } from "@/types/steps";

import Navigation from "./components/Navigation";
import Processor from "./components/Progress";

const steps: ISteps[] = [
  { name: "Step 1", description: "Upload video (photo)." },
  { name: "Step 2", description: "Send to Chat GPT API and receive response." },
  { name: "Step 3", description: "Convert photo to 3D." },
];

const Scan = () => {
  const { scanStore } = useStores();
  const { setSteps } = scanStore;

  useEffect(() => {
    setSteps(steps);
  }, [setSteps]);

  return (
    <div className="bg-white min-h-svh flex items-center flex-col">
      <Processor />
      <Steps />
      <Navigation />
    </div>
  );
};

export default Scan;
