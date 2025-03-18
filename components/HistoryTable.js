'use client'; // Mark this as a Client Component
export default function HistoryTable({ sessions }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Duration</th>
          <th>Milk Collected</th>
        </tr>
      </thead>
      <tbody>
        {sessions.map((session, index) => (
          <tr key={index}>
            <td>{new Date(session.start_time).toLocaleDateString()}</td>
            <td>{new Date(session.start_time).toLocaleTimeString()}</td>
            <td>{new Date(session.end_time).toLocaleTimeString()}</td>
            <td>{session.duration} seconds</td>
            <td>{session.milk_quantity} liters</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}