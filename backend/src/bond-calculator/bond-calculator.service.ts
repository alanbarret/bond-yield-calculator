import { Injectable } from '@nestjs/common';
import { BondInput, BondCalculationResult, CashFlowEntry } from './interfaces/bond.interface';

/**
 * Bond Calculator Service
 * 
 * Contains all financial calculation logic for bond yield analysis.
 * Designed to be easily testable and modifiable during interviews.
 * 
 * Key Concepts:
 * - Current Yield: Simple ratio of annual coupon to market price
 * - YTM: Internal rate of return considering all cash flows
 * - Cash Flow Schedule: Timeline of all coupon payments
 */
@Injectable()
export class BondCalculatorService {
  
  /**
   * Main calculation method - orchestrates all bond metrics
   */
  calculateBond(input: BondInput): BondCalculationResult {
    const currentYield = this.calculateCurrentYield(input);
    const yieldToMaturity = this.calculateYTM(input);
    const totalInterestEarned = this.calculateTotalInterest(input);
    const { status, amount } = this.calculatePremiumDiscount(input);
    const cashFlowSchedule = this.generateCashFlowSchedule(input);

    return {
      currentYield,
      yieldToMaturity,
      totalInterestEarned,
      premiumDiscount: status,
      premiumDiscountAmount: amount,
      cashFlowSchedule,
    };
  }

  /**
   * Current Yield Calculation
   * 
   * Formula: Current Yield = Annual Coupon Payment / Market Price
   * 
   * This is a simple yield measure that ignores:
   * - Time value of money
   * - Capital gains/losses at maturity
   * - Reinvestment of coupons
   * 
   * @returns Current yield as a decimal (e.g., 0.05 for 5%)
   */
  calculateCurrentYield(input: BondInput): number {
    const annualCoupon = input.faceValue * (input.annualCouponRate / 100);
    return annualCoupon / input.marketPrice;
  }

  /**
   * Yield to Maturity (YTM) Calculation using Newton-Raphson Method
   * 
   * YTM is the discount rate that makes the present value of all future
   * cash flows equal to the current market price. It's essentially the
   * Internal Rate of Return (IRR) of the bond investment.
   * 
   * Bond Price = Σ(C / (1+r)^t) + FV / (1+r)^n
   * 
   * Where:
   * - C = coupon payment per period
   * - r = yield per period (what we're solving for)
   * - t = period number
   * - FV = face value
   * - n = total number of periods
   * 
   * Newton-Raphson iteratively improves the guess:
   * r_new = r_old - f(r) / f'(r)
   * 
   * @returns Annual YTM as a decimal
   */
  calculateYTM(input: BondInput): number {
    const { faceValue, annualCouponRate, marketPrice, yearsToMaturity, couponFrequency } = input;
    
    // Number of payment periods
    const totalPeriods = yearsToMaturity * couponFrequency;
    
    // Coupon payment per period
    const couponPerPeriod = (faceValue * (annualCouponRate / 100)) / couponFrequency;
    
    // Initial guess: use current yield as starting point
    let ytmGuess = this.calculateCurrentYield(input) / couponFrequency;
    
    const maxIterations = 100;
    const tolerance = 1e-10;

    for (let i = 0; i < maxIterations; i++) {
      // Calculate bond price at current guess
      const { price, derivative } = this.calculatePriceAndDerivative(
        ytmGuess,
        couponPerPeriod,
        faceValue,
        totalPeriods
      );

      // f(r) = calculated price - market price (we want this to be 0)
      const priceDiff = price - marketPrice;

      // Check for convergence
      if (Math.abs(priceDiff) < tolerance) {
        break;
      }

      // Newton-Raphson update: r_new = r_old - f(r) / f'(r)
      // derivative is negative (price decreases as yield increases)
      ytmGuess = ytmGuess - priceDiff / derivative;

      // Ensure yield stays positive
      if (ytmGuess < 0) {
        ytmGuess = 0.0001;
      }
    }

    // Convert period yield to annual yield
    return ytmGuess * couponFrequency;
  }

  /**
   * Helper: Calculate bond price and its derivative for Newton-Raphson
   * 
   * Price formula: P = Σ(C / (1+r)^t) + FV / (1+r)^n
   * 
   * Derivative (dP/dr): -Σ(t * C / (1+r)^(t+1)) - n * FV / (1+r)^(n+1)
   */
  private calculatePriceAndDerivative(
    yield_: number,
    couponPerPeriod: number,
    faceValue: number,
    totalPeriods: number
  ): { price: number; derivative: number } {
    let price = 0;
    let derivative = 0;

    // Sum of present value of all coupon payments
    for (let t = 1; t <= totalPeriods; t++) {
      const discountFactor = Math.pow(1 + yield_, t);
      price += couponPerPeriod / discountFactor;
      derivative -= (t * couponPerPeriod) / (discountFactor * (1 + yield_));
    }

    // Add present value of face value at maturity
    const finalDiscountFactor = Math.pow(1 + yield_, totalPeriods);
    price += faceValue / finalDiscountFactor;
    derivative -= (totalPeriods * faceValue) / (finalDiscountFactor * (1 + yield_));

    return { price, derivative };
  }

  /**
   * Total Interest Earned
   * 
   * Simple calculation: Annual Coupon × Years to Maturity
   * This represents total cash received from coupon payments.
   */
  calculateTotalInterest(input: BondInput): number {
    const annualCoupon = input.faceValue * (input.annualCouponRate / 100);
    return annualCoupon * input.yearsToMaturity;
  }

  /**
   * Premium/Discount Indicator
   * 
   * - Premium: Market Price > Face Value (investors pay extra)
   *   Typically occurs when coupon rate > prevailing market rates
   * 
   * - Discount: Market Price < Face Value (investors get a deal)
   *   Typically occurs when coupon rate < prevailing market rates
   * 
   * - Par: Market Price = Face Value (rare in practice)
   */
  calculatePremiumDiscount(input: BondInput): { 
    status: 'premium' | 'discount' | 'par'; 
    amount: number 
  } {
    const difference = input.marketPrice - input.faceValue;
    const tolerance = 0.01; // Allow tiny differences for "par"

    if (Math.abs(difference) < tolerance) {
      return { status: 'par', amount: 0 };
    } else if (difference > 0) {
      return { status: 'premium', amount: difference };
    } else {
      return { status: 'discount', amount: Math.abs(difference) };
    }
  }

  /**
   * Generate Cash Flow Schedule
   * 
   * Creates a detailed timeline of all coupon payments with:
   * - Period numbers
   * - Payment dates (calculated from today)
   * - Coupon amounts
   * - Running totals
   * - Remaining principal (stays constant until maturity for standard bonds)
   */
  generateCashFlowSchedule(input: BondInput): CashFlowEntry[] {
    const { faceValue, annualCouponRate, yearsToMaturity, couponFrequency } = input;
    
    const totalPeriods = yearsToMaturity * couponFrequency;
    const couponPerPeriod = (faceValue * (annualCouponRate / 100)) / couponFrequency;
    const monthsPerPeriod = 12 / couponFrequency;
    
    const schedule: CashFlowEntry[] = [];
    let cumulativeInterest = 0;
    const today = new Date();

    for (let period = 1; period <= totalPeriods; period++) {
      cumulativeInterest += couponPerPeriod;
      
      // Calculate payment date
      const paymentDate = new Date(today);
      paymentDate.setMonth(today.getMonth() + period * monthsPerPeriod);
      
      schedule.push({
        period,
        paymentDate: paymentDate.toISOString().split('T')[0],
        couponPayment: Math.round(couponPerPeriod * 100) / 100,
        cumulativeInterest: Math.round(cumulativeInterest * 100) / 100,
        // Principal remains full until maturity (standard bullet bond)
        remainingPrincipal: period === totalPeriods ? 0 : faceValue,
      });
    }

    return schedule;
  }
}
