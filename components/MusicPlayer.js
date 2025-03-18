'use client'; // Mark this as a Client Component
import { useEffect, useRef } from 'react';

export default function MusicPlayer({ isPlaying, currentTrack, onStop }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      // Load the new track
      audioRef.current.src = currentTrack;
      audioRef.current.load(); // Ensure the new source is loaded

      // Play the audio if isPlaying is true
      if (isPlaying) {
        const playPromise = audioRef.current.play();

        // Handle the play() promise to avoid errors
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Audio is playing');
            })
            .catch((error) => {
              // Suppress the error if it's an AbortError
              if (error.name !== 'AbortError') {
                console.error('Error playing audio:', error);
              }
            });
        }
      }
    }
  }, [currentTrack]); // Only run this effect when currentTrack changes

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();

        // Handle the play() promise to avoid errors
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Audio is playing');
            })
            .catch((error) => {
              // Suppress the error if it's an AbortError
              if (error.name !== 'AbortError') {
                console.error('Error playing audio:', error);
              }
            });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]); // Only run this effect when isPlaying changes

  // Stop the music
  useEffect(() => {
    if (onStop && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset the playback to the beginning
    }
  }, [onStop]); // Only run this effect when onStop changes

  return <audio ref={audioRef} src={currentTrack} loop />;
}