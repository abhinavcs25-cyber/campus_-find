# CampusFind – Product Assumptions & MVP Scope

## 1. Product Overview
**CampusFind** is a campus-exclusive Lost and Found web platform designed to streamline the recovery of misplaced personal belongings across university grounds, departments, libraries, athletic facilities, and cafeterias.

## 2. Key Target Personas
1. **The Distressed Student**: Misplaced personal items (calculators, wallets, ID cards, keys, textbooks) between lectures or labs and needs a fast, centralized campus registry.
2. **The Good Samaritan Student / Peer**: Discovers an abandoned item in a lecture hall or cafeteria, wants a quick and frictionless way to report what was found without having to walk across campus immediately.
3. **Campus Staff & Security**: Needs visibility into items reported or surrendered at department front desks and lost-and-found security repositories.

## 3. Product Scope & Functional Assumptions (College Milestone MVP)
- **Frontend-First Architecture**: Operating cleanly in Next.js (App Router, JavaScript) using React Context API for global state management. No external database or server runtime is required for this milestone, ensuring 100% reliable local evaluation without external API keys or network latency.
- **Client-Side State & Persistence**: State is held in React Context with localStorage synchronization. User submissions, status updates (e.g. marking an item as returned), and deletions immediately reflect across all pages and survive browser refreshes.
- **Simulated Authentication / Current User**:
  - Current Demo User: `Alex Johnson` (`alex.johnson@campus.edu`)
  - Department: `Computer Science & Engineering`
  - Demo user has realistic pre-seeded reports in `My Reports` enabling immediate evaluation of:
    - Filtering own reports (Lost, Found, Resolved).
    - Marking item as "Returned / Resolved" (status changes from Lost/Found to Returned, badge color updates to Blue, stats recalculate in real-time).
    - Deleting reports with a modern confirmation dialog modal.
- **Image Upload Simulation**:
  - Accepts standard image formats (JPEG, PNG, WEBP).
  - Uses `URL.createObjectURL(file)` for real-time frontend image preview with proper garbage collection and cleanup via `URL.revokeObjectURL(url)`.
  - Fallback preset illustrations provided for quick testing without requiring local test files.
- **Communication & Safe Exchange**:
  - "Contact Reporter" generates a standard, pre-filled RFC-compliant `mailto:` link containing student details, subject, and campus item ID to initiate communication.
  - Optional phone number link initiates direct calling (`tel:`) on mobile devices.
- **Status Lifecycle**:
  - `Lost` (Red badge) -> Active search in progress.
  - `Found` (Green badge) -> Item secured by finder, awaiting owner verification.
  - `Returned` (Blue badge) -> Item reunited with rightful owner, resolved.

## 4. Non-Functional Expectations
- **Responsiveness**: Fully responsive across mobile (375px+), tablet (768px+), and desktop (1024px+).
- **Accessibility**: Clear semantic headings, ARIA attributes, contrast ratios exceeding WCAG AA standards, focus rings, and keyboard navigation.
- **Performance**: Zero external network blockers; all SVGs, icons, and fonts load locally with instant rendering.

