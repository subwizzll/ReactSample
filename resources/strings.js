export const Strings = {
  FEATURES: {
    PAYMENT: {
      CardInputPage: {
        cardNumberLabel: 'Card Number',
        cardNumberPlaceHolder: 'XXXX-XXXX-XXXX-XXXX',
        expirationLabel: 'Expiration',
        expirationPlaceHolder: 'MM/YY',
        cvvLabel: 'CVV',
        cvvPlaceHolder: 'Security Code',
        firstNameLabel: 'First Name',
        firstNamePlaceHolder: 'John',
        lastNameLabel: 'Last Name',
        lastNamePlaceHolder: 'Doe',
      },
    },
  },
  UTILS: {
    VALIDATION: {
      mustNotBeEmpty: 'Must not be empty',
      invalidCardNumber: 'Invalid card number',
      invalidExpiration: 'Expiration invalid: Must be in MM/YY format',
      invalidCvv: 'Invalid CVV',
      invalidMaxLength255: 'Max length: 255 char',
      invalidMinLength: 'Length must be',
      validVisaLength: '13 or 16 for Visa Cards',
      validAmexLength: '15 for Amex Cards',
      validMasterCardOrDiscoverLength: '16 for MasterCard or Discover Cards',
      cardExpired: 'Card expired',
      mustBeAlphabeticOrWhiteSpace:
        'Must begin with a letter between A‑Z and only contain alphabetic characters and spaces',
    },
  },
};
