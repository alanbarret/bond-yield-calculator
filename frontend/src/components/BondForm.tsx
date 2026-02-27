import type { BondInput } from '../types/bond.types';

/**
 * Props for BondForm component
 */
interface BondFormProps {
  input: BondInput;
  onInputChange: <K extends keyof BondInput>(field: K, value: BondInput[K]) => void;
  onSubmit: () => void;
  onReset: () => void;
  isLoading: boolean;
}

/**
 * BondForm Component
 * 
 * Renders the input form for bond parameters.
 * Pure presentation component - all logic handled by parent via props.
 */
export function BondForm({
  input,
  onInputChange,
  onSubmit,
  onReset,
  isLoading,
}: BondFormProps) {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="bond-form">
      <h2>Bond Parameters</h2>
      
      {/* Face Value Input */}
      <div className="form-group">
        <label htmlFor="faceValue">
          Face Value ($)
          <span className="tooltip" title="The amount paid to the bondholder at maturity">ⓘ</span>
        </label>
        <input
          id="faceValue"
          type="number"
          min="0"
          step="100"
          value={input.faceValue}
          onChange={(e) => onInputChange('faceValue', Number(e.target.value))}
          required
        />
      </div>

      {/* Annual Coupon Rate Input */}
      <div className="form-group">
        <label htmlFor="annualCouponRate">
          Annual Coupon Rate (%)
          <span className="tooltip" title="Annual interest rate paid on face value">ⓘ</span>
        </label>
        <input
          id="annualCouponRate"
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={input.annualCouponRate}
          onChange={(e) => onInputChange('annualCouponRate', Number(e.target.value))}
          required
        />
      </div>

      {/* Market Price Input */}
      <div className="form-group">
        <label htmlFor="marketPrice">
          Market Price ($)
          <span className="tooltip" title="Current trading price of the bond">ⓘ</span>
        </label>
        <input
          id="marketPrice"
          type="number"
          min="0"
          step="1"
          value={input.marketPrice}
          onChange={(e) => onInputChange('marketPrice', Number(e.target.value))}
          required
        />
      </div>

      {/* Years to Maturity Input */}
      <div className="form-group">
        <label htmlFor="yearsToMaturity">
          Years to Maturity
          <span className="tooltip" title="Number of years until bond matures">ⓘ</span>
        </label>
        <input
          id="yearsToMaturity"
          type="number"
          min="1"
          max="100"
          step="1"
          value={input.yearsToMaturity}
          onChange={(e) => onInputChange('yearsToMaturity', Number(e.target.value))}
          required
        />
      </div>

      {/* Coupon Frequency Select */}
      <div className="form-group">
        <label htmlFor="couponFrequency">
          Coupon Frequency
          <span className="tooltip" title="How often interest payments are made">ⓘ</span>
        </label>
        <select
          id="couponFrequency"
          value={input.couponFrequency}
          onChange={(e) => onInputChange('couponFrequency', Number(e.target.value) as 1 | 2)}
        >
          <option value={1}>Annual (1x per year)</option>
          <option value={2}>Semi-Annual (2x per year)</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? 'Calculating...' : 'Calculate Yield'}
        </button>
        <button type="button" className="btn-secondary" onClick={onReset}>
          Reset
        </button>
      </div>
    </form>
  );
}
