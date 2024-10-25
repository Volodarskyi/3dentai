import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useStores } from "@/hooks/useStores";

const ResponseStep = () => {
  const { uploadImgStore } = useStores();
  const { imgUrl } = uploadImgStore;

  const text =
    "На цьому зображенні ви бачите зуби людини. " +
    "Зображення зосереджується на верхній частині зубів і показує деякі зуби в передній частині рота. " +
    "На одному з передніх зубів є помітний темний нальоток або пляма, на який вказує велика червона стрілка.";

  useEffect(() => {
    if (imgUrl) {
      //TO-DO call to server
    }
  }, [imgUrl]);

  return (
    <div
      className={
        "flex w-full min-h-96 border border-gray-200 rounded-b-lg p-4 text-black"
      }
    >
      {text}
    </div>
  );
};

export default observer(ResponseStep);
