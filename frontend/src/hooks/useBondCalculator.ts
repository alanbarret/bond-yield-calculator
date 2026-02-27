import { useState, useCallback } from 'react';
import type { BondInput, BondCalculationResult } from '../types/bond.types';
import { calculateBond } from '../api/bondApi';

/**
 * Default values for the bond calculator form
 * These represent a typical corporate bond scenario
 */
const defaultInput: BondInput = {
  faceValue: 1000,
  annualCouponRate: 5,
  marketPrice: 950,
  yearsToMaturity: 10,
  couponFrequency: 2,
};

/**
 * Custom Hook: useBondCalculator
 * 
 * Manages all state and logic for the bond calculator.
 * Separates business logic from UI components.
 * 
 * Benefits:
 * - Reusable across different UI implementations
 * - Easy to test in isolation
 * - Clean separation of concerns
 */
export function useBondCalculator() {
  // Form input state
  const [input, setInput] = useState<BondInput>(defaultInput);
  
  // Calculation results
  const [result, setResult] = useState<BondCalculationResult | null>(null);
  
  // Loading state for async operation
  const [isLoading, setIsLoading] = useState(false);
  
  // Error state for user feedback
  const [error, setError] = useState<string | null>(null);

  /**
   * Update a single input field
   * Uses TypeScript generics for type safety
   */
  const updateInput = useCallback(<K extends keyof BondInput>(
    field: K,
    value: BondInput[K]
  ) => {
    setInput(prev => ({ ...prev, [field]: value }));
    // Clear previous error when user modifies input
    setError(null);
  }, []);

  /**
   * Submit calculation request to backend
   */
  const calculate = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const calculationResult = await calculateBond(input);
      setResult(calculationResult);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Calculation failed';
      setError(message);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  /**
   * Reset form to default values
   */
  const reset = useCallback(() => {
    setInput(defaultInput);
    setResult(null);
    setError(null);
  }, []);

  return {
    input,
    updateInput,
    result,
    isLoading,
    error,
    calculate,
    reset,
  };
}
