'use client'; // Mark this as a Client Component
export default function SessionControls({ isPaused, onPause, onResume, onStop }) {
  return (
    <div className="controls">
      {isPaused ? (
        <button onClick={onResume}>Resume</button>
      ) : (
        <button onClick={onPause}>Pause</button>
      )}
      <button onClick={onStop}>Stop</button>
    </div>
  );
}