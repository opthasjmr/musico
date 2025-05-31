'use client';

import { useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

const demoSongs: Song[] = [
  { id: '1', title: 'Demo Track 1', artist: 'Artist 1', duration: '3:45' },
  { id: '2', title: 'Demo Track 2', artist: 'Artist 2', duration: '4:20' },
  { id: '3', title: 'Demo Track 3', artist: 'Artist 3', duration: '2:55' },
];

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-400 mb-8">Music Player</h1>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Library</h2>
          <div className="space-y-2">
            {demoSongs.map((song) => (
              <div
                key={song.id}
                className="flex items-center justify-between p-3 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handlePlayPause(song)}
                    className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    {currentSong?.id === song.id && isPlaying ? (
                      <PauseIcon className="w-5 h-5" />
                    ) : (
                      <PlayIcon className="w-5 h-5" />
                    )}
                  </button>
                  <div>
                    <div className="font-medium">{song.title}</div>
                    <div className="text-sm text-gray-400">{song.artist}</div>
                  </div>
                </div>
                <div className="text-gray-400">{song.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}