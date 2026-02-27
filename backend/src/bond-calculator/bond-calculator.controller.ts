import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BondCalculatorService } from './bond-calculator.service';
import { CalculateBondDto } from './dto/calculate-bond.dto';
import { BondCalculationResult } from './interfaces/bond.interface';

/**
 * Bond Calculator Controller
 * 
 * Exposes the REST API endpoint for bond calculations.
 * Handles HTTP layer concerns: routing, status codes, request/response.
 * Delegates business logic entirely to the service.
 */
@Controller()
export class BondCalculatorController {
  constructor(private readonly bondCalculatorService: BondCalculatorService) {}

  /**
   * GET /
   * 
   * Health check and API info endpoint.
   */
  @Get()
  getInfo() {
    return {
      name: 'Bond Yield Calculator API',
      version: '1.0.0',
      endpoints: {
        'POST /calculate': 'Calculate bond yields and cash flow schedule',
      },
      example: {
        faceValue: 1000,
        annualCouponRate: 5,
        marketPrice: 950,
        yearsToMaturity: 10,
        couponFrequency: 2,
      },
    };
  }

  /**
   * POST /calculate
   * 
   * Main endpoint for bond yield calculations.
   * 
   * Request body example:
   * {
   *   "faceValue": 1000,
   *   "annualCouponRate": 5,
   *   "marketPrice": 950,
   *   "yearsToMaturity": 10,
   *   "couponFrequency": 2
   * }
   * 
   * @param dto - Validated bond parameters
   * @returns Complete calculation results including YTM, current yield, and cash flow schedule
   */
  @Post('calculate')
  @HttpCode(HttpStatus.OK)
  calculate(@Body() dto: CalculateBondDto): BondCalculationResult {
    return this.bondCalculatorService.calculateBond({
      faceValue: dto.faceValue,
      annualCouponRate: dto.annualCouponRate,
      marketPrice: dto.marketPrice,
      yearsToMaturity: dto.yearsToMaturity,
      couponFrequency: dto.couponFrequency,
    });
  }
}
