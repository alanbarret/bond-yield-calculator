import type { BondInput, BondCalculationResult } from '../types/bond.types';

/**
 * API Client for Bond Calculator Backend
 * 
 * Centralized API calls with proper typing.
 * Easy to modify base URL or add auth headers.
 */

// Use environment variable for production, fallback to localhost for dev
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Calculate bond yields and cash flow schedule
 * 
 * @param input - Bond parameters from the form
 * @returns Promise with calculation results
 * @throws Error if API call fails
 */
export async function calculateBond(input: BondInput): Promise<BondCalculationResult> {
  const response = await fetch(`${API_BASE_URL}/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `API Error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
