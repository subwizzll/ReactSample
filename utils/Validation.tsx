import {TextInputProps} from 'react-native/Libraries/Components/TextInput/TextInput';
import {isNullOrWhiteSpace} from './StringMethods';
import Localization from '../resources/Localization';

const SCOPED_STRINGS = Localization.VALIDATION;

const expirationPattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
const cvvPattern = /[0-9]{3}/;
const amexCvvPattern = /[0-9]{4}/;
const alphabeticInputPattern = /^[a-zA-Z][a-zA-Z ]+$/;

export const DefaultCardInputProps: TextInputProps = {
  maxLength: 19,
  inputMode: 'numeric',
};
export const AmexCardInputProps: TextInputProps = {
  maxLength: 18,
  inputMode: 'numeric',
};
export const DefaultCvvInputProps: TextInputProps = {
  maxLength: 3,
  inputMode: 'numeric',
  secureTextEntry: true,
};
export const AmexCvvInputProps: TextInputProps = {
  maxLength: 4,
  inputMode: 'numeric',
  secureTextEntry: true,
};
export const ExpirationInputProps: TextInputProps = {
  maxLength: 5,
  inputMode: 'numeric',
};
export const NameInputProps: TextInputProps = {maxLength: 255};
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

export const CardNumberValidator = (text: string) => {
  if (isNullOrWhiteSpace(text)) {
    return SCOPED_STRINGS.MustNotBeEmpty;
  }

  text = text?.replace(/\D/g, '');
  switch (text?.charAt(0)) {
    // Visa
    case '4':
      if (!(text.length === 16 || text.length === 13) && !luhnCheck(text)) {
        return `${SCOPED_STRINGS.InvalidMinLength} ${SCOPED_STRINGS.ValidVisaLength}`;
      }
      break;
    // Amex
    case '3':
      if (text.length < 15 && !luhnCheck(text)) {
        return `${SCOPED_STRINGS.InvalidMinLength} ${SCOPED_STRINGS.ValidAmexLength}`;
      }
      break;
    // MasterCard
    case '5':
    // Discover
    case '6':
      if (text.length < 16 && !luhnCheck(text)) {
        return `${SCOPED_STRINGS.InvalidMinLength} ${SCOPED_STRINGS.ValidMasterCardOrDiscoverLength}`;
      }
      break;
    default:
      break;
  }

  if (!isNullOrWhiteSpace(text) && !luhnCheck(text)) {
    return SCOPED_STRINGS.InvalidCardNumber;
  }
  return '';
};

export const ExpirationValidator = (text: string) => {
  if (isNullOrWhiteSpace(text)) {
    return SCOPED_STRINGS.MustNotBeEmpty;
  } else if (text?.length < 5 || !text?.match(expirationPattern)) {
    return SCOPED_STRINGS.InvalidExpiration;
  } else if (dateIsPast(text)) {
    return SCOPED_STRINGS.CardExpired;
  }
  return '';
};

function dateIsPast(text: string) {
  const [month, year] = text.split('/');

  // Set the input date to the last day of the month to ensure accurate comparison
  const date = new Date(
    parseInt(`20${year}`),
    parseInt(month) - 1,
    new Date(parseInt(year), parseInt(month), 0).getDate(),
  );

  const today = new Date();
  return date < today;
}

export const CvvValidator = (text: string) => {
  if (isNullOrWhiteSpace(text)) {
    return SCOPED_STRINGS.MustNotBeEmpty;
  } else if (!text?.match(cvvPattern)) {
    return SCOPED_STRINGS.InvalidCvv;
  }
  return '';
};

export const AmexCvvValidator = (text: string) => {
  if (isNullOrWhiteSpace(text)) {
    return SCOPED_STRINGS.MustNotBeEmpty;
  } else if (!text?.match(amexCvvPattern)) {
    return SCOPED_STRINGS.InvalidCvv;
  }
  return '';
};

export const NameValidator = (text: string) => {
  if (isNullOrWhiteSpace(text)) {
    return SCOPED_STRINGS.MustNotBeEmpty;
  } else if (text?.length >= 256) {
    return SCOPED_STRINGS.InvalidMaxLength255;
  } else if (!text?.match(alphabeticInputPattern)) {
    return SCOPED_STRINGS.MustBeAlphabeticOrWhiteSpace;
  }
  return '';
};
