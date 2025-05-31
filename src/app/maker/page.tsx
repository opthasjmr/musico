'use client';

import { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { useMusicStore } from '@/store/musicStore';
import { PlayIcon, PauseIcon, PlusIcon } from '@heroicons/react/24/solid';

export default function MusicMaker() {
  const { 
    isPlaying, 
    bpm, 
    tracks, 
    setIsPlaying, 
    setBpm, 
    addTrack, 
    removeTrack, 
    updateTrackNote 
  } = useMusicStore();
  
  const [initialized, setInitialized] = useState(false);

  const handlePlayClick = async () => {
    if (!initialized) {
      await Tone.start();
      setInitialized(true);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-indigo-400">Music Maker</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlayClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            {isPlaying ? (
              <><PauseIcon className="w-5 h-5" /> Stop</>
            ) : (
              <><PlayIcon className="w-5 h-5" /> Play</>
            )}
          </button>
          <div className="flex items-center gap-2">
            <label className="text-sm">BPM:</label>
            <input
              type="number"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-16 bg-gray-800 text-white px-2 py-1 rounded"
            />
          </div>
          <button
            onClick={addTrack}
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" /> Add Track
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {tracks.map((track, trackIndex) => (
          <div key={track.id} className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium">Track {trackIndex + 1}</span>
                <select
                  value={track.instrument}
                  className="bg-gray-700 text-white px-2 py-1 rounded"
                >
                  <option value="synth">Synth</option>
                  <option value="drums">Drums</option>
                </select>
              </div>
              <button
                onClick={() => removeTrack(trackIndex)}
                className="text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-16 gap-1">
              {track.steps.map((enabled, stepIndex) => (
                <button
                  key={stepIndex}
                  onClick={() => updateTrackNote(trackIndex, stepIndex, !enabled)}
                  className={`w-full aspect-square rounded ${
                    enabled ? 'bg-indigo-500' : 'bg-gray-700'
                  } hover:bg-indigo-400 transition-colors`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}