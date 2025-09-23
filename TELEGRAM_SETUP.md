# Telegram Lead Delivery Setup

This document explains how to set up and test the Telegram lead delivery functionality for the car valuation form.

## 🚀 Quick Setup

### 1. Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Start a chat and send `/newbot`
3. Follow the prompts to create your bot:
   - Choose a name for your bot (e.g., "Car Valuation Bot")
   - Choose a username (must end with 'bot', e.g., "car_valuation_bot")
4. Save the bot token you receive

### 2. Get Your Chat ID

**Option A: Using @userinfobot**
1. Search for `@userinfobot` on Telegram
2. Start a chat and send any message
3. The bot will reply with your user ID

**Option B: Using your bot**
1. Send a message to your newly created bot
2. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. Look for the `chat.id` in the response

### 3. Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here

# Optional: Enable test mode (messages won't be sent, just logged)
TELEGRAM_TEST_MODE=false
```

### 4. Restart Development Server

```bash
npm run dev
```

## 🧪 Testing

### Test Page
Visit `/test-telegram` in your browser to run comprehensive tests:
- API endpoint health check
- Telegram connection test
- Lead delivery simulation

### Manual Testing
1. Fill out the car valuation form on your homepage
2. Submit the form
3. Check your Telegram chat for the lead notification
4. Check browser console for delivery status logs

### Test Mode
Set `TELEGRAM_TEST_MODE=true` in your `.env.local` to enable test mode:
- Messages won't be sent to Telegram
- All messages will be logged to console instead
- Useful for development and testing

## 📱 Message Format

When a lead is submitted, you'll receive a formatted message like this:

```
🚗 New Car Valuation Lead

👤 Name: John Doe
📍 Location: Dubai
📞 Phone: +971501234567
📧 Email: john.doe@example.com
💰 Crypto (USDC)
💎 Estimated Value: $45,000

🔗 Source: hero_form_compact
⏰ Time: December 22, 2024, 01:30:45 PM

---
Auto-generated from car valuation form
```

## 🔧 API Endpoints

### POST `/api/submit-valuation`
Submits a car valuation form and sends Telegram notification.

**Request Body:**
```json
{
  "name": "John Doe",
  "city": "Dubai",
  "phone": "+971501234567",
  "email": "john.doe@example.com",
  "payout": {
    "type": "crypto",
    "token": "USDC"
  },
  "source": "hero_form_compact"
}
```

**Response:**
```json
{
  "success": true,
  "estimatedValue": 45000,
  "telegramSent": true,
  "telegramError": null
}
```

### GET `/api/submit-valuation`
Health check endpoint that tests Telegram configuration.

**Response:**
```json
{
  "status": "ok",
  "telegram": {
    "configured": true,
    "testMode": false,
    "connectionTest": {
      "success": true
    }
  }
}
```

## 🛠️ Troubleshooting

### Common Issues

**"Telegram bot configuration is missing"**
- Ensure `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are set in `.env.local`
- Restart your development server after adding environment variables

**"Telegram API error: Unauthorized"**
- Check that your bot token is correct
- Ensure the bot token doesn't have extra spaces or characters

**"Chat not found"**
- Verify your chat ID is correct
- Make sure you've sent at least one message to your bot

**Messages not being sent**
- Check browser console for error messages
- Verify your bot has permission to send messages
- Try enabling test mode to see if the issue is with Telegram API

### Debug Mode

Enable debug logging by checking the browser console. You'll see:
- Form submission payload
- Telegram delivery status
- Any error messages

## 🔒 Security Notes

- Never commit your `.env.local` file to version control
- Keep your bot token secure
- Consider using environment-specific configurations for production
- The bot token gives full access to your bot - treat it like a password

## 📊 Monitoring

The system logs all form submissions and Telegram delivery attempts. Check your server logs for:
- Successful form submissions
- Telegram delivery status
- Any errors or failures

## 🚀 Production Deployment

For production deployment:

1. Set environment variables in your hosting platform
2. Ensure `TELEGRAM_TEST_MODE=false` (or remove the variable)
3. Test the integration after deployment
4. Monitor logs for any delivery failures

## 📝 Customization

### Message Format
Edit the `formatMessage` method in `/src/lib/telegram.ts` to customize the message format.

### Error Handling
Modify the error handling in the API route (`/src/app/api/submit-valuation/route.ts`) to customize how errors are handled.

### Test Data
Update the test data in `/src/lib/telegram-test.ts` to match your testing needs.
