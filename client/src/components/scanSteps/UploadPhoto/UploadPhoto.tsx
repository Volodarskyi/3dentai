"use client";

import { ChangeEvent, useRef } from "react";
import { Button } from "antd";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import { useStores } from "@/hooks/useStores";

const UploadPhoto = () => {
  const { scanStore } = useStores();
  const { imgUrl, isLoading } = scanStore;
  const fileRef = useRef<HTMLInputElement>(null);

  const handlerLoading = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      scanStore.setImgFile(e.target.files[0]);
      scanStore.handleUpload().finally(() => {
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
          <div
            style={{
              width: "100%",
              minHeight: "24rem",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <div
              style={{
                position: "relative",
                minHeight: "24rem",
                width: "100%",
              }}
              className={
                "flex items-center w-full min-h-96 relative overflow-hidden"
              }
            >
              <Image src={imgUrl} alt="upload" fill={true} unoptimized />
            </div>
            <Button
              onClick={handlerClick}
              style={{
                color: "black",
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                outline: "none",
                fontSize: "1rem",
                height: "2.5rem",
              }}
            >
              Upload Photo Again
            </Button>
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
              {isLoading ? "Loading..." : "Upload Photo"}
            </span>
          </button>
        )}
      </div>
    </>
  );
};

export default observer(UploadPhoto);
