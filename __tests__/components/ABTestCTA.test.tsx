import { render, screen } from '@testing-library/react';
import { ABTestCTA } from '@/app/components/ABTestCTA';

describe('ABTestCTA Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render the default "A" variant initially', () => {
    render(<ABTestCTA />);
    // "Start Your First Report" is the text for Variant A
    expect(screen.getByText('Start Your First Report')).toBeInTheDocument();
  });

  it('should render subtext correctly', () => {
    render(<ABTestCTA />);
    expect(screen.getByText('No credit card required')).toBeInTheDocument();
  });
  
  // Note: Testing the randomness effectively in a unit test is tricky without mocking Math.random
  // We just verify it renders *something* valid.
});
