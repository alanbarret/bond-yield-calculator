import { IsNumber, IsPositive, IsIn, Min, Max } from 'class-validator';

/**
 * Data Transfer Object for bond calculation requests
 * 
 * Uses class-validator decorators for automatic validation.
 * NestJS will reject requests that don't meet these constraints.
 */
export class CalculateBondDto {
  @IsNumber({}, { message: 'Face value must be a number' })
  @IsPositive({ message: 'Face value must be positive' })
  faceValue: number;

  @IsNumber({}, { message: 'Coupon rate must be a number' })
  @Min(0, { message: 'Coupon rate cannot be negative' })
  @Max(100, { message: 'Coupon rate cannot exceed 100%' })
  annualCouponRate: number;

  @IsNumber({}, { message: 'Market price must be a number' })
  @IsPositive({ message: 'Market price must be positive' })
  marketPrice: number;

  @IsNumber({}, { message: 'Years to maturity must be a number' })
  @IsPositive({ message: 'Years to maturity must be positive' })
  @Max(100, { message: 'Years to maturity cannot exceed 100' })
  yearsToMaturity: number;

  @IsIn([1, 2], { message: 'Coupon frequency must be 1 (annual) or 2 (semi-annual)' })
  couponFrequency: 1 | 2;
}
