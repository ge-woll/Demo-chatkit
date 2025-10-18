# Implementation Plan: Modern Landing Page for Judgment Summariser

**Branch**: `001-landing-page` | **Date**: 2025-10-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-landing-page/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create a modern, visually appealing landing page for the judgment summariser application that clearly communicates value proposition to legal professionals within seconds. The landing page will serve as the entry point before users access the main ChatKit application interface, featuring hero section, benefits showcase, and clear call-to-action buttons. The implementation will use Next.js with React components, Tailwind CSS for styling, and follow responsive design principles to ensure optimal experience across devices.

## Technical Context

**Language/Version**: TypeScript 5.x with React 19, Next.js 15.5.4
**Primary Dependencies**: React 19.2.0, Next.js 15.5.4, Tailwind CSS 4, @openai/chatkit-react >=1.1.1
**Storage**: N/A (static landing page, no data persistence required)
**Testing**: NEEDS CLARIFICATION (no testing framework currently configured in package.json)
**Target Platform**: Web (responsive design for mobile 320px+, tablet, desktop)
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: <3 second initial load on 4G, Lighthouse score 90+, Core Web Vitals passing
**Constraints**: <200ms Time to First Byte, WCAG 2.1 Level AA accessibility compliance, progressive enhancement (works without JS for core content)
**Scale/Scope**: Single landing page route, 4-6 content sections, minimal interactivity (CTA buttons, smooth scrolling)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASSED - No constitution file with specific rules detected. Using default best practices.

The project constitution template is not yet customized for this organization. Default checks applied:

- ✅ **Simplicity**: Landing page is a single route addition, leveraging existing Next.js infrastructure
- ✅ **No Over-Engineering**: Uses existing Tailwind CSS setup, no additional frameworks or dependencies required
- ✅ **Existing Patterns**: Follows established Next.js App Router patterns already in use (app/page.tsx structure)
- ✅ **Testing Strategy**: Will need clarification on testing approach (see Phase 0 research)
- ✅ **Performance**: Aligns with modern web standards (static generation, optimized assets)

## Project Structure

### Documentation (this feature)

```
specs/001-landing-page/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command) - N/A for landing page
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command) - N/A for landing page
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```
# Web application structure (Next.js App Router)
app/
├── landing/             # NEW: Landing page route
│   └── page.tsx        # Main landing page component
├── App.tsx             # Existing: Main chat application
├── page.tsx            # Existing: Current entry point (will route to landing or app)
├── layout.tsx          # Existing: Root layout
└── api/                # Existing: API routes
    └── create-session/ # Existing: ChatKit session endpoint

components/
├── landing/            # NEW: Landing page components
│   ├── Hero.tsx       # Hero section with headline and CTA
│   ├── Features.tsx   # Features/benefits showcase
│   ├── CTA.tsx        # Call-to-action sections
│   └── Footer.tsx     # Footer (optional)
├── ChatKitPanel.tsx   # Existing: Chat interface component
└── ErrorOverlay.tsx   # Existing: Error handling

lib/
├── config.ts          # Existing: Configuration (may extend for landing page content)
└── landing-content.ts # NEW: Landing page content configuration

hooks/
└── useColorScheme.ts  # Existing: Theme management (may reuse for landing page)

public/
└── landing/           # NEW: Landing page assets
    ├── hero-image.png # Hero section visuals
    └── icons/         # Feature icons
```

**Structure Decision**: The landing page will be added as a new route under `app/landing/` following the Next.js App Router convention. Components will be organized under `components/landing/` for modularity and reusability. This approach:
- Maintains separation between landing page and main application
- Allows easy routing logic (show landing to new visitors, direct access to app for returning users)
- Follows existing project patterns (component-based architecture, Tailwind styling)
- Enables independent deployment and testing of landing page

**Routing Strategy**: The root `app/page.tsx` will be updated to serve as router logic:
- New visitors or direct access to `/` → Landing page
- Users clicking "Try Now" CTA → Main application (`/app` or current App.tsx)
- Alternatively, landing page at `/` and app at `/app` route

## Complexity Tracking

*No Constitution violations detected - this section is not applicable.*

The landing page implementation adds minimal complexity:
- Single new route following existing patterns
- Reuses existing Tailwind CSS configuration
- No new major dependencies required
- Leverages Next.js static generation for optimal performance
