'use client'; // Mark this as a Client Component
import { useState, useEffect } from 'react';
import Link from 'next/link';
import HistoryTable from '../../components/HistoryTable';

export default function History() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        // Fetch data from the Next.js API route
        const response = await fetch('/api/sessions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSessions(data);
        } else {
          console.error('Failed to fetch sessions:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="container">
      <h1>Milking History</h1>
      <HistoryTable sessions={sessions} />
      <Link href="/">Back to Home</Link>
    </div>
  );
}