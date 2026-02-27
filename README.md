# Bond Yield Calculator

A full-stack web application for calculating bond yields, built with **React + TypeScript** (frontend) and **NestJS + TypeScript** (backend).

![Bond Calculator](https://img.shields.io/badge/React-18-blue) ![NestJS](https://img.shields.io/badge/NestJS-10-red) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## Features

- **Current Yield** calculation
- **Yield to Maturity (YTM)** using Newton-Raphson numerical method
- **Total Interest** earned over bond lifetime
- **Premium/Discount** indicator
- **Cash Flow Schedule** with detailed payment breakdown
- Support for **annual** and **semi-annual** coupon frequencies

---

## Financial Calculations Explained

### Current Yield

```
Current Yield = Annual Coupon Payment / Market Price
```

This is a simple yield measure that shows the return based solely on the coupon payments relative to what you paid for the bond. It ignores capital gains/losses at maturity.

**Example:** A bond with $50 annual coupon and $950 market price → Current Yield = 50/950 = 5.26%

### Yield to Maturity (YTM)

YTM is the **Internal Rate of Return (IRR)** of the bond investment. It's the discount rate that makes the present value of all future cash flows equal to the current market price.

```
Market Price = Σ(Coupon / (1 + YTM)^t) + Face Value / (1 + YTM)^n
```

Where:
- `Coupon` = coupon payment per period
- `YTM` = yield per period (what we solve for)
- `t` = period number (1, 2, 3, ...)
- `n` = total number of periods

**Why Newton-Raphson?**

YTM cannot be solved algebraically for bonds with multiple payments. We use the Newton-Raphson iterative method:

```
r_new = r_old - f(r) / f'(r)
```

Starting with current yield as an initial guess, the algorithm converges rapidly (typically <10 iterations).

### Premium vs Discount

- **Premium Bond:** Market Price > Face Value (YTM < Coupon Rate)
- **Discount Bond:** Market Price < Face Value (YTM > Coupon Rate)
- **Par Bond:** Market Price = Face Value (YTM = Coupon Rate)

### Coupon Frequency

- **Annual:** One payment per year → Period yield × 1 = Annual YTM
- **Semi-annual:** Two payments per year → Period yield × 2 = Annual YTM

---

## Project Structure

```
bond-yield-calculator/
├── backend/                    # NestJS Backend
│   ├── src/
│   │   ├── bond-calculator/    # Feature module
│   │   │   ├── dto/            # Data Transfer Objects (validation)
│   │   │   ├── interfaces/     # TypeScript interfaces
│   │   │   ├── bond-calculator.controller.ts
│   │   │   ├── bond-calculator.module.ts
│   │   │   └── bond-calculator.service.ts  # Business logic
│   │   ├── app.module.ts       # Root module
│   │   └── main.ts             # Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── api/                # API client
│   │   ├── components/         # React components
│   │   ├── hooks/              # Custom hooks
│   │   ├── types/              # TypeScript types
│   │   ├── App.tsx             # Main component
│   │   └── App.css             # Styles
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

## How to Run

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Backend (NestJS)

```bash
cd backend

# Install dependencies
npm install

# Start development server
npm run start:dev

# Or build and run production
npm run build
npm start
```

The API will be available at `http://localhost:3001`

### Frontend (React)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## API Reference

### POST /calculate

Calculate bond yields and generate cash flow schedule.

**Request Body:**

```json
{
  "faceValue": 1000,
  "annualCouponRate": 5,
  "marketPrice": 950,
  "yearsToMaturity": 10,
  "couponFrequency": 2
}
```

| Field | Type | Description |
|-------|------|-------------|
| faceValue | number | Par value of the bond |
| annualCouponRate | number | Annual coupon rate (%) |
| marketPrice | number | Current market price |
| yearsToMaturity | number | Years until maturity |
| couponFrequency | 1 \| 2 | 1 = annual, 2 = semi-annual |

**Response:**

```json
{
  "currentYield": 0.0526,
  "yieldToMaturity": 0.0585,
  "totalInterestEarned": 500,
  "premiumDiscount": "discount",
  "premiumDiscountAmount": 50,
  "cashFlowSchedule": [
    {
      "period": 1,
      "paymentDate": "2025-08-27",
      "couponPayment": 25,
      "cumulativeInterest": 25,
      "remainingPrincipal": 1000
    }
    // ... more periods
  ]
}
```

---

## Key Design Decisions

### Backend

1. **Modular Architecture:** `BondCalculatorModule` encapsulates all related functionality
2. **Service Layer:** Business logic isolated in `BondCalculatorService` for testability
3. **DTO Validation:** `class-validator` ensures input constraints at the API boundary
4. **Clean Interfaces:** TypeScript interfaces document the shape of all data

### Frontend

1. **Custom Hook Pattern:** `useBondCalculator` manages all state, keeping components pure
2. **Type Safety:** Shared types mirror backend interfaces for end-to-end type checking
3. **Component Composition:** Small, focused components (Form, Results, Table)
4. **CSS Variables:** Themeable, maintainable styles without external dependencies

### Algorithm Choice

Newton-Raphson was chosen over binary search because:
- Faster convergence (quadratic vs linear)
- More elegant implementation
- Standard in financial software

---

## Interview Notes

This codebase is designed to be **interview-ready**:

- **Heavily commented:** Every function explains the financial logic
- **Small functions:** Easy to trace and modify live
- **No magic numbers:** Constants are named and documented
- **Separation of concerns:** Controller → Service → Utils pattern
- **Type safety:** TypeScript catches errors at compile time

**Common interview extensions:**
- Add bond duration/convexity calculations
- Support callable/puttable bonds
- Add charting with D3/Chart.js
- Implement proper error boundaries

---

## License

MIT
