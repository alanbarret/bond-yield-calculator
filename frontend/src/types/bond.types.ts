/**
 * TypeScript types for Bond Calculator
 * 
 * Mirrors backend interfaces for type-safe API communication.
 */

/**
 * Input parameters for bond calculation
 */
export interface BondInput {
  faceValue: number;
  annualCouponRate: number;
  marketPrice: number;
  yearsToMaturity: number;
  couponFrequency: 1 | 2;
}

/**
 * Single entry in the cash flow schedule
 */
export interface CashFlowEntry {
  period: number;
  paymentDate: string;
  couponPayment: number;
  cumulativeInterest: number;
  remainingPrincipal: number;
}

/**
 * Complete API response from /calculate endpoint
 */
export interface BondCalculationResult {
  currentYield: number;
  yieldToMaturity: number;
  totalInterestEarned: number;
  premiumDiscount: 'premium' | 'discount' | 'par';
  premiumDiscountAmount: number;
  cashFlowSchedule: CashFlowEntry[];
}
