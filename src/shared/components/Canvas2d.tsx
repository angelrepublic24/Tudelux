'use client';
import { useEffect, useRef } from 'react';
import  * as  fabric  from 'fabric';

export type LineData = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  length: number;
};

type Props = {
  onLineDrawn: (line: LineData) => void;
};

export const Canvas2D = ({ onLineDrawn }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvas = useRef<fabric.Canvas | null>(null);
  const currentLine = useRef<fabric.Line | null>(null);
  const distanceText = useRef<fabric.Text | null>(null);

  // Convert pixels to inches assuming 100px = 1 unit
  const calculateLength = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = (x2 - x1) / 100;
    const dy = (y2 - y1) / 100;
    return Math.sqrt(dx * dx + dy * dy);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      selection: false,
    });
    fabricCanvas.current = canvas;

    // Draw grid
    const gridSize = 20;
    for (let i = 0; i < 1000; i += gridSize) {
      const vertical = new fabric.Line([i, 0, i, 1000], {
        stroke: '#eee',
        selectable: false,
        evented: false,
      });
      const horizontal = new fabric.Line([0, i, 1000, i], {
        stroke: '#eee',
        selectable: false,
        evented: false,
      });
      canvas.add(vertical);
      canvas.add(horizontal);
    }

    let isDrawing = false;
    let startX = 0;
    let startY = 0;

    canvas.on('mouse:down', (opt) => {
      const pointer = canvas.getPointer(opt.e);
      isDrawing = true;
      startX = pointer.x;
      startY = pointer.y;

      const line = new fabric.Line([startX, startY, startX, startY], {
        stroke: 'black',
        strokeWidth: 2,
        selectable: false,
        evented: false,
      });
      currentLine.current = line;

      const label = new fabric.Text('0"', {
        left: startX,
        top: startY - 20,
        fontSize: 14,
        fill: '#ff5100',
        selectable: false,
        evented: false,
      });

      distanceText.current = label;
      canvas.add(line);
      canvas.add(label);
    });

    canvas.on('mouse:move', (opt) => {
      if (!isDrawing || !currentLine.current) return;
      const pointer = canvas.getPointer(opt.e);

      currentLine.current.set({ x2: pointer.x, y2: pointer.y });

      const length = calculateLength(startX, startY, pointer.x, pointer.y);
      distanceText.current?.set({
        left: (startX + pointer.x) / 2,
        top: (startY + pointer.y) / 2 - 20,
        text: `${length.toFixed(2)}"`,
      });

      canvas.renderAll();
    });

    canvas.on('mouse:up', () => {
      isDrawing = false;

      if (currentLine.current) {
        const { x1, y1, x2, y2 } = currentLine.current;
        const length = calculateLength(x1!, y1!, x2!, y2!);
        onLineDrawn({ x1, y1, x2, y2, length });
      }

      currentLine.current = null;
      distanceText.current = null;
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} width={1000} height={600} className="border border-gray-300" />;
};
