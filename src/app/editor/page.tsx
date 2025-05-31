'use client';

import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

export default function MusicEditor() {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = await Tone.context.decodeAudioData(arrayBuffer);
      setAudioBuffer(buffer);
      drawWaveform(buffer);
    }
  };

  const drawWaveform = (buffer: AudioBuffer) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const data = buffer.getChannelData(0);
    const step = Math.ceil(data.length / canvas.width);
    const amp = canvas.height / 2;

    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, amp);

    for (let i = 0; i < canvas.width; i++) {
      let min = 1.0;
      let max = -1.0;

      for (let j = 0; j < step; j++) {
        const datum = data[(i * step) + j];
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }

      ctx.lineTo(i, (1 + min) * amp);
      ctx.lineTo(i, (1 + max) * amp);
    }

    ctx.strokeStyle = '#818cf8';
    ctx.stroke();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-400 mb-8">Music Editor</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Upload Audio File</label>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-600 file:text-white
              hover:file:bg-indigo-700"
          />
        </div>

        <div className="relative aspect-[3/1] w-full">
          <canvas
            ref={canvasRef}
            className="w-full h-full rounded-lg"
            width={1200}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}