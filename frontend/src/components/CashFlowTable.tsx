import type { CashFlowEntry } from '../types/bond.types';

interface CashFlowTableProps {
  schedule: CashFlowEntry[];
}

/**
 * CashFlowTable Component
 * 
 * Displays the complete cash flow schedule in a tabular format.
 * Shows each payment period with running totals.
 */
export function CashFlowTable({ schedule }: CashFlowTableProps) {
  /**
   * Format number as currency for display
   */
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  /**
   * Format date string for display
   * Converts ISO date to more readable format
   */
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="cash-flow-table-container">
      <h2>Cash Flow Schedule</h2>
      <p className="table-description">
        Detailed breakdown of all coupon payments over the bond's lifetime
      </p>
      
      <div className="table-wrapper">
        <table className="cash-flow-table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Payment Date</th>
              <th>Coupon Payment</th>
              <th>Cumulative Interest</th>
              <th>Remaining Principal</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((entry) => (
              <tr 
                key={entry.period}
                className={entry.remainingPrincipal === 0 ? 'maturity-row' : ''}
              >
                <td>{entry.period}</td>
                <td>{formatDate(entry.paymentDate)}</td>
                <td>{formatCurrency(entry.couponPayment)}</td>
                <td>{formatCurrency(entry.cumulativeInterest)}</td>
                <td>
                  {entry.remainingPrincipal === 0 
                    ? <span className="maturity-badge">Maturity</span>
                    : formatCurrency(entry.remainingPrincipal)
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Summary row */}
      <div className="table-summary">
        <p>
          <strong>Total Periods:</strong> {schedule.length} | 
          <strong> Total Interest:</strong> {formatCurrency(schedule[schedule.length - 1]?.cumulativeInterest || 0)}
        </p>
      </div>
    </div>
  );
}
