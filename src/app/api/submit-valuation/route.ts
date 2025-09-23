import { NextRequest, NextResponse } from 'next/server';
import { telegramService } from '@/lib/telegram';

interface ValuationRequest {
  name: string;
  city: string;
  phone: string;
  email: string;
  payout: {
    type: 'crypto' | 'cash';
    token?: string;
    otherToken?: string;
  };
  source: string;
}

interface ValuationResponse {
  success: boolean;
  error?: string;
  telegramSent?: boolean;
  telegramError?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<ValuationResponse>> {
  try {
    const body: ValuationRequest = await request.json();
    
    // Validate required fields
    const { name, city, phone, email, payout, source } = body;
    
    if (!name || !city || !phone || !email || !payout?.type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare Telegram message data
    const telegramData = {
      name,
      city,
      phone,
      email,
      payout,
      source,
      timestamp: new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Dubai',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    // Send Telegram notification
    const telegramResult = await telegramService.sendLead(telegramData);

    // Log the submission for debugging
    console.log('Valuation submission:', {
      name,
      city,
      email: email.replace(/(.{2}).*(@.*)/, '$1***$2'), // Mask email for privacy
      payoutType: payout.type,
      telegramSent: telegramResult.success
    });

    return NextResponse.json({
      success: true,
      telegramSent: telegramResult.success,
      telegramError: telegramResult.error
    });

  } catch (error) {
    console.error('Valuation submission error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET(): Promise<NextResponse> {
  try {
    const telegramTest = await telegramService.testConnection();
    
    return NextResponse.json({
      status: 'ok',
      telegram: {
        configured: !!(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
        testMode: process.env.TELEGRAM_TEST_MODE === 'true',
        connectionTest: telegramTest
      }
    });
  } catch {
    return NextResponse.json(
      { status: 'error', error: 'Health check failed' },
      { status: 500 }
    );
  }
}
