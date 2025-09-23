# Webhook Setup for GitHub Pages

This project uses an external webhook for form submissions to ensure GitHub Pages static export compatibility.

## Why External Webhook?

GitHub Pages uses static export (`output: 'export'`) which doesn't support Next.js App Router API routes. The form submissions are now handled by an external webhook service.

## Configuration

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_LEAD_WEBHOOK=https://carvault-webhook.vercel.app/api/lead
NEXT_PUBLIC_LEAD_SOURCE=web_form
```

### Webhook Payload Format

The form sends the following payload to the webhook:

```json
{
  "name": "John Doe",
  "city": "Dubai",
  "otherCity": "Custom City",
  "phone": "+971501234567",
  "email": "john@example.com",
  "paymentMethod": "cash",
  "source": "web_form",
  "clientRef": "ABC123",
  "utm": {
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "car_valuation"
  }
}
```

## Webhook Service Requirements

The external webhook service should:

1. Accept POST requests at the configured URL
2. Parse the JSON payload
3. Send Telegram notifications
4. Return HTTP 200 on success
5. Handle errors gracefully

## Development vs Production

- **Development**: Uses the same webhook URL
- **Production**: Uses the same webhook URL (GitHub Pages static export)

## Build Process

The build process includes:

1. `prebuild`: Checks for conflicts and prevents API routes
2. `pages:build`: Builds with static export for GitHub Pages
3. `pages:post`: Sets up GitHub Pages compatibility files

## Testing

Test the webhook locally:

```bash
curl -X POST http://localhost:3000/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

## Archive

The original API route is preserved in `server/_archive/submit-valuation.ts` for reference.
