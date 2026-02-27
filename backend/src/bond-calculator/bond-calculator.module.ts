import { Module } from '@nestjs/common';
import { BondCalculatorController } from './bond-calculator.controller';
import { BondCalculatorService } from './bond-calculator.service';

/**
 * Bond Calculator Module
 * 
 * Encapsulates all bond calculation functionality.
 * Following NestJS modular architecture for clean separation of concerns.
 */
@Module({
  controllers: [BondCalculatorController],
  providers: [BondCalculatorService],
  exports: [BondCalculatorService], // Export service if needed by other modules
})
export class BondCalculatorModule {}
