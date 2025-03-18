'use client'; // Mark this as a Client Component
import { useState, useRef } from 'react';
import Link from 'next/link';
import Timer from '../../components/Timer';
import MusicPlayer from '../../components/MusicPlayer';
import SessionControls from '../../components/SessionControls';
import MusicControls from '../../components/MusicControls';
import QuantityModal from '../../components/QuantityModal';

const musicFiles = [
  '/music/After-the-Rain-Inspiring-Atmospheric-Music.mp3',
  '/music/Moon-Waltz.mp3',
  '/music/sb_adriftamonginfinitestars.mp3',
  '/music/scott-buckley-moonlight.mp3',
];

export default function MilkingSession() {
  const [isMilking, setIsMilking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [stopTrigger, setStopTrigger] = useState(false); // Trigger to stop music
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const timerRef = useRef(null);

  const startMilking = () => {
    setIsMilking(true);
    setIsPaused(false);
    setStopTrigger(false); // Reset stop trigger
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const pauseMilking = () => {
    setIsPaused(true);
    clearInterval(timerRef.current);
  };

  const resumeMilking = () => {
    setIsPaused(false);
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopMilking = () => {
    clearInterval(timerRef.current);
    setStopTrigger(true); // Trigger music stop
    setIsModalOpen(true); // Open the modal
  };

  const handleQuantitySubmit = async (quantity) => {
    const sessionData = {
      start_time: new Date(Date.now() - time * 1000).toISOString(), // Start time is calculated
      end_time: new Date().toISOString(), // Current time as end time
      duration: time, // Duration in seconds
      milk_quantity: quantity, // Milk quantity entered by the user
    };

    try {
      // Send the session data to the Next.js API route
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      });

      if (response.ok) {
        const savedSession = await response.json();
        console.log('Session saved successfully:', savedSession);
      } else {
        console.error('Failed to save session:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving session:', error);
    }

    setIsMilking(false);
    setTime(0);
  };

  const playNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % musicFiles.length);
  };

  const playPreviousTrack = () => {
    setCurrentTrackIndex(
      (prevIndex) => (prevIndex - 1 + musicFiles.length) % musicFiles.length
    );
  };

  return (
    <div className="container">
      <h1>Milking Session</h1>
      {!isMilking ? (
        <button onClick={startMilking}>Start Milking</button>
      ) : (
        <>
          <Timer isPaused={isPaused} />
          <SessionControls
            isPaused={isPaused}
            onPause={pauseMilking}
            onResume={resumeMilking}
            onStop={stopMilking}
          />
          <MusicControls onPrevious={playPreviousTrack} onNext={playNextTrack} />
          <div className="now-playing">
            Now Playing: {musicFiles[currentTrackIndex].split('/').pop()}
          </div>
          <MusicPlayer
            isPlaying={!isPaused}
            currentTrack={musicFiles[currentTrackIndex]}
            onStop={stopTrigger} // Pass the stop trigger to MusicPlayer
          />
        </>
      )}
      <Link href="/history">View Milking History</Link>

      {/* Quantity Modal */}
      <QuantityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleQuantitySubmit}
      />
    </div>
  );
}