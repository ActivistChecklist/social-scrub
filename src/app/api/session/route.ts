import { NextResponse } from 'next/server';
import { saveSessionToServer } from '@/lib/server-storage';
import { Session } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const session: Session = await request.json();

    // Save session to server and get the (potentially new) session ID
    const sessionId = await saveSessionToServer(session);

    return NextResponse.json({
      success: true,
      sessionId,
      url: `/session/${sessionId}`,
    });
  } catch (error) {
    console.error('Error saving session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save session' },
      { status: 500 }
    );
  }
}
