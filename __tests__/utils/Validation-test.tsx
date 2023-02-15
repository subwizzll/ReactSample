import {
  AmexCvvValidator,
  CardNumberValidator,
  CvvValidator,
  ExpirationValidator,
  NameValidator,
} from '../../utils/Validation';
import Constants from '../props/Constants';
import Localization from '../../resources/Localization';

const SCOPED_CONSTANTS = Constants.VALIDATION;
const SCOPED_STRINGS = Localization.VALIDATION;

describe('CardNumberValidator', () => {
  it('should return an error message when the input is empty', () => {
    expect(CardNumberValidator('')).toEqual(SCOPED_STRINGS.MustNotBeEmpty);
  });

  it('should return an error message when the card number is invalid', () => {
    const values = Object.values(SCOPED_CONSTANTS.CardNumberTestValues).flatMap(
      t => t.INVALID,
    );
    for (let i = 0; i < values.length; i++) {
      expect(CardNumberValidator(values[i])).toEqual(
        SCOPED_STRINGS.InvalidCardNumber,
      );
    }
  });

  it('should return an empty string when the input is valid', () => {
    const values = Object.values(SCOPED_CONSTANTS.CardNumberTestValues).flatMap(
      t => t.VALID,
    );
    for (let i = 0; i < values.length; i++) {
      expect(CardNumberValidator(values[i])).toEqual('');
    }
  });

  it('should return an error when given a 15 character Visa card number', () => {
    const result = CardNumberValidator('411111111111111');
    expect(result).toBe(
      `${SCOPED_STRINGS.InvalidMinLength} ${SCOPED_STRINGS.ValidVisaLength}`,
    );
  });

  it('should return an error when given a 12 character Visa card number', () => {
    const result = CardNumberValidator('411111111111');
    expect(result).toBe(
      `${SCOPED_STRINGS.InvalidMinLength} ${SCOPED_STRINGS.ValidVisaLength}`,
    );
  });

  it('should return an error when given an invalid Amex card number', () => {
    const result = CardNumberValidator('37828224631000');
    expect(result).toBe(
      `${SCOPED_STRINGS.InvalidMinLength} ${SCOPED_STRINGS.ValidAmexLength}`,
    );
  });

  it('should return an error when given an invalid MasterCard or Discover card number', () => {
    const result = CardNumberValidator('561059108101825');
    expect(result).toBe(
      `${SCOPED_STRINGS.InvalidMinLength} ${SCOPED_STRINGS.ValidMasterCardOrDiscoverLength}`,
    );
  });
});

describe('ExpirationValidator', () => {
  it('should return an error message when the input is empty', () => {
    expect(ExpirationValidator('')).toEqual(SCOPED_STRINGS.MustNotBeEmpty);
  });

  it('should return an error message when the input is not in MM/YY format', () => {
    expect(ExpirationValidator('AA$25')).toEqual(
      SCOPED_STRINGS.InvalidExpiration,
    );
  });

  it('should return an error message when the month is invalid', () => {
    expect(ExpirationValidator('00/99')).toEqual(
      SCOPED_STRINGS.InvalidExpiration,
    );
  });

  it('should return an error message when the year is valid', () => {
    expect(ExpirationValidator('01/15')).toEqual(SCOPED_STRINGS.CardExpired);
  });

  it('should return an empty string when the input is valid', () => {
    expect(ExpirationValidator('12/33')).toEqual('');
  });
});

describe('CvvValidator', () => {
  it('should return an error message when the input is empty', () => {
    expect(CvvValidator('')).toEqual(SCOPED_STRINGS.MustNotBeEmpty);
  });

  it('should return an error message when the input is not in the correct format', () => {
    expect(CvvValidator('1!sd@')).toEqual(SCOPED_STRINGS.InvalidCvv);
  });

  it('should return an empty string when the input is valid', () => {
    expect(CvvValidator('123')).toEqual('');
  });
});

describe('AmexCvvValidator', () => {
  it('should return an error message when the input is empty', () => {
    expect(AmexCvvValidator('')).toEqual(SCOPED_STRINGS.MustNotBeEmpty);
  });

  it('should return an error message when the input is not in the correct format', () => {
    expect(AmexCvvValidator('! a4')).toEqual('Invalid CVV');
  });

  it('should return an empty string when the input is valid', () => {
    expect(AmexCvvValidator('1235')).toEqual('');
  });
});

describe('NameValidator', () => {
  it('should return an error message when the input is empty', () => {
    expect(NameValidator('')).toEqual(SCOPED_STRINGS.MustNotBeEmpty);
  });

  it('should return an error message when the input is too long', () => {
    const longName = 'a'.repeat(256);
    expect(NameValidator(longName)).toEqual(SCOPED_STRINGS.InvalidMaxLength255);
  });

  it('should return an error when the input contains numbers', () => {
    expect(NameValidator('123')).toEqual(
      SCOPED_STRINGS.MustBeAlphabeticOrWhiteSpace,
    );
  });

  it('should return an error when the input begins with whitespace', () => {
    expect(NameValidator(' abc')).toEqual(
      SCOPED_STRINGS.MustBeAlphabeticOrWhiteSpace,
    );
  });

  it('should return an error when the input contains special characters', () => {
    expect(NameValidator('!$#$!')).toEqual(
      SCOPED_STRINGS.MustBeAlphabeticOrWhiteSpace,
    );
  });

  it('should return an empty string when the input is valid', () => {
    expect(NameValidator('John Doe')).toEqual('');
  });
});
