# CampusFind – Design System Specification

## 1. Design Philosophy
Modern, clean, and functional SaaS aesthetic tailored for higher-education environments. Emphasizes instant legibility, gentle rounded corners, subtle elevation, and purposeful color coding for safety and status visibility.

## 2. Color Palette & Semantic Tokens
| Token | Hex Value | Semantic Role | Tailwind Equivalent |
|---|---|---|---|
| **Primary** | `#2563EB` | Brand actions, primary CTAs, links, active state | `blue-600` |
| **Primary Hover** | `#1D4ED8` | Hover state for primary CTAs | `blue-700` |
| **Secondary** | `#7C3AED` | Badges, gradient accents, secondary highlights | `purple-600` |
| **Background** | `#F8FAFC` | Page body background | `slate-50` |
| **Surface** | `#FFFFFF` | Card surfaces, modals, elevated panels | `white` |
| **Main Text** | `#111827` | Headings, primary titles | `gray-900` |
| **Secondary Text** | `#64748B` | Subtitles, helper text, timestamps, captions | `slate-500` |
| **Accent** | `#F59E0B` | Badges, warning highlights, alert borders | `amber-500` |
| **Success / Found** | `#16A34A` | "Found" badges, success toasts, verified indicators | `emerald-600` |
| **Danger / Lost** | `#DC2626` | "Lost" badges, delete confirmation, error text | `red-600` |
| **Returned / Resolved** | `#2563EB` | "Returned to Owner" badges | `blue-600` |

## 3. Typography Scale (Inter Font Family)
- **H1 (Hero / Main Pages)**: `36px` - `48px`, font-weight `900` / `800`, line-height `1.15`, tracking `-0.025em`.
- **H2 (Section Titles)**: `24px` - `30px`, font-weight `700` / `800`, tracking `-0.02em`.
- **H3 (Card & Subheadings)**: `18px` - `20px`, font-weight `700`, line-height `1.3`.
- **Body Regular**: `16px`, font-weight `400` / `500`, line-height `1.6`.
- **Small / Metadata Text**: `12px` - `14px`, font-weight `500` / `600`, line-height `1.4`.
- **Micro / Badges**: `11px`, font-weight `700`, uppercase / title case.

## 4. UI Elements & Elevation
- **Cards**: `rounded-2xl` (`16px`), `border border-slate-200/90`, `bg-white`, `shadow-sm`, with hover elevation `shadow-hover` (`-translate-y-1`).
- **Modals**: `rounded-3xl` (`24px`), `shadow-2xl`, with `bg-slate-900/60 backdrop-blur-sm` overlay.
- **Form Controls**: `rounded-xl` (`12px`), `bg-slate-50`, border `border-slate-200`, focus ring `focus:ring-2 focus:ring-primary/20 focus:border-primary`.
- **Badges**: Pill shape (`rounded-full`), soft pastel background, matching colored text, 1.5px border, and a glowing pulse dot.

## 5. Reusable Components Catalogue
- `Navbar`: Responsive sticky header with desktop navigation, quick action dropdown, and mobile drawer.
- `Footer`: Campus info, safety contact details, and milestone attribution.
- `Button`: Polymorphic button supporting 6 variants (`primary`, `secondary`, `outline`, `ghost`, `danger`, `success`), 3 sizes, and inline icons.
- `SearchBar`: Live search input with clear button and keyboard focus.
- `CategoryFilter`: Custom styled select dropdown mapped to campus item categories.
- `StatusBadge`: Dynamic color-coded badge (`Lost` = Red, `Found` = Green, `Returned` = Blue).
- `ItemCard`: Multi-attribute card showing item image, category pill, title, location, date, status, and detail trigger.
- `ItemGrid`: Responsive CSS grid supporting 1 to 4 column layouts.
- `ItemForm`: Comprehensive form handling validation, file preview, cleanup, and context integration.
- `Modal`: Accessible dialog supporting destructive confirmations with backdrop click & escape listener.
- `EmptyState`: Contextual empty state with friendly icon, title, description, and action button.
- `StatCard`: Key performance indicators with colored icon badges and trend tags.
- `Toast`: Global feedback notification with auto-dismiss and color-coded status icon.

