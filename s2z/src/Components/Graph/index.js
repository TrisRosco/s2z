import React, { useEffect, useRef } from 'react';

const Graph = ({ data, width, height }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Set styles
    ctx.strokeStyle = '#5da694';
    ctx.lineWidth = 4;

    // Draw the graph
    for (let i = 0; i < data.length; i++) {
      const x = i * (width / data.length);
      const y = height - data[i] * (height / 100);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Add axis labels
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    // X-axis label
    ctx.fillText('Time', width / 2, height - 10);
    // Y-axis label
    ctx.save();
    ctx.translate(10, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('kgCo2', 0, 0);
    ctx.restore();
  }, [data, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Graph;

