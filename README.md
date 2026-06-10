# Order Management System (OMS) Dashboard

A complete React application reproducing the Order Management System (OMS) Dashboard UI with high visual fidelity (95%+ similarity) based on the target specification. It features full state integration, light/dark mode triggers, local storage persistence for order status and comments, global search, and document interactions.

## Technology Stack

- **Core**: React 18, Vite
- **Styling**: CSS Modules and Global CSS variables
- **Routing/State**: React Hooks (State, Ref, Effect)
- **Icons**: Lucide React (vector-perfect icons matching screenshot colors)
- **Data**: Mock JSON records serviced through helper modules

---

## Features

1. **Top Navigation Bar**:
   - Replicates deep navy blue branding header.
   - White utility icons (Notification, Calendar, settings, search trigger).
   - Theme toggle (Sun/Moon) with dynamic stylesheet adaptation.
   - Avatar image placeholder.

2. **Left Vertical Sidebar**:
   - Space-efficient vertical menu featuring custom colored SVGs matching specified items.
   - Integrated hover tooltips and selection highlights.

3. **Order Header**:
   - Real-time Breadcrumb path indicating the current order location.
   - Order Identifier (OD-1591) and active status pill.
   - Dynamic **Status Dropdown** (In Process, Pending, Approved, Completed, Cancelled) that updates active status pills across the dashboard.
   - Dynamic **Action Dropdown** (Export JSON, print sheet, refresh datasets).

4. **Left Quick-Glance Summary**:
   - Preserves exact key-value layouts and visual spelling (including *"Total quality"*).
   - Real-time status badge sync.
   - Vertical milestone activity timeline (connecting lines, document indicators).

5. **Tab Navigation (8 Tab Options)**:
   - Includes: `Detail`, `Offers & Coupon`, `Module`, `Stock Reservation`, `Documents`, `Info`, `Comment`, `Timeline`.
   - Clicking tab updates content dynamically.
   - `Detail` tab active by default, displaying the main three grids.

6. **Order Breakdown Table**:
   - Replicates table structure, UOM, and timestamps.
   - Left-edge vertical green indicators on items.
   - Orange-filled header highlight for the Status column.
   - Real-time sorting by headers and input filtering search.

7. **Comments CRUD Interface**:
   - Allows users to add, update, and delete remarks.
   - Saves updates immediately to `localStorage` for cross-refresh persistence.

8. **Global Search Modal**:
   - Triggered by clicking the navbar search icon.
   - Allows search filtering across materials, order numbers, and timeline entries with clickable matches.

9. **Responsive Design**:
   - Desktop: Near pixel-perfect clone of the original screenshot.
   - Tablet: Multi-column content stacks to 2 columns.
   - Mobile: Vertical column stacks with horizontal scrollable tables.

---

## Folder Structure

```
oms-dashboard/
├── package.json
├── vite.config.js
├── index.html
├── README.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── TopNavbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── OrderHeader.jsx
│   │   ├── OrderSummary.jsx
│   │   ├── TimelinePanel.jsx
│   │   ├── TabNavigation.jsx
│   │   ├── OrderDetailSection.jsx
│   │   ├── OrderBreakdownTable.jsx
│   │   ├── CustomerDetailSection.jsx
│   │   ├── DocumentsSection.jsx
│   │   ├── CommentSection.jsx
│   │   ├── StatusBadge.jsx
│   │   ├── Loader.jsx
│   │   ├── SearchModal.jsx
│   │   └── ActionDropdown.jsx
│   ├── pages/
│   │   └── Dashboard.jsx
│   ├── services/
│   │   └── orderService.js
│   └── mock/
│       ├── order.json
│       ├── orderDetails.json
│       ├── items.json
│       ├── customer.json
│       ├── timeline.json
│       ├── documents.json
│       └── comments.json
```

---

## Installation & Run Instructions

To run the application locally, navigate to the project root directory and execute the following commands:

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

The app will start running on your local port (typically `http://localhost:5173`).

---

## Deployment Instructions

Since this is a client-only single page application powered by mock services and JSON data, you can build and host it without any database or backend:

### Building for Production
```bash
npm run build
```

This compiles optimized assets to a `dist/` directory.

### Hosting
- **Vercel**: Link your GitHub repository, choose **Vite** as the framework template, and deploy directly.
- **Netlify**: Drag and drop the built `dist` folder onto your Netlify dashboard or use Netlify CLI.
