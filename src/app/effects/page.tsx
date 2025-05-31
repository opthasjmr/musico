'use client';

import { useEffect, useState } from 'react';
import * as Tone from 'tone';

export default function Effects() {
  const [reverb, setReverb] = useState(0.5);
  const [delay, setDelay] = useState(0.3);
  const [distortion, setDistortion] = useState(0);

  useEffect(() => {
    const reverbEffect = new Tone.Reverb(reverb).toDestination();
    const delayEffect = new Tone.FeedbackDelay(delay, 0.5).toDestination();
    const distortionEffect = new Tone.Distortion(distortion).toDestination();

    return () => {
      reverbEffect.dispose();
      delayEffect.dispose();
      distortionEffect.dispose();
    };
  }, [reverb, delay, distortion]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-400 mb-8">Effects</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Reverb</h2>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={reverb}
            onChange={(e) => setReverb(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center mt-2">{Math.round(reverb * 100)}%</div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Delay</h2>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center mt-2">{Math.round(delay * 100)}%</div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Distortion</h2>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={distortion}
            onChange={(e) => setDistortion(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center mt-2">{Math.round(distortion * 100)}%</div>
        </div>
      </div>
    </div>
  );
}