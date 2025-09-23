interface TelegramMessage {
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
  timestamp: string;
}

interface TelegramResponse {
  ok: boolean;
  result?: unknown;
  error_code?: number;
  description?: string;
}

export class TelegramService {
  private botToken: string;
  private chatId: string;
  private testMode: boolean;

  constructor() {
    this.botToken = process.env.TELEGRAM_BOT_TOKEN || '';
    this.chatId = process.env.TELEGRAM_CHAT_ID || '';
    this.testMode = process.env.TELEGRAM_TEST_MODE === 'true';
  }

  private formatMessage(data: TelegramMessage): string {
    const { name, city, phone, email, payout, source, timestamp } = data;
    
    const payoutInfo = payout.type === 'crypto' 
      ? `💰 Crypto (${payout.token === 'Other' ? payout.otherToken : payout.token})`
      : '💵 Cash';
    
    // Escape special characters for Telegram Markdown
    const escapeMarkdown = (text: string) => {
      return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
    };
    
    return `🚗 *New Car Valuation Lead*

👤 *Name:* ${escapeMarkdown(name)}
📍 *Location:* ${escapeMarkdown(city)}
📞 *Phone:* ${escapeMarkdown(phone)}
📧 *Email:* ${escapeMarkdown(email)}
${payoutInfo}

🔗 *Source:* ${escapeMarkdown(source)}
⏰ *Time:* ${escapeMarkdown(timestamp)}

---
*Auto-generated from car valuation form*`;
  }

  async sendLead(data: TelegramMessage): Promise<{ success: boolean; error?: string }> {
    try {
      // Validate configuration
      if (!this.botToken || !this.chatId) {
        throw new Error('Telegram bot configuration is missing. Please check TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables.');
      }

      // In test mode, just log the message instead of sending
      if (this.testMode) {
        console.log('🧪 TEST MODE - Telegram message would be sent:');
        console.log(this.formatMessage(data));
        return { success: true };
      }

      const message = this.formatMessage(data);
      const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: message,
          parse_mode: 'Markdown',
          disable_web_page_preview: true,
        }),
      });

      const result: TelegramResponse = await response.json();

      if (!result.ok) {
        throw new Error(`Telegram API error: ${result.description || 'Unknown error'}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Failed to send Telegram notification:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.botToken || !this.chatId) {
        throw new Error('Telegram bot configuration is missing');
      }

      const url = `https://api.telegram.org/bot${this.botToken}/getMe`;
      const response = await fetch(url);
      const result = await response.json();

      if (!result.ok) {
        throw new Error(`Telegram API error: ${result.description || 'Unknown error'}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Telegram connection test failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}

export const telegramService = new TelegramService();
