'use client'; // Mark this as a Client Component
export default function MusicControls({ onPrevious, onNext }) {
  return (
    <div className="music-controls">
      <button onClick={onPrevious}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
}