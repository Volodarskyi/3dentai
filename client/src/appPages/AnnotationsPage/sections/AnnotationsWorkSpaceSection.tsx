"use client";

import { FC, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import "../AnnotationsPage.Styles.scss";
import {apiClient} from "@/api/apiClient";

const imageFolderDefault = "case";

const AnnotationsWorkSpaceSectionComponent: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseImageRef = useRef<HTMLImageElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(3);
  const [isUploading, setIsUploading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [folderName, setFolderName] = useState<string>(imageFolderDefault);

  const selectedImage = imageFiles[currentIndex];
  const imageUrl = selectedImage
      ? `https://external-storage-bucket-3dentai-28ff4fdb.s3.us-east-2.amazonaws.com/${folderName}/${selectedImage}`
      : "";

  const fetchFiles = async (folder: string): Promise<string[]> => {
    try {
      const data = await apiClient.get(`/api/photo/files?folder=${folder}`);
      console.log('DATA FILES:',data.files)
      return data.files || [];
    } catch (error) {
      console.error(`Failed to fetch files from ${folder}:`, error);
      return [];
    }
  };

  const filterImagesWithoutAnnotations = (images: string[], annotations: string[]): string[] => {
    const annotationSet = new Set(
        annotations.map((filename) => filename.replace("_annotation.png", "").replace(".png", ""))
    );

    return images.filter((image) => {
      const baseName = image.replace(".png", "");
      return !annotationSet.has(baseName);
    });
  };

  useEffect(() => {
    const loadFiles = async () => {
      const [images, annotations] = await Promise.all([
        fetchFiles(folderName),
        fetchFiles("annotations"),
      ]);

      const filteredImages = filterImagesWithoutAnnotations(images, annotations);

      setImageFiles(filteredImages);
      setCurrentIndex(0);
    };

    loadFiles();
  }, [folderName]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 512;
      canvas.height = 512;
    }
  }, []);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getMousePos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getMousePos(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "rgba(255, 0, 0, 1)";
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleExport = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const cleanName = selectedImage.split("/").pop() || "";
      const annotationFileName = cleanName.replace(/\.(png|jpg|jpeg)$/, "_annotation.png");

      const file = new File([blob], annotationFileName, { type: "image/png" });
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "annotations");

      try {
        setIsUploading(true);
        const key = await apiClient.postAnnotation(formData);
        console.log("✅ Annotation uploaded to S3:", key);

        // ⬇️ Очистить слой аннотаций после успешной отправки
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // ⬇️ Перейти к следующему изображению
        goToNextImage();
      } catch (err: any) {
        console.error("❌ Upload failed:", err);
      } finally {
        setIsUploading(false);
      }
    }, "image/png");
  };

  const increaseBrush = () => {
    setBrushSize((prev) => Math.min(prev + 1, 20));
  };

  const decreaseBrush = () => {
    setBrushSize((prev) => Math.max(prev - 1, 1));
  };

  const goToNextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imageFiles.length);
  };

  const goToPreviousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + imageFiles.length) % imageFiles.length);
  };

  return (
      <div className="annotations__workspace__section">
        <div className="annotations__workspace__container">
          <div className="annotations__workspace__controls">
            <button onClick={() => setFolderName("case")}>Load Case Folder</button>
            <button onClick={() => setFolderName("control")}>Load Control Folder</button>
          </div>

          <div className="annotations__workspace__controls">
            <button onClick={goToPreviousImage} disabled={imageFiles.length === 0}>⟨ Previous</button>
            <span style={{ margin: "0 10px" }}>{selectedImage}</span>
            <button onClick={goToNextImage} disabled={imageFiles.length === 0}>Next ⟩</button>
          </div>

          <div className="annotations__workspace__display">
            {imageUrl && (
                <img
                    ref={baseImageRef}
                    src={imageUrl}
                    alt="Tooth"
                    width={512}
                    height={512}
                    className="annotations__workspace__image"
                />
            )}
            <canvas
                ref={canvasRef}
                width={512}
                height={512}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="annotations__workspace__canvas"
            />
          </div>

          <div className="annotations__workspace__controls">
            <button onClick={decreaseBrush}>-</button>
            <span>Brush: {brushSize}px</span>
            <button onClick={increaseBrush}>+</button>
            <button onClick={handleExport} disabled={isUploading || !selectedImage}>
              {isUploading ? "Uploading..." : "Export to S3"}
            </button>
          </div>
        </div>
      </div>
  );
};

export const AnnotationsWorkSpaceSection = observer(
    AnnotationsWorkSpaceSectionComponent
);