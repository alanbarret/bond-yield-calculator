/**
 * Bond Calculator Interfaces
 * 
 * These interfaces define the shape of data used throughout the bond calculation system.
 * Designed for clarity during technical interviews - each field is documented.
 */

/**
 * Input parameters for bond yield calculations
 */
export interface BondInput {
  /** Face value (par value) of the bond - the amount paid at maturity */
  faceValue: number;
  
  /** Annual coupon rate as a decimal (e.g., 0.05 for 5%) */
  annualCouponRate: number;
  
  /** Current market price of the bond */
  marketPrice: number;
  
  /** Number of years until the bond matures */
  yearsToMaturity: number;
  
  /** How often coupons are paid: 1 = annual, 2 = semi-annual */
  couponFrequency: 1 | 2;
}

/**
 * Single row in the cash flow schedule
 */
export interface CashFlowEntry {
  /** Period number (1, 2, 3, etc.) */
  period: number;
  
  /** Date when this payment occurs */
  paymentDate: string;
  
  /** Coupon payment amount for this period */
  couponPayment: number;
  
  /** Running total of all interest received up to this point */
  cumulativeInterest: number;
  
  /** Principal remaining (for bonds, this stays at face value until maturity) */
  remainingPrincipal: number;
}

/**
 * Complete calculation results returned by the API
 */
export interface BondCalculationResult {
  /** Current Yield = Annual Coupon / Market Price (as decimal) */
  currentYield: number;
  
  /** Yield to Maturity - the IRR of all cash flows (as decimal) */
  yieldToMaturity: number;
  
  /** Total interest earned over the bond's lifetime */
  totalInterestEarned: number;
  
  /** Whether bond trades at premium, discount, or par */
  premiumDiscount: 'premium' | 'discount' | 'par';
  
  /** Premium/discount amount in currency units */
  premiumDiscountAmount: number;
  
  /** Complete schedule of all coupon payments */
  cashFlowSchedule: CashFlowEntry[];
}
