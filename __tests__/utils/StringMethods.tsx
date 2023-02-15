import {isNullOrWhiteSpace} from '../../utils/StringMethods';

describe('isNullOrWhiteSpace', () => {
  it('should return true when given null', () => {
    const result = isNullOrWhiteSpace(null);
    expect(result).toBe(true);
  });

  it('should return true when given a string containing only whitespace', () => {
    const result = isNullOrWhiteSpace('   ');
    expect(result).toBe(true);
  });

  it('should return false when given a string with non-whitespace characters', () => {
    const result = isNullOrWhiteSpace('test');
    expect(result).toBe(false);
  });

  it('should return true when given an empty string', () => {
    const result = isNullOrWhiteSpace('');
    expect(result).toBe(true);
  });

  it('should return false when given a string containing both whitespace and non-whitespace characters', () => {
    const result = isNullOrWhiteSpace('  test  ');
    expect(result).toBe(false);
  });
});
