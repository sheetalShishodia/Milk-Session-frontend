// app/api/sessions/route.js
export async function GET() {
    try {
      // Fetch data from your backend
      const response = await fetch('http://localhost:5000/api/sessions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch sessions');
      }
  
      const sessions = await response.json();
  
      // Return the sessions data as a JSON response
      return new Response(JSON.stringify(sessions), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error fetching sessions:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch sessions' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  
  export async function POST(request) {
    try {
      // Parse the request body
      const sessionData = await request.json();
  
      // Send the data to your backend
      const response = await fetch('http://localhost:5000/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save session');
      }
  
      const savedSession = await response.json();
  
      // Return the saved session data as a JSON response
      return new Response(JSON.stringify(savedSession), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error saving session:', error);
      return new Response(JSON.stringify({ error: 'Failed to save session' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }