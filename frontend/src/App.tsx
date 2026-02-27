import { useBondCalculator } from './hooks/useBondCalculator';
import { BondForm } from './components/BondForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { CashFlowTable } from './components/CashFlowTable';
import './App.css';

/**
 * Bond Yield Calculator Application
 * 
 * Main application component that orchestrates the bond calculator UI.
 * Uses the useBondCalculator hook for all state management.
 */
function App() {
  const {
    input,
    updateInput,
    result,
    isLoading,
    error,
    calculate,
    reset,
  } = useBondCalculator();

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1>📈 Bond Yield Calculator</h1>
        <p className="subtitle">
          Calculate current yield, YTM, and generate cash flow schedules
        </p>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* Left Column: Input Form */}
        <section className="input-section">
          <BondForm
            input={input}
            onInputChange={updateInput}
            onSubmit={calculate}
            onReset={reset}
            isLoading={isLoading}
          />
        </section>

        {/* Right Column: Results */}
        <section className="results-section">
          {/* Error Display */}
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Calculating bond yields...</p>
            </div>
          )}

          {/* Results Display */}
          {result && !isLoading && (
            <>
              <ResultsDisplay result={result} />
              <CashFlowTable schedule={result.cashFlowSchedule} />
            </>
          )}

          {/* Empty State */}
          {!result && !isLoading && !error && (
            <div className="empty-state">
              <span className="empty-icon">📊</span>
              <h3>Enter Bond Details</h3>
              <p>Fill in the bond parameters and click "Calculate Yield" to see results.</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Built with React + NestJS | 
          <a href="https://en.wikipedia.org/wiki/Yield_to_maturity" target="_blank" rel="noopener noreferrer">
            Learn about YTM
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
