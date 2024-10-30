"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import { useStores } from "@/hooks/useStores";

const UploadStepComponent = () => {
  const { uploadImgStore, scanStore } = useStores();
  const { imgUrl } = uploadImgStore;
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (imgUrl) {
      scanStore.setImg(imgUrl);
    }
  }, [imgUrl, scanStore]);

  const handlerLoading = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadImgStore.setImgFile(e.target.files[0]);
      uploadImgStore.handleUpload().finally(() => {
        setLoading(false);
        e.target.value = "";
      });
    }
  };

  const handlerClick = () => fileRef.current?.click();

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        onChange={handlerLoading}
        hidden
        accept=".jpg, .jpeg, .png"
      />
      <div
        className={
          "flex justify-center items-center w-full min-h-96 border border-gray-200 rounded-b-lg overflow-hidden p-2"
        }
      >
        {imgUrl ? (
          <div className={"w-full min-h-96 flex justify-center flex-col gap-2"}>
            <div
              className={
                "flex items-center w-full min-h-96 relative overflow-hidden"
              }
            >
              <Image src={imgUrl} alt="upload" fill={true} unoptimized />
            </div>
            <button
              type="button"
              onClick={handlerClick}
              className={
                "pt-3 rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              }
            >
              Upload Photo Again
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handlerClick}
            className="relative block w-1/2 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
              aria-hidden="true"
              className="mx-auto h-12 w-12 text-gray-400"
            >
              <path
                d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="mt-2 block text-sm font-semibold text-gray-900">
              {loading ? "Loading..." : "Upload Photo"}
            </span>
          </button>
        )}
      </div>
    </>
  );
};

export const UploadStep = observer(UploadStepComponent);
