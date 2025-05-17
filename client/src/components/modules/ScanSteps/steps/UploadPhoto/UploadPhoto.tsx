"use client";

import {ChangeEvent, useEffect, useRef} from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useStores } from "@/hooks/useStores";
import { Col, Row } from "antd";
import {DisplayTeethSchema} from "@/components/DisplayTeethSchema/DisplayTeethSchema";

import "./uploadPhoto.styles.scss";


const UploadPhoto = () => {
  const { scanStore } = useStores();
  const { imgUrl, isLoading } = scanStore;
  const fileRef = useRef<HTMLInputElement>(null);

    // ✅ INIT on mount
    useEffect(() => {
        (async () => {
            await scanStore.init();
        })();
    }, []);

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
        <Row style={{width:"100%" , display:'flex', alignItems: "stretch"}}>
            <Col xs={24} md={12} style={{marginTop:".5rem"}}>
                <div className='uploadPhoto-jaw'>
                    <div className='uploadPhoto-jaw__workspace'>
                        <DisplayTeethSchema setActiveToothCB={(activeTooth)=>scanStore.setActiveTooth(activeTooth)} />
                    </div>
                </div>
            </Col>

            <Col xs={24} md={12} style={{marginTop:".5rem"}}>
                <div className='uploadPhoto-input'>
                    <div className='uploadPhoto-input__workspace'>
                        <input
                            ref={fileRef}
                            type="file"
                            onChange={handlerLoading}
                            hidden
                            accept=".jpg, .jpeg, .png"
                        />
                        <div className={"uploadPhoto__container"}>
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
                                    <button onClick={handlerClick} className="uploadPhoto__btnAgain">
                                        Upload Photo Again
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handlerClick}
                                    className={"uploadPhoto__uploadPhotoContainer"}
                                >
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                        className="uploadPhoto__svg"
                                    >
                                        <path
                                            d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span className="uploadPhoto__dropZone">
              {isLoading ? "Loading..." : "Upload Photo"}
            </span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Col>
        </Row>

    </>
  );
};

export default observer(UploadPhoto);
