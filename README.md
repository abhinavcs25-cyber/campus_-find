# CampusFind – Campus Lost and Found System
> **Lost Something? Find It Here.**
> A modern, responsive, campus-exclusive Lost and Found web application designed for university students, faculty, and campus security.

---

## 📌 Project Overview
**CampusFind** is an intuitive web portal that connects college students who have lost personal belongings with fellow peers and staff who have found them. 
Misplacing essential campus items like student ID cards, scientific calculators, laptops, chargers, keys, and textbooks causes immense stress and productivity loss during semesters. CampusFind provides a unified, centralized bulletin board and recovery workflow that turns lost items into resolved campus reunions.

---

## 🎯 Problem Statement
On modern university campuses:
- Lost items are scattered across fragmented physical locations (canteen, department desks, library checkouts, security kiosks).
- Students resort to unorganized social media posts or spamming group chats where listings quickly get buried.
- Finders have no standardized way to verify owners or safely notify them without exposing their private credentials.

**CampusFind solves this by offering:**
1. A categorized, searchable, campus-wide live directory of lost and found listings.
2. Standardized item reporting with live photo previews, exact campus building locations, and contact info.
3. A student dashboard to manage reported items, mark items as returned, or safely remove resolved postings.

---

## ✨ Key Features
- **Modern Responsive Design**: Optimized for mobile phones, tablets, and desktop workstations.
- **Global State Management via React Context API**: All listings, status updates, and reports sync globally without external server latency.
- **Instant Search & Multi-Filter System**:
  - Live search by item name, description, or campus building.
  - Category filtering (Electronics, ID & Cards, Bags & Wallets, Books, Keys, etc.).
  - Status tabs (`All`, `Lost`, `Found`, `Returned`).
  - Multi-attribute sorting (`Newest First`, `Oldest First`, `Name A-Z`).
- **Interactive Reporting Forms**:
  - Distinct reporting flows for **Lost** items and **Found** items.
  - Client-side image upload preview supporting JPG, PNG, and WEBP with memory cleanup (`URL.createObjectURL` & `URL.revokeObjectURL`).
  - Built-in sample illustration presets for instant testing.
  - Comprehensive form validation with helpful inline error alerts.
- **Detailed Item View (`/items/[id]`)**:
  - High-resolution item illustration/photo display.
  - Dynamic status badge indicator (Lost = Red, Found = Green, Returned = Blue).
  - One-click RFC `mailto:` generator pre-populating item ID, location, and details for quick student-to-student outreach.
  - Direct call link (`tel:`) for immediate phone contact.
  - Custom 404 handler for non-existent item IDs.
- **Simulated Student Profile & "My Reports" (`/my-reports`)**:
  - Simulated active user: **Alex Johnson** (`alex.johnson@campus.edu`).
  - View individual reports submitted by the current user.
  - Real-time status toggling to **"Mark as Returned"** which updates statistics across the whole application.
  - Accessible confirmation modal for deleting listings.
  - Demo reset button to restore default sample records at any time.
- **Toast Notification Engine**: Non-intrusive floating toasts that confirm actions, status updates, and deletions.

---

## 🛠️ Technology Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router, JavaScript)
- **Library**: [React 18](https://react.dev/)
- **State Management**: React Context API (`createContext`, `useContext`, `useState`, `useEffect`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with PostCSS & custom design tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Storage**: Client-side React State + `localStorage` persistence layer

---

## 📂 Project Folder Structure
```text
campus-find/
|-- app/
|   |-- layout.js              # Root layout with ItemProvider, Navbar, Footer, and Toast
|   |-- page.js                # Landing page with hero, statistics, how-it-works, & recent items
|   |-- globals.css            # Tailwind directives and custom scrollbar styling
|   |
|   |-- dashboard/
|   |   |-- page.js            # Main item discovery registry with search, filters, and grid
|   |
|   |-- report-lost/
|   |   |-- page.js            # Lost item submission form
|   |
|   |-- report-found/
|   |   |-- page.js            # Found item submission form
|   |
|   |-- items/
|   |   |-- [id]/
|   |       |-- page.js        # Detailed view for individual items with reporter mailto
|   |
|   |-- my-reports/
|       |-- page.js            # Simulated student report management & status updates
|
|-- components/
|   |-- Navbar.js              # Sticky responsive navigation with active page highlight
|   |-- Footer.js              # Campus contacts, quick links, and milestone credits
|   |-- Button.js              # Multi-variant button component
|   |-- SearchBar.js           # Live search input with clear button
|   |-- ItemCard.js            # Standard item preview card with image and badges
|   |-- ItemGrid.js            # Responsive grid container
|   |-- CategoryFilter.js      # Category selection dropdown
|   |-- StatusBadge.js         # Color-coded status badge (Red/Green/Blue)
|   |-- ItemForm.js            # Reusable form with file preview and validation
|   |-- Modal.js               # Accessible confirmation dialog modal
|   |-- EmptyState.js          # Fallback state when zero items match filters
|   |-- StatCard.js            # Key metric card for the statistics section
|   |-- Toast.js               # Global notification banner
|
|-- context/
|   |-- ItemContext.js         # React Context API global state provider
|
|-- data/
|   |-- items.js               # 16 realistic dummy items & demo student profile
|
|-- public/
|   |-- images/                # Local SVG illustrations for items, hero, and avatar
|
|-- PRODUCT-ASSUMPTIONS.md     # Product scope, personas, and MVP assumptions
|-- DESIGN-SYSTEM.md           # Color tokens, typography, and UI specs
|-- package.json
|-- tailwind.config.js
|-- postcss.config.js
`-- README.md
```

---

## 🚀 Getting Started & Installation

### Prerequisites
- Node.js version 18.0.0 or later installed.
- npm version 9.0.0 or later.

### Installation Steps
1. Open your terminal in the project directory:
   ```bash
   cd skilllab
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

---

## 🧪 Testing User Flows (Evaluation Checklist)
1. **Explore Landing Page (`/`)**:
   - Check the **Hero Section**; test the search box (e.g. type `"Calculator"` or click one of the popular tags).
   - Verify the **Live Statistics** cards (Total Reports, Active Lost, Found, Returned).
   - Check the **Recently Reported Items** (4 latest cards).
2. **Item Discovery Dashboard (`/dashboard`)**:
   - Search by keyword (e.g., `"Wallet"`, `"Library"`, `"CLRS"`).
   - Filter by category (e.g. `"Electronics"`, `"Books & Stationery"`).
   - Toggle status tabs: `All`, `Lost`, `Found`, `Returned`.
   - Sort by `Newest First`, `Oldest First`, or `Name (A-Z)`.
   - Click **Reset** when filters are applied.
3. **Report Lost Item (`/report-lost`)**:
   - Fill out the form with a test item (e.g. `"Graphing Tablet"`, category `"Electronics"`).
   - Select an image file or choose an illustration preset.
   - Click **Submit Lost Item Report**; verify the success toast and automatic redirection to its details page.
   - Check `/dashboard` to verify that your new item appears at the top.
4. **Report Found Item (`/report-found`)**:
   - File a report for a found item with location and contact info.
   - Verify the green status badge and addition to the registry.
5. **Item Details Page (`/items/[id]`)**:
   - Click any card to view full details.
   - Click **"Contact Reporter"** to test the pre-filled `mailto:` link.
   - Test an invalid URL (e.g. `/items/99999`) to see the custom 404 page.
6. **My Reports (`/my-reports`)**:
   - See reports submitted by demo user **Alex Johnson**.
   - Click **"Mark as Returned"** on an item. Observe the status badge turn blue and statistics update instantly.
   - Click the **Delete** button, confirm the modal prompt, and observe the item removal.
   - Click **"Reset Demo Data"** to restore original sample records.

---

## 📸 Screenshots Overview
- **Landing Page**: Modern hero with campus-themed illustration, live counters, and quick actions.
- **Dashboard**: Multi-filter layout with search, category select, status tabs, and item grid.
- **Report Item**: Split layout with photo preview, image presets, and inline validation.
- **Item Details**: High-resolution image card with verified reporter contact box.
- **My Reports**: Personal student hub with resolution actions and delete confirmations.

---

## 👥 Team Member Contributions
| Member | Primary Contribution Area |
|---|---|
| **Frontend Architect** | Next.js App Router setup, React Context API implementation, and state synchronization. |
| **UI/UX Designer** | Design system token definition, Tailwind CSS styling, color palette, and responsive layouts. |
| **Component Developer** | Reusable UI components (`ItemCard`, `SearchBar`, `Modal`, `ItemForm`, `Toast`). |
| **QA & Documentation** | Dummy data creation, input validation, edge-case testing, and technical documentation. |

---

## 🎓 Milestone Evaluation Notes
This application was engineered with clean, idiomatic React code, zero external API keys, zero backend dependencies, and fully self-contained local SVG assets. It is completely ready for live college project demonstration and code walkthroughs.

