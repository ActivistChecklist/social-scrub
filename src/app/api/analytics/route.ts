import { NextRequest, NextResponse } from 'next/server';
import { sendUmamiEvent, AnalyticsPayload } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  try {
    const body: AnalyticsPayload = await request.json();

    // Extract client information from request headers
    const userAgent = request.headers.get('user-agent') || '';
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const clientIP = forwardedFor?.split(',')[0] || realIP || null;

    // Send event to Umami
    const result = await sendUmamiEvent(body, userAgent, clientIP);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process analytics event' },
      { status: 500 }
    );
  }
}
