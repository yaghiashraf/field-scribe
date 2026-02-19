import { cn } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('cn (ClassNames)', () => {
    it('should merge class names correctly', () => {
      const result = cn('text-red-500', 'bg-blue-500');
      expect(result).toBe('text-red-500 bg-blue-500');
    });

    it('should handle conditional classes', () => {
      const result = cn('text-red-500', false && 'bg-blue-500', 'p-4');
      expect(result).toBe('text-red-500 p-4');
    });

    it('should resolve tailwind conflicts (tailwind-merge)', () => {
      // p-4 is padding: 1rem, p-2 is padding: 0.5rem. The last one should win.
      const result = cn('p-4', 'p-2');
      expect(result).toBe('p-2');
    });
  });
});
