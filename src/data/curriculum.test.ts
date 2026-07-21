/** Unit tests protect the one-curriculum progress calculation from regressions. */
import { describe, expect, it } from 'vitest';
import { calculateCurriculumProgress, curriculumModules } from './curriculum';

describe('calculateCurriculumProgress', () => {
  it('returns zero before any module is complete', () => {
    expect(calculateCurriculumProgress(0)).toBe(0);
  });

  it('returns one hundred after every module is complete', () => {
    expect(calculateCurriculumProgress(curriculumModules.length)).toBe(100);
  });

  it('keeps invalid values inside the zero to one hundred range', () => {
    expect(calculateCurriculumProgress(-4)).toBe(0);
    expect(calculateCurriculumProgress(50)).toBe(100);
  });
});
