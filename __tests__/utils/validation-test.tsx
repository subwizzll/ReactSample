import {
  amexCvvValidator,
  cardNumberValidator,
  cvvValidator,
  expirationValidator,
  nameValidator,
} from '../../utils/validation';
import {Constants} from '../props/constants';
import {Strings} from '../../resources/strings';

const SCOPED_CONSTANTS = Constants.VALIDATION;
const SCOPED_STRINGS = Strings.UTILS.VALIDATION;

describe('CardNumberValidator', () => {
  it('should return an error message when the input is empty', () => {
    expect(cardNumberValidator('')).toEqual(SCOPED_STRINGS.mustNotBeEmpty);
  });

  it('should return an error message when the card number is invalid', () => {
    const values = Object.values(SCOPED_CONSTANTS.CardNumberTestValues).flatMap(
      t => t.INVALID,
    );
    for (let i = 0; i < values.length; i++) {
      expect(cardNumberValidator(values[i])).toEqual(
        SCOPED_STRINGS.invalidCardNumber,
      );
    }
  });

  it('should return an empty string when the input is valid', () => {
    const values = Object.values(SCOPED_CONSTANTS.CardNumberTestValues).flatMap(
      t => t.VALID,
    );
    for (let i = 0; i < values.length; i++) {
      expect(cardNumberValidator(values[i])).toEqual('');
    }
  });

  it('should return an error when given a 15 character Visa card number', () => {
    const result = cardNumberValidator('411111111111111');
    expect(result).toBe(
      `${SCOPED_STRINGS.invalidMinLength} ${SCOPED_STRINGS.validVisaLength}`,
    );
  });

  it('should return an error when given a 12 character Visa card number', () => {
    const result = cardNumberValidator('411111111111');
    expect(result).toBe(
      `${SCOPED_STRINGS.invalidMinLength} ${SCOPED_STRINGS.validVisaLength}`,
    );
  });

  it('should return an error when given an invalid Amex card number', () => {
    const result = cardNumberValidator('37828224631000');
    expect(result).toBe(
      `${SCOPED_STRINGS.invalidMinLength} ${SCOPED_STRINGS.validAmexLength}`,
    );
  });

  it('should return an error when given an invalid MasterCard or Discover card number', () => {
    const result = cardNumberValidator('561059108101825');
    expect(result).toBe(
      `${SCOPED_STRINGS.invalidMinLength} ${SCOPED_STRINGS.validMasterCardOrDiscoverLength}`,
    );
  });
});

describe('ExpirationValidator', () => {
  it('should return an error message when the input is empty', () => {
    expect(expirationValidator('')).toEqual(SCOPED_STRINGS.mustNotBeEmpty);
  });

  it('should return an error message when the input is not in MM/YY format', () => {
    expect(expirationValidator('AA$25')).toEqual(
      SCOPED_STRINGS.invalidExpiration,
    );
  });

  it('should return an error message when the month is invalid', () => {
    expect(expirationValidator('00/99')).toEqual(
      SCOPED_STRINGS.invalidExpiration,
    );
  });

  it('should return an error message when the year is valid', () => {
    expect(expirationValidator('01/15')).toEqual(SCOPED_STRINGS.cardExpired);
  });

  it('should return an empty string when the input is valid', () => {
    expect(expirationValidator('12/33')).toEqual('');
  });
});

describe('CvvValidator', () => {
  it('should return an error message when the input is empty', () => {
    expect(cvvValidator('')).toEqual(SCOPED_STRINGS.mustNotBeEmpty);
  });

  it('should return an error message when the input is not in the correct format', () => {
    expect(cvvValidator('1!sd@')).toEqual(SCOPED_STRINGS.invalidCvv);
  });

  it('should return an empty string when the input is valid', () => {
    expect(cvvValidator('123')).toEqual('');
  });
});

describe('AmexCvvValidator', () => {
  it('should return an error message when the input is empty', () => {
    expect(amexCvvValidator('')).toEqual(SCOPED_STRINGS.mustNotBeEmpty);
  });

  it('should return an error message when the input is not in the correct format', () => {
    expect(amexCvvValidator('! a4')).toEqual('Invalid CVV');
  });

  it('should return an empty string when the input is valid', () => {
    expect(amexCvvValidator('1235')).toEqual('');
  });
});

describe('NameValidator', () => {
  it('should return an error message when the input is empty', () => {
    expect(nameValidator('')).toEqual(SCOPED_STRINGS.mustNotBeEmpty);
  });

  it('should return an error message when the input is too long', () => {
    const longName = 'a'.repeat(256);
    expect(nameValidator(longName)).toEqual(SCOPED_STRINGS.invalidMaxLength255);
  });

  it('should return an error when the input contains numbers', () => {
    expect(nameValidator('123')).toEqual(
      SCOPED_STRINGS.mustBeAlphabeticOrWhiteSpace,
    );
  });

  it('should return an error when the input begins with whitespace', () => {
    expect(nameValidator(' abc')).toEqual(
      SCOPED_STRINGS.mustBeAlphabeticOrWhiteSpace,
    );
  });

  it('should return an error when the input contains special characters', () => {
    expect(nameValidator('!$#$!')).toEqual(
      SCOPED_STRINGS.mustBeAlphabeticOrWhiteSpace,
    );
  });

  it('should return an empty string when the input is valid', () => {
    expect(nameValidator('John Doe')).toEqual('');
  });
});
