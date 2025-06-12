import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";

export interface DrawingBoardHandle {
  clear: () => void;
  getImage: () => string;
}

interface DrawingBoardProps {
  className?: string;
}

const DrawingBoard = forwardRef<DrawingBoardHandle, DrawingBoardProps>(({ className }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDown, setIsDown] = useState(false);

  // expose clear()
  useImperativeHandle(ref, () => ({
    clear: () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    getImage: () => {
      const canvas = canvasRef.current;
      return canvas ? canvas.toDataURL("image/png") : "";
    },
  }));

  // 1. match CSS size → intrinsic pixels
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      ctx.lineCap = "round";
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#000";
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // 2. translate global coords → local canvas coords
  const getPos = (e: PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  // 3. pointer handlers
  const handleDown = (e: React.PointerEvent) => {
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = getPos(e.nativeEvent);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDown(true);
  };

  const handleMove = (e: React.PointerEvent) => {
    if (!isDown) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = getPos(e.nativeEvent);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stop = () => setIsDown(false);

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={stop}
      onPointerLeave={stop}
      style={{ width: "100%", height: "400px", background: "#f3f5f7" }}
      className={className}
    />
  );
});

export default DrawingBoard; 