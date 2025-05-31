import { create } from 'zustand';
import * as Tone from 'tone';

interface MusicStore {
  isPlaying: boolean;
  bpm: number;
  volume: number;
  currentTrack: number;
  tracks: Track[];
  setIsPlaying: (isPlaying: boolean) => void;
  setBpm: (bpm: number) => void;
  setVolume: (volume: number) => void;
  addTrack: () => void;
  removeTrack: (index: number) => void;
  updateTrackNote: (trackIndex: number, stepIndex: number, enabled: boolean) => void;
}

interface Track {
  id: string;
  instrument: string;
  steps: boolean[];
}

const synth = new Tone.PolySynth().toDestination();
const drumSampler = new Tone.Sampler({
  urls: {
    C4: "https://tonejs.github.io/audio/drum-samples/kick.mp3",
    D4: "https://tonejs.github.io/audio/drum-samples/snare.mp3",
    E4: "https://tonejs.github.io/audio/drum-samples/hihat.mp3",
  },
}).toDestination();

export const useMusicStore = create<MusicStore>((set, get) => ({
  isPlaying: false,
  bpm: 120,
  volume: -12,
  currentTrack: 0,
  tracks: [
    { id: '1', instrument: 'synth', steps: Array(16).fill(false) },
    { id: '2', instrument: 'drums', steps: Array(16).fill(false) },
  ],
  
  setIsPlaying: (isPlaying) => {
    if (isPlaying) {
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
    }
    set({ isPlaying });
  },
  
  setBpm: (bpm) => {
    Tone.Transport.bpm.value = bpm;
    set({ bpm });
  },
  
  setVolume: (volume) => {
    Tone.Destination.volume.value = volume;
    set({ volume });
  },
  
  addTrack: () => {
    set((state) => ({
      tracks: [...state.tracks, {
        id: Date.now().toString(),
        instrument: 'synth',
        steps: Array(16).fill(false)
      }]
    }));
  },
  
  removeTrack: (index) => {
    set((state) => ({
      tracks: state.tracks.filter((_, i) => i !== index)
    }));
  },
  
  updateTrackNote: (trackIndex, stepIndex, enabled) => {
    set((state) => ({
      tracks: state.tracks.map((track, i) => 
        i === trackIndex
          ? { ...track, steps: track.steps.map((step, j) => j === stepIndex ? enabled : step) }
          : track
      )
    }));
  },
}));

// Set up the sequencer
Tone.Transport.bpm.value = 120;
let currentStep = 0;

Tone.Transport.scheduleRepeat((time) => {
  const store = useMusicStore.getState();
  
  store.tracks.forEach((track, trackIndex) => {
    if (track.steps[currentStep]) {
      if (track.instrument === 'drums') {
        drumSampler.triggerAttackRelease(["C4", "D4", "E4"][trackIndex % 3], "8n", time);
      } else {
        synth.triggerAttackRelease(["C4", "E4", "G4"][trackIndex % 3], "8n", time);
      }
    }
  });
  
  currentStep = (currentStep + 1) % 16;
}, "8n");