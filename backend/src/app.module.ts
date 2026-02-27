import { Module } from '@nestjs/common';
import { BondCalculatorModule } from './bond-calculator/bond-calculator.module';

/**
 * Root Application Module
 * 
 * Simple module that imports all feature modules.
 * Easy to extend with additional features (e.g., database, auth).
 */
@Module({
  imports: [BondCalculatorModule],
})
export class AppModule {}
