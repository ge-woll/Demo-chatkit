# API Contracts: Landing Page

**Feature**: Modern Landing Page for Judgment Summariser
**Date**: 2025-10-18

## Overview

The landing page feature **does not require API contracts** as it is a purely frontend, static content feature with no backend API endpoints or data exchange.

## Why No Contracts?

### 1. Static Content Delivery
The landing page serves static HTML/CSS/JavaScript with no dynamic data fetching:
- Content is configured at build time in `lib/landing-content.ts`
- Next.js pre-renders the page during build (Static Site Generation)
- No client-server data exchange occurs

### 2. No Backend Endpoints
The landing page does not introduce any new API endpoints:
- **Existing endpoint preserved**: `/api/create-session` (ChatKit session creation) remains unchanged
- **No form submissions**: CTAs are simple navigation links, not form posts
- **No data persistence**: No user data is stored or retrieved

### 3. Client-Side Only Navigation
All interactions are handled via Next.js client-side routing:
- Primary CTA: `<Link href="/app">` → navigates to existing chat application
- Secondary CTA: `<a href="#features">` → scrolls to features section (same page)
- No HTTP requests required for these interactions

## Existing API Usage

The landing page may indirectly trigger usage of the existing ChatKit API after CTA click:

### POST /api/create-session

**Note**: This endpoint already exists and is NOT modified by this feature.

**Trigger**: User clicks "Try Free Now" CTA → navigates to `/app` → App.tsx initiates ChatKit session

**Endpoint**: `/api/create-session`

**Request** (existing):
```json
{
  "workflowId": "wf_xxx"
}
```

**Response** (existing):
```json
{
  "sessionId": "session_xxx",
  "token": "token_xxx"
}
```

**Documentation**: See `app/api/create-session/route.ts` for implementation details.

## Future API Considerations

If the landing page evolves to include dynamic features, API contracts would be needed for:

### Hypothetical: Lead Capture Form

**POST /api/leads**

Request:
```json
{
  "email": "lawyer@firm.com",
  "name": "Jane Doe",
  "source": "landing_page"
}
```

Response:
```json
{
  "success": true,
  "leadId": "lead_xxx"
}
```

**Status**: Not implemented (out of scope for MVP)

### Hypothetical: Analytics Events

**POST /api/analytics/events**

Request:
```json
{
  "eventName": "cta_clicked",
  "properties": {
    "ctaLabel": "Try Free Now",
    "timestamp": "2025-10-18T12:00:00Z"
  }
}
```

Response:
```json
{
  "success": true,
  "eventId": "evt_xxx"
}
```

**Status**: Not implemented (analytics via client-side Vercel Analytics if needed)

## GraphQL Schemas

Not applicable - this project uses REST APIs (OpenAI ChatKit), and the landing page does not interact with any GraphQL endpoints.

## WebSocket Connections

Not applicable - the landing page is static and does not establish WebSocket connections. The existing ChatKit interface may use WebSockets for chat functionality, but that is unchanged by this feature.

## External API Dependencies

The landing page itself has no external API dependencies. The broader application depends on:

- **OpenAI ChatKit API**: Used by the chat application (`@openai/chatkit-react`)
- **External**: Managed by ChatKit SDK, not directly called by landing page

## Summary

The `/contracts` directory is typically used for API specifications (OpenAPI/Swagger, GraphQL schemas, etc.). Since the landing page is a **frontend-only, static content feature**, no API contracts are required at this time.

**If you need to add dynamic features requiring API contracts in the future**, add OpenAPI specs or GraphQL schemas to this directory and reference them from the implementation plan.

---

**Related Documentation**:
- [data-model.md](../data-model.md) - Content structure and component props
- [quickstart.md](../quickstart.md) - Development setup guide
- [research.md](../research.md) - Technical decisions and rationale
