'use client'; // Mark this as a Client Component
export default function StartButton({ onClick }) {
  return (
    <button onClick={onClick} className="start-button">
      Start Milking
    </button>
  );
}