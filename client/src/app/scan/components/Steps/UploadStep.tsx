"use client";

import { observer } from 'mobx-react-lite';
import { ChangeEvent, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {useStores} from "@/hooks/useStores";

import { storage } from "@/services";

const UploadStepComponent = () => {
  const { uploadImgStore} = useStores();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handlerLoading = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLoading(true);
      const file = e.target.files[0];
      const fileType = file.name.split(".").at(-1);
      const fileName = `${crypto.randomUUID()}.${fileType}`;

      const storageRef = ref(storage, `/teeth/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        () => {},
        (err) => {
          console.error("Upload Err: ", err);
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((link) => {
            console.warn("File link", link);
            setLoading(false);
          });
        },
      );
      e.target.value = "";
    }
  };

  const clickBtn = () => {
    console.log('click file handler')
    fileRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        onChange={uploadImgStore.setImgFile}
        hidden
        accept=".jpg, .jpeg, .png"
      />
      <div
        className={
          "flex justify-center items-center w-full min-h-96 border border-gray-200 rounded-b-lg"
        }
      >
        <button
          type="button"
          onClick={clickBtn}
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
            {loading ? "Loading..." : "Upload Data"}
          </span>
        </button>
      </div>
    </>
  );
};

export const UploadStep = observer(UploadStepComponent);
