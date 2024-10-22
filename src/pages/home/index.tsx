import React, { useEffect, useRef, useState } from "react";
import { SWATCHES } from "../../../constants";
import { ColorSwatch, Group } from "@mantine/core";
import { Button } from "../../components/ui/button";
import axios from "axios";

interface Response{
    expr: string,
    result: string,
    assign: boolean,
}

interface GeneratedResult{
    expresssion:string,
    answer:string,
}

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>(SWATCHES[0]);
  const [reset, setReset] = useState<boolean>(false);
  const [result, setResult] = useState<GeneratedResult>();
  const [dictOfVars, setDictOfVars] = useState<{[key:string]:string}>({});

  useEffect(() => {
    if (reset) {
      resetCanvas();
      setReset(false);
    }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - canvas.offsetTop;
        ctx.lineCap = "round"; // brush type
        ctx.lineWidth = 5; //brush size
      }
    }
  }, []);

  const resetCanvas = () => {
    const canvas = canvasRef.current;

    if(canvas){
        const ctx = canvas.getContext("2d");
        if(ctx){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvas.style.background = "black";
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = color;
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
      }
    }
  };

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      className="absolute top-0 left-0 w-full h-full"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseOut={stopDrawing}
      onMouseUp={stopDrawing}
    />
  );
};

export default Home;
