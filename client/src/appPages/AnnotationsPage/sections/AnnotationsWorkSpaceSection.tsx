"use client";

import {FC, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import "../AnnotationsPage.Styles.scss";
import {apiClient} from "@/api/apiClient";
import UiButton from "@/components/UI/UiButton/UiButton";
import UiButtonField from "@/components/UI/UiButton/UiButtonField";

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
    const [previousImage, setPreviousImage] = useState<ImageData | null>(null);

    const selectedImage = imageFiles[currentIndex];
    const imageUrl = selectedImage
        ? `https://external-storage-bucket-3dentai-28ff4fdb.s3.us-east-2.amazonaws.com/${folderName}/${selectedImage}`
        : "";

    const fetchFiles = async (folder: string): Promise<string[]> => {
        try {
            const res = await apiClient.get(`/api/photo/files?folder=${folder}`);
            console.log('DATA FILES:', res.data.files)
            return res.data.files || [];
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
        if (!canvas) return {x: 0, y: 0};
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Сохраняем текущее состояние канваса перед началом рисования
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setPreviousImage(imageData);

        setIsDrawing(true);

        const {x, y} = getMousePos(e);
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const {x, y} = getMousePos(e);
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

            const file = new File([blob], annotationFileName, {type: "image/png"});
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", "annotations");

            try {
                setIsUploading(true);
                const res = await apiClient.postAnnotation(formData);
                console.log("✅ Annotation uploaded to S3:", res.data.key);

                // clear canvas
                const ctx = canvas.getContext("2d");
                if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);

                // ✅ delete image local
                setImageFiles((prev) => {
                    const updated = [...prev];
                    updated.splice(currentIndex, 1);

                    // Если остался хотя бы 1 элемент — останемся на текущем индексе (или сместимся назад)
                    if (updated.length === 0) {
                        setCurrentIndex(0);
                    } else if (currentIndex >= updated.length) {
                        setCurrentIndex(updated.length - 1);
                    }

                    return updated;
                });

            } catch (err) {
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

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    const goToNextImage = () => {
        clearCanvas();
        setCurrentIndex((prev) => (prev + 1) % imageFiles.length);
    };

    const goToPreviousImage = () => {
        clearCanvas();
        setCurrentIndex((prev) => (prev - 1 + imageFiles.length) % imageFiles.length);
    };

    const handleUndo = () => {
        const canvas = canvasRef.current;
        if (!canvas || !previousImage) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.putImageData(previousImage, 0, 0);
        setPreviousImage(null); // Очистим previousImage, чтобы не делать много откатов подряд
    };


    // @ts-ignore
    return (
        <div className="annotations__workspace__section">
            <div className="annotations__workspace__container">
                <div className="annotations__workspace__controls__folders">
                    <div className="annotations__workspace__controls__folders-switch">
                        <button
                            onClick={() => setFolderName("case")}
                            className={folderName === "case" ? "active-folder" : ""}
                        >
                            CASE
                        </button>
                        <button
                            onClick={() => setFolderName("control")}
                            className={folderName === "control" ? "active-folder" : ""}
                        >
                            CONTROL
                        </button>
                    </div>

                    <div className="annotations__workspace__controls__folders__unannotated">
                        unannotated : {String(imageFiles.length).padStart(3, '0')}
                    </div>
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
                    <div className="annotations__workspace__controls__section mt-075">
                        <UiButtonField
                            className="annotations__workspace__controls__filehandler"
                            width={100} height={30}
                            onClick={goToPreviousImage}
                            disabled={imageFiles.length === 0}
                            text={'⟨⟨ PREV'}/>
                        <div className="annotations__workspace__controls__filename">{selectedImage}</div>
                        <UiButtonField
                            className="annotations__workspace__controls__filehandler"
                            width={100}
                            height={30}
                            onClick={goToNextImage}
                            disabled={imageFiles.length === 0}
                            text={'NEXT ⟩⟩'}/>
                    </div>
                    <div className="annotations__workspace__controls__section mt-075">
                        <UiButton className="annotations__workspace__controls__brush-btn" width={25} height={25} onClick={decreaseBrush} text={'-'}/>
                        <div className="annotations__workspace__controls__brush">Brush: {brushSize}px</div>
                        <UiButton className="annotations__workspace__controls__brush-btn" width={25} height={25} onClick={increaseBrush} text={'+'}/>
                    </div>
                    <div className="annotations__workspace__controls__section mt-075">
                        <UiButton width={316} height={30} onClick={handleUndo} disabled={!previousImage} text={'Undo'}/>
                    </div>
                    <div className="annotations__workspace__controls__section mt-075">
                        <UiButtonField width={316} height={30} onClick={handleExport} disabled={isUploading || !selectedImage} text={'SAVE ANNOTATION'}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const AnnotationsWorkSpaceSection = observer(
    AnnotationsWorkSpaceSectionComponent
);