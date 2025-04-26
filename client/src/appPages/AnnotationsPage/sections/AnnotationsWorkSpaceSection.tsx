"use client";
import { FC, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";

import "../AnnotationsPage.Styles.scss";

const AnnotationsWorkSpaceSectionComponent: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseImageRef = useRef<HTMLImageElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(3);

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
    const dataURL = canvas.toDataURL("image/png");

    await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: dataURL }),
    });

    alert("Annotation PNG exported and sent to server!");
  };

  const increaseBrush = () => {
    setBrushSize((prev) => Math.min(prev + 1, 20));
  };

  const decreaseBrush = () => {
    setBrushSize((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="annotations__workspace__section">
      <div className="annotations__workspace__container">
        <div className="annotations__workspace__display">
          <img
            ref={baseImageRef}
            src="/assets/teeth/id1232234334.png"
            alt="Tooth"
            width={512}
            height={512}
            className="annotations__workspace__image"
          />
          <canvas
            ref={canvasRef}
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
          <button onClick={handleExport}>Export Mask to PNG</button>
        </div>
      </div>
    </div>
  );
};

export const AnnotationsWorkSpaceSection = observer(
  AnnotationsWorkSpaceSectionComponent,
);
