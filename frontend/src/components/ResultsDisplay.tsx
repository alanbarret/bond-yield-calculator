import type { BondCalculationResult } from '../types/bond.types';

interface ResultsDisplayProps {
  result: BondCalculationResult;
}

/**
 * ResultsDisplay Component
 * 
 * Shows calculated bond metrics in a clear, organized layout.
 * Formats numbers appropriately for financial display.
 */
export function ResultsDisplay({ result }: ResultsDisplayProps) {
  /**
   * Format a decimal as a percentage string
   * e.g., 0.0523 → "5.23%"
   */
  const formatPercent = (value: number): string => {
    return `${(value * 100).toFixed(2)}%`;
  };

  /**
   * Format a number as currency
   * e.g., 1234.56 → "$1,234.56"
   */
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  /**
   * Get appropriate styling for premium/discount indicator
   */
  const getPremiumDiscountClass = (): string => {
    switch (result.premiumDiscount) {
      case 'premium':
        return 'status-premium';
      case 'discount':
        return 'status-discount';
      default:
        return 'status-par';
    }
  };

  return (
    <div className="results-display">
      <h2>Calculation Results</h2>
      
      <div className="metrics-grid">
        {/* Current Yield Card */}
        <div className="metric-card">
          <h3>Current Yield</h3>
          <p className="metric-value">{formatPercent(result.currentYield)}</p>
          <p className="metric-description">
            Annual coupon divided by market price
          </p>
        </div>

        {/* Yield to Maturity Card */}
        <div className="metric-card highlight">
          <h3>Yield to Maturity (YTM)</h3>
          <p className="metric-value">{formatPercent(result.yieldToMaturity)}</p>
          <p className="metric-description">
            Total return if held until maturity
          </p>
        </div>

        {/* Total Interest Card */}
        <div className="metric-card">
          <h3>Total Interest Earned</h3>
          <p className="metric-value">{formatCurrency(result.totalInterestEarned)}</p>
          <p className="metric-description">
            Sum of all coupon payments over bond lifetime
          </p>
        </div>

        {/* Premium/Discount Card */}
        <div className={`metric-card ${getPremiumDiscountClass()}`}>
          <h3>Bond Status</h3>
          <p className="metric-value status-badge">
            {result.premiumDiscount.toUpperCase()}
          </p>
          {result.premiumDiscountAmount > 0 && (
            <p className="metric-description">
              {result.premiumDiscount === 'premium' ? '+' : '-'}
              {formatCurrency(result.premiumDiscountAmount)} from face value
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
