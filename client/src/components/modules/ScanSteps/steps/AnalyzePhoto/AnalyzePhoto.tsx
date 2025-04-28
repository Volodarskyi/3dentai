import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import Loading from "@/components/UI/Loading";
import { useStores } from "@/hooks/useStores";

const AnalyzePhoto = () => {
  const { scanStore } = useStores();
  const {
    imgUrl,
    imgDescription,
    isLoading,
    analyzeImage: analyze,
  } = scanStore;

  useEffect(() => {
    analyze();
  }, [analyze, imgUrl]);

  return (
    <div
      className={
        "flex w-full min-h-96 border border-gray-200 rounded-b-lg p-4 text-white font-medium"
      }
    >
      {isLoading ? (
        <div className={"min-h-56 w-full flex justify-center items-center"}>
          <Loading />
        </div>
      ) : (
        imgDescription
      )}
    </div>
  );
};

export default observer(AnalyzePhoto);
