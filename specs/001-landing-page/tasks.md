# Tasks: Modern Landing Page for Judgment Summariser

**Input**: Design documents from `/specs/001-landing-page/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: No test tasks included - testing framework will be setup but test writing is deferred to future iteration per specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions
- **Next.js App Router**: `app/`, `components/`, `lib/` at repository root
- Paths follow existing Next.js project structure per plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependency installation

- [x] T001 Install @heroicons/react for icon components via npm
- [x] T002 [P] Install testing dependencies (@testing-library/react, @testing-library/jest-dom, @testing-library/user-event, jest, jest-environment-jsdom) via npm
- [x] T003 [P] Create directory structure: mkdir -p components/landing lib public/landing/icons
- [x] T004 [P] Create TypeScript types file for landing content at types/landing.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core configuration and content that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Create landing content configuration file at lib/landing-content.ts with LandingContent interface
- [x] T006 Define hero content in lib/landing-content.ts (headline: "Summarize Legal Judgments in Seconds, Not Hours", subheadline, CTAs)
- [x] T007 Define features array in lib/landing-content.ts (Instant Summaries, Key Points Extraction, Time Savings - 3 features minimum)
- [x] T008 [P] Add placeholder hero image to public/landing/ directory (legal-themed stock photo or placeholder)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - First-Time Visitor Understanding Value (Priority: P1) 🎯 MVP

**Goal**: Create hero section that communicates judgment summariser value proposition within 5 seconds to legal professionals

**Independent Test**: Load landing page and verify visitor can understand product purpose (judgment summarisation for legal professionals) and primary benefit (time savings) within 5 seconds without clicking anything

**Acceptance Criteria**:
- Clear headline describing judgment summariser's core function
- Primary benefit (saving time analyzing legal judgments) visible in hero section
- Targeted messaging for legal professionals
- Features/benefits visible on scroll

### Implementation for User Story 1

- [x] T009 [P] [US1] Create Hero component at components/landing/Hero.tsx with headline, subheadline, and CTA buttons
- [x] T010 [P] [US1] Create CTA button component at components/landing/CTA.tsx with primary/secondary variants
- [x] T011 [US1] Implement responsive layout in Hero.tsx (mobile: stacked, desktop: side-by-side at lg breakpoint)
- [x] T012 [US1] Add semantic HTML structure to Hero.tsx (main, section with aria-labelledby, h1 with id)
- [x] T013 [US1] Style Hero component with Tailwind CSS (text-4xl sm:text-5xl lg:text-6xl for headline, proper spacing)
- [x] T014 [US1] Add primary CTA linking to /app with aria-label and high-contrast styling
- [x] T015 [US1] Add secondary CTA for smooth scroll to #features section
- [x] T016 [US1] Create landing page route at app/landing/page.tsx importing Hero component
- [x] T017 [US1] Verify hero section displays above the fold on mobile (320px), tablet (768px), and desktop (1024px+)

**Checkpoint**: At this point, User Story 1 should be fully functional - visitor can load landing page and understand value proposition within 5 seconds

---

## Phase 4: User Story 2 - Visual Appeal and Modern Design (Priority: P2)

**Goal**: Implement visually appealing, modern interface with responsive design and smooth interactions that builds trust and credibility

**Independent Test**: Conduct visual assessment on multiple devices (mobile 320px, tablet 768px, desktop 1024px+) and verify modern, professional appearance with smooth transitions and readable typography

**Acceptance Criteria**:
- Modern and professional visual design
- Responsive layout on all device sizes
- Smooth transitions and animations
- Clear, readable typography following modern design principles
- Meets or exceeds legal tech design standards

### Implementation for User Story 2

- [ ] T018 [P] [US2] Refine typography in all components using Tailwind font utilities (Inter font via next/font, proper hierarchy)
- [ ] T019 [P] [US2] Add smooth transitions to CTA buttons (hover states, focus indicators with ring utilities)
- [ ] T020 [US2] Implement color scheme using Tailwind slate palette (slate-900 for primary text, slate-600 for secondary)
- [ ] T021 [US2] Add subtle animations to hero section (fade-in on load using CSS transitions, optional)
- [ ] T022 [US2] Verify responsive breakpoints in Hero.tsx (320px: single column, 768px: 2-col, 1024px+: side-by-side)
- [ ] T023 [US2] Add focus states for keyboard navigation (visible focus rings on all interactive elements)
- [ ] T024 [US2] Optimize spacing and padding for visual balance (px-4 lg:px-8, py-16, consistent gap-4 to gap-8)
- [ ] T025 [US2] Test dark mode support using useColorScheme hook from existing hooks/useColorScheme.ts
- [ ] T026 [US2] Verify professional appearance on Chrome, Safari, Firefox, and Edge browsers

**Checkpoint**: At this point, User Stories 1 AND 2 should both work - landing page has clear value prop AND modern, professional design

---

## Phase 5: User Story 3 - Call-to-Action Journey (Priority: P2)

**Goal**: Implement prominent, accessible CTAs at multiple positions that seamlessly navigate users from landing page to application

**Independent Test**: Track click-through on CTA buttons from landing page to application interface, verify CTAs are visible and tappable on mobile without scrolling, measure navigation time

**Acceptance Criteria**:
- Prominent CTA button visible to visitors
- CTA navigates to judgment summariser application (/app route)
- CTA easily tappable on mobile without scrolling
- CTAs available at multiple positions on page

### Implementation for User Story 3

- [ ] T027 [P] [US3] Verify primary CTA in Hero component links to /app route with proper Next.js Link component
- [ ] T028 [P] [US3] Ensure CTA is above fold on mobile (320px min-width) in Hero section
- [ ] T029 [US3] Add large touch targets to CTA buttons (min-h-12 for 48px height, px-8 for width)
- [ ] T030 [US3] Create additional CTA section at components/landing/CTASection.tsx for bottom of page
- [ ] T031 [US3] Add CTASection to landing page route after Features section
- [ ] T032 [US3] Style CTASection with compelling copy ("Ready to save time? Start summarizing now")
- [ ] T033 [US3] Verify CTAs work with keyboard navigation (Tab key to focus, Enter to activate)
- [ ] T034 [US3] Test CTA click tracking (console.log for analytics event or Vercel Analytics integration)
- [ ] T035 [US3] Verify smooth navigation from landing page to /app without errors

**Checkpoint**: All CTAs should navigate successfully to application, conversion path is clear and accessible

---

## Phase 6: User Story 4 - Feature Showcase and Benefits (Priority: P3)

**Goal**: Create features section that explains 3-5 key capabilities with visual elements to help visitors make informed decisions

**Independent Test**: Ask test users to list 3 key features after viewing page and measure comprehension, verify each feature has icon and clear benefit statement

**Acceptance Criteria**:
- 3-5 key capabilities clearly explained in features section
- Each feature description explains benefit to user
- Visual elements (icons) accompany each feature
- Visitors can visualize workflow of using summariser

### Implementation for User Story 4

- [ ] T036 [P] [US4] Create Features component at components/landing/Features.tsx with grid layout
- [ ] T037 [P] [US4] Create FeatureCard sub-component at components/landing/FeatureCard.tsx for individual feature display
- [ ] T038 [US4] Import Heroicons (ClockIcon, DocumentSearchIcon, ChartBarIcon) in Features.tsx
- [ ] T039 [US4] Map features array from lib/landing-content.ts to FeatureCard components
- [ ] T040 [US4] Style Features section with bg-slate-50 dark:bg-slate-900 for visual separation
- [ ] T041 [US4] Implement responsive grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- [ ] T042 [US4] Add section heading: "Why Legal Professionals Choose Our Summariser" (h2 with proper id)
- [ ] T043 [US4] Style FeatureCard with rounded-lg, bg-white, p-6, shadow-sm
- [ ] T044 [US4] Ensure icon size is appropriate (h-12 w-12) and colored consistently (text-slate-700)
- [ ] T045 [US4] Add Features component to app/landing/page.tsx after Hero section
- [ ] T046 [US4] Verify features section is accessible (proper heading hierarchy h1 → h2 → h3)
- [ ] T047 [US4] Test features section on mobile (stacked), tablet (2 columns), desktop (3 columns)

**Checkpoint**: All user stories should now be independently functional - complete landing page with value prop, design, CTAs, and features

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, performance, and cross-browser compatibility improvements affecting all user stories

- [ ] T048 [P] Add alt text to all images in Hero section (descriptive, not "image" or "photo")
- [ ] T049 [P] Verify color contrast ratios meet WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large)
- [ ] T050 [P] Add skip-to-content link for screen readers at top of page
- [ ] T051 [P] Optimize hero image with Next.js Image component (priority, placeholder="blur", proper width/height)
- [ ] T052 Test keyboard navigation through entire landing page (Tab, Enter, arrow keys)
- [ ] T053 Run Lighthouse accessibility audit via Playwright and verify score 90+ (SC-006)
- [ ] T054 Run Lighthouse performance audit and verify score 90+ (SC-005)
- [ ] T055 [P] Verify page loads in <3 seconds on simulated 4G connection (Chrome DevTools)
- [ ] T056 Test landing page on iOS Safari and Android Chrome for mobile compatibility
- [ ] T057 [P] Test landing page with JavaScript disabled (progressive enhancement - content visible)
- [ ] T058 [P] Verify total page size is <500KB (Network tab in DevTools)
- [ ] T059 [P] Add loading="lazy" to below-the-fold images if any
- [ ] T060 Update root app/page.tsx to route to landing page (redirect or show landing content)
- [ ] T061 Test end-to-end flow: land on page → read value prop → click CTA → arrive at /app
- [ ] T062 Document landing page setup in quickstart.md if needed (verify existing documentation is accurate)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion (T001-T004) - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase (T005-T008) completion
  - User stories can proceed in parallel if staffed
  - Or sequentially in priority order (US1 → US2 → US3 → US4)
- **Polish (Phase 7)**: Depends on desired user stories being complete (minimum US1 for MVP)

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2, T008) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational - Enhances US1 but independently testable (visual design applies to all)
- **User Story 3 (P2)**: Depends on US1 Hero component (T009) - Adds CTAs to existing Hero + new CTA section
- **User Story 4 (P3)**: Can start after Foundational - Independent Features component, no dependencies on US1-3

### Within Each User Story

- **User Story 1**: T009-T010 can run in parallel [P], then T011-T017 sequentially (Hero depends on CTA component)
- **User Story 2**: T018-T021 can run in parallel [P], then T022-T026 for testing
- **User Story 3**: T027-T029 can run in parallel [P], then T030-T035 (CTASection depends on existing Hero)
- **User Story 4**: T036-T038 can run in parallel [P], then T039-T047 (Features component development)

### Parallel Opportunities

- **Setup Phase**: T002, T003, T004 can run in parallel [P] (different concerns)
- **Foundational Phase**: T008 can run in parallel with T005-T007 [P] (image vs content config)
- **User Story 1**: T009 and T010 can run in parallel [P] (Hero and CTA are separate components)
- **User Story 2**: T018, T019, T020, T021 can run in parallel [P] (styling different aspects)
- **User Story 3**: T027, T028, T029 can run in parallel [P] (verification tasks on existing component)
- **User Story 4**: T036, T037, T038 can run in parallel [P] (Features component and icon imports)
- **Polish Phase**: T048, T049, T050, T051, T057, T058, T059, T062 can run in parallel [P] (independent concerns)

---

## Parallel Example: User Story 1

```bash
# Launch Hero and CTA components together:
Task T009: "Create Hero component at components/landing/Hero.tsx"
Task T010: "Create CTA button component at components/landing/CTA.tsx"

# Both can be developed in parallel since they're separate files
# Hero will import CTA once both are complete
```

## Parallel Example: User Story 4

```bash
# Launch Features component creation together:
Task T036: "Create Features component at components/landing/Features.tsx"
Task T037: "Create FeatureCard sub-component at components/landing/FeatureCard.tsx"
Task T038: "Import Heroicons in Features.tsx"

# All three can be developed in parallel
# Final integration happens in T039-T045
```

---

## Implementation Strategy

### MVP First (User Story 1 Only) - RECOMMENDED

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T008) - CRITICAL
3. Complete Phase 3: User Story 1 (T009-T017)
4. **STOP and VALIDATE**: Test landing page displays value prop clearly
5. Optional: Add minimal polish (T048-T051 for accessibility)
6. Deploy/demo MVP with just hero section

**MVP Deliverable**: Landing page with hero section communicating value proposition in <5 seconds

### Incremental Delivery

1. **Foundation**: Setup + Foundational (T001-T008) → Configuration ready
2. **MVP**: Add User Story 1 (T009-T017) → Test value prop independently → Deploy
3. **Enhanced Design**: Add User Story 2 (T018-T026) → Test visual appeal → Deploy
4. **Conversion Optimization**: Add User Story 3 (T027-T035) → Test CTA journey → Deploy
5. **Feature Education**: Add User Story 4 (T036-T047) → Test feature comprehension → Deploy
6. **Production Ready**: Add Polish (T048-T062) → Full accessibility & performance → Deploy

Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1. **All devs**: Complete Setup + Foundational together (T001-T008)
2. **Once Foundational done**:
   - Developer A: User Story 1 (T009-T017) - Hero section
   - Developer B: User Story 4 (T036-T047) - Features section (independent)
   - Developer C: Setup testing infrastructure for later
3. **After US1 complete**:
   - Developer A: User Story 2 (T018-T026) - Styling (enhances US1)
   - Developer B: User Story 3 (T027-T035) - CTAs (depends on US1 Hero)
4. **Final**: All devs on Polish (T048-T062) together

---

## Testing Strategy

### Manual Testing Checkpoints

**After User Story 1 (T017)**:
- Load http://localhost:3000/landing
- Verify headline is visible and clear
- Verify visitor can understand product purpose in <5 seconds
- Check mobile (320px), tablet (768px), desktop (1024px)

**After User Story 2 (T026)**:
- Assess visual design for modern, professional appearance
- Test hover states on CTA buttons
- Verify responsive layout at all breakpoints
- Test dark mode toggle if applicable

**After User Story 3 (T035)**:
- Click primary CTA and verify navigation to /app
- Test secondary CTA scroll behavior to #features
- Verify CTA is tappable on mobile device
- Test keyboard navigation (Tab to CTA, Enter to click)

**After User Story 4 (T047)**:
- Scroll to features section
- Count 3-5 features displayed
- Verify each feature has icon and description
- Ask test user to recall 3 features

**After Polish (T062)**:
- Run full Lighthouse audit (Performance, Accessibility, Best Practices, SEO)
- Test on actual mobile devices (iOS Safari, Android Chrome)
- Test with screen reader (NVDA, VoiceOver)
- Verify page load time <3 seconds on 4G

### Automated Testing (Playwright - Optional)

While test tasks are not included in this task list, once basic landing page is functional, consider adding:

- E2E test: Landing page loads and displays hero (T016 validation)
- E2E test: CTA click navigates to /app (T035 validation)
- E2E test: Features section displays 3+ features (T047 validation)
- Accessibility test: Lighthouse accessibility score 90+ (T053 validation)
- Performance test: Lighthouse performance score 90+ (T054 validation)

---

## Notes

- **[P] tasks**: Different files, no dependencies - can run in parallel
- **[Story] label**: Maps task to specific user story for traceability
- **Independent user stories**: Each story (US1-US4) can be tested independently
- **MVP scope**: User Story 1 alone is sufficient for MVP (hero with value prop)
- **Incremental delivery**: Each story adds value without breaking previous stories
- **Commit frequency**: Commit after each task or logical group (e.g., after T010, after T017)
- **Validation checkpoints**: Stop after each user story phase to test independently
- **File paths**: All paths are relative to repository root

### Success Criteria Reference

Tasks mapped to Success Criteria from spec.md:

- **SC-001** (10-second value understanding): T009-T017 (User Story 1)
- **SC-002** (Bounce rate <60%): All user stories contribute
- **SC-003** (3-second load time): T054, T055, T058 (Performance)
- **SC-004** (15% CTR): T027-T035 (User Story 3 - CTAs)
- **SC-005** (Mobile usability 90+): T054 (Lighthouse mobile)
- **SC-006** (Zero accessibility violations): T053 (Lighthouse a11y)
- **SC-007** (80% rate design professional): T018-T026 (User Story 2)
- **SC-008** (95% browser compatibility): T029, T056 (Cross-browser testing)

---

**Total Tasks**: 62
- Setup: 4 tasks
- Foundational: 4 tasks
- User Story 1 (P1 - MVP): 9 tasks
- User Story 2 (P2): 9 tasks
- User Story 3 (P2): 9 tasks
- User Story 4 (P3): 12 tasks
- Polish: 15 tasks

**Parallel Opportunities**: 24 tasks marked [P] (38% of tasks can run in parallel)

**Estimated Timeline** (single developer, sequential):
- Setup + Foundational: 30 minutes
- User Story 1 (MVP): 1.5 hours
- User Story 2: 1 hour
- User Story 3: 1 hour
- User Story 4: 1.5 hours
- Polish: 2 hours
- **Total: ~7.5 hours** for complete landing page

**MVP Timeline** (User Story 1 only): ~2 hours total
