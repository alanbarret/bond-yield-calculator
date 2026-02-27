## Project Requirements
Build a **Bond Yield Calculator** web application using:
- **Frontend:** React + TypeScript  
- **Backend:** NestJS + TypeScript  
- Clean, modular, interview-ready code structure.

---

## Features & Logic

### Inputs
- Face value (number)
- Annual coupon rate (%)
- Market price
- Years to maturity
- Coupon frequency (annual / semi-annual)

### Outputs
- Current Yield
- Yield to Maturity (YTM)
- Total interest earned over bond lifetime
- Premium / Discount indicator (based on market price vs face value)

### Cash Flow Schedule
Generate and display a table with:
- Period number
- Payment date
- Coupon payment
- Cumulative interest
- Remaining principal

---

## Financial Calculations
- Current Yield = Annual Coupon / Market Price
- YTM calculated using numerical methods (Newton–Raphson or binary search)
- Support both annual and semi-annual coupon compounding
- Correctly compute coupon payments per period

---

## Backend (NestJS)
- Create a `BondCalculatorModule`
- Expose a REST endpoint `/calculate`
- Validate inputs using DTOs
- Business logic must be isolated in a service
- Return calculated metrics + cash flow schedule

---

## Frontend (React)
- Clean UI with a form for inputs
- Display calculated metrics clearly
- Render cash flow schedule in a table
- Use hooks and functional components only
- Type-safe API calls

---

## Code Quality
- Use meaningful variable names
- Add comments explaining financial logic
- Keep functions small and testable
- Make the code easy to modify live during an interview

---

## Deliverables
- Working frontend + backend
- Clear folder structure
- README explaining:
  - How calculations work
  - How to run frontend and backend
  - Key design decisions

