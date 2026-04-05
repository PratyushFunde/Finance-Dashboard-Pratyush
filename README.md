# 📊 Finance Dashboard – Architecture & Approach

## 🧱 Project Structure

This project follows a **feature-based folder structure**, making it scalable, modular, and easy to maintain as the application grows.

```

src/
│
├── app/                    # Global app-level logic
│   └── store/              # Zustand stores (state management)
│
├── components/             # Reusable UI components
│   ├── common/             # Shared components (charts, cards, etc.)
│   └── layout/             # Layout components (Sidebar, Topbar)
│
├── features/               # Feature-based modules
│   ├── dashboard/          # Dashboard feature
│   ├── transactions/       # Transactions feature
│   └── insights/           # Insights feature
│
├── hooks/                  # Custom reusable hooks
│
├── utils/                  # Helper functions (calculations, formatting)
│
├── types/                  # TypeScript types/interfaces
│
├── constants/              # Static constants (months, config)
│
└── routes/                 # Application routing
```

---

## 🧩 Feature-Based Approach

Instead of organizing by file type (like all components together), this project groups code **by feature/domain**.

### ✅ Benefits:

* Better scalability for large apps
* Easier to locate related logic
* Reduced coupling between features
* Cleaner separation of concerns

### Example:

```
features/transactions/
├── components/
├── hooks/
├── utils/
```

Each feature is **self-contained**, making it easier to extend or refactor.

---

## 🧠 State Management (Zustand)

The app uses **Zustand** for lightweight and scalable state management.

### Why Zustand?

* Minimal boilerplate compared to Redux
* Simple and intuitive API
* No providers required
* Great performance with selective subscriptions

### Example Stores:

* `useTransactionStore` → manages transactions data
* `useInsightsStore` → manages date range for insights
* `useAuthStore` → manages user role (RBAC simulation)
* `useThemeStore` → handles light/dark theme

### Pattern Used:

* Global shared state → stored in Zustand
* Derived data → handled via **custom hooks (useInsights)**

---

## 🎨 UI & Styling

### Tailwind CSS

Used for utility-first styling.

**Benefits:**

* Rapid UI development
* Consistent design system
* Easy theming with CSS variables

---

## 🎯 Icons

### Lucide Icons

Used for clean and modern iconography.

**Why Lucide?**

* Lightweight
* Customizable
* Consistent design language

---

## 🎞 Animations

### Framer Motion

Used to enhance user experience with smooth animations.

**Used for:**

* Sidebar expansion
* Page transitions
* Card animations
* Micro-interactions

---

## 📈 Charts & Data Visualization

### Recharts

Used for building responsive and customizable charts.

**Charts implemented:**

* Expense Line Chart
* Category Breakdown (Pie/Bar)
* Time-based trends

**Why Recharts?**

* Declarative API
* Responsive by default
* Easy integration with React

---

## ♻️ Reusability Strategy

The project emphasizes **reusable components**, especially for:

* Cards
* Charts (moved to `common/charts`)
* Filters and selectors

Example:

```
components/common/charts/ExpenseLineChart.tsx
```

Used in:

* Dashboard
* Insights

---

## ⚙️ Key Features

* 📊 Dashboard with summaries & charts
* 💳 Transactions table with filtering & export
* 🔐 Role-based UI (Viewer/Admin)
* 📈 Insights with dynamic calculations
* 📅 Date range filtering
* 🌙 Dark mode support
* 📱 Fully responsive layout

---

## 🚀 Summary

This project demonstrates:

* Clean architecture using **feature-based structure**
* Efficient state handling using **Zustand**
* Modern UI/UX using **Tailwind + Framer Motion**
* Scalable and reusable component design
* Real-world dashboard patterns

---

> This approach ensures the application remains **maintainable, scalable, and production-ready**.


## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

---

### 📦 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

---

### 📥 2. Install Dependencies

Make sure you have **Node.js (v16 or higher)** installed.

```bash
npm install
```

or if you use yarn:

```bash
yarn install
```

---

### ▶️ 3. Start Development Server

```bash
npm run dev
```

or:

```bash
yarn dev
```

---

### 🌐 4. Open in Browser

Once the server starts, open:

```
http://localhost:5173
```

*(Port may vary depending on your setup)*

---

## 🏗 Build for Production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

## 🧪 Environment Notes

* No backend setup required (uses mock/local state)
* Data is managed via Zustand (in-memory or local storage if enabled)
* Works fully offline after dependencies are installed

---

## ⚠️ Common Issues

### ❌ Node version issues

Ensure Node.js version is compatible:

```bash
node -v
```

### ❌ Dependencies not installing

Try clearing cache:

```bash
npm cache clean --force
npm install
```

---

## 💡 Optional Enhancements Setup

If you plan to extend:

* Add `.env` for API integrations
* Enable local storage persistence in Zustand
* Connect to a backend (Express / Firebase / Supabase)

---

> You’re now ready to explore and build on top of the Finance Dashboard 🚀
