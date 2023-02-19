import {TextInputProps} from 'react-native/Libraries/Components/TextInput/TextInput';
import {isNullOrWhiteSpace} from './stringMethods';
import {Strings} from '../resources/strings';
import {dateIsPast} from './dateTime';

const SCOPED_STRINGS = Strings.UTILS.VALIDATION;

const expirationPattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
const cvvPattern = /[0-9]{3}/;
const amexCvvPattern = /[0-9]{4}/;
const alphabeticInputPattern = /^[a-zA-Z][a-zA-Z ]+$/;

export const defaultCardInputProps: TextInputProps = {
  maxLength: 19,
  inputMode: 'numeric',
};
export const amexCardInputProps: TextInputProps = {
  maxLength: 18,
  inputMode: 'numeric',
};
export const defaultCvvInputProps: TextInputProps = {
  maxLength: 3,
  inputMode: 'numeric',
  secureTextEntry: true,
};
export const amexCvvInputProps: TextInputProps = {
  maxLength: 4,
  inputMode: 'numeric',
  secureTextEntry: true,
};
export const expirationInputProps: TextInputProps = {
  maxLength: 5,
  inputMode: 'numeric',
};
export const nameInputProps: TextInputProps = {maxLength: 255};
function luhnCheck(cardNumbers: string) {
  if (!cardNumbers) {
    return false;
  }
  const parity = cardNumbers.length % 2;
  let sum = 0;

  for (let i = 0; i < cardNumbers.length; i++) {
    let cardNumber = parseInt(cardNumbers[i], 10);
    if (i % 2 !== parity) {
      sum += cardNumber;
    } else if (cardNumber > 4) {
      sum += cardNumber * 2 - 9;
    } else {
      sum += cardNumber * 2;
    }
  }

  return sum % 10 === 0;
}

export const cardNumberValidator = (text: string) => {
  if (isNullOrWhiteSpace(text)) {
    return SCOPED_STRINGS.mustNotBeEmpty;
  }

  text = text?.replace(/\D/g, '');
  switch (text?.charAt(0)) {
    // Visa
    case '4':
      if (!(text.length === 16 || text.length === 13) && !luhnCheck(text)) {
        return `${SCOPED_STRINGS.invalidMinLength} ${SCOPED_STRINGS.validVisaLength}`;
      }
      break;
    // Amex
    case '3':
      if (text.length < 15 && !luhnCheck(text)) {
        return `${SCOPED_STRINGS.invalidMinLength} ${SCOPED_STRINGS.validAmexLength}`;
      }
      break;
    // MasterCard
    case '5':
    // Discover
    // eslint-disable-next-line no-fallthrough
    case '6':
      if (text.length < 16 && !luhnCheck(text)) {
        return `${SCOPED_STRINGS.invalidMinLength} ${SCOPED_STRINGS.validMasterCardOrDiscoverLength}`;
      }
      break;
    default:
      break;
  }

  if (!isNullOrWhiteSpace(text) && !luhnCheck(text)) {
    return SCOPED_STRINGS.invalidCardNumber;
  }
  return '';
};

export const expirationValidator = (text: string) => {
  if (isNullOrWhiteSpace(text)) {
    return SCOPED_STRINGS.mustNotBeEmpty;
  } else if (text?.length < 5 || !text?.match(expirationPattern)) {
    return SCOPED_STRINGS.invalidExpiration;
  } else if (dateIsPast(text)) {
    return SCOPED_STRINGS.cardExpired;
  }
  return '';
};

export const cvvValidator = (text: string) => {
  if (isNullOrWhiteSpace(text)) {
    return SCOPED_STRINGS.mustNotBeEmpty;
  } else if (!text?.match(cvvPattern)) {
    return SCOPED_STRINGS.invalidCvv;
  }
  return '';
};

export const amexCvvValidator = (text: string) => {
  if (isNullOrWhiteSpace(text)) {
    return SCOPED_STRINGS.mustNotBeEmpty;
  } else if (!text?.match(amexCvvPattern)) {
    return SCOPED_STRINGS.invalidCvv;
  }
  return '';
};

export const nameValidator = (text: string) => {
  if (isNullOrWhiteSpace(text)) {
    return SCOPED_STRINGS.mustNotBeEmpty;
  } else if (text?.length >= 256) {
    return SCOPED_STRINGS.invalidMaxLength255;
  } else if (!text?.match(alphabeticInputPattern)) {
    return SCOPED_STRINGS.mustBeAlphabeticOrWhiteSpace;
  }
  return '';
};
