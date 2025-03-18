'use client'; // Mark this as a Client Component
import Link from 'next/link';
import StartButton from '../components/StartButton';

export default function Home() {
  return (
    <div className="container">
      <h1>Dairy Farm App</h1>
      <Link href="/milking-session">
        <StartButton />
      </Link>
      <Link href="/history">View Milking History</Link>
    </div>
  );
}