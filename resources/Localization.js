export default {
  VALIDATION: {
    MustNotBeEmpty: 'Must not be empty',
    InvalidCardNumber: 'Invalid card number',
    InvalidExpiration: 'Expiration invalid: Must be in MM/YY format',
    InvalidCvv: 'Invalid CVV',
    InvalidMaxLength255: 'Max length: 255 char',
    InvalidMinLength: 'Length must be',
    ValidVisaLength: '13 or 16 for Visa Cards',
    ValidAmexLength: '15 for Amex Cards',
    ValidMasterCardOrDiscoverLength: '16 for MasterCard or Discover Cards',
    CardExpired: 'Card expired',
    MustBeAlphabeticOrWhiteSpace:
      'Must begin with a letter between A‑Z and only contain alphabetic characters and spaces',
  },
  PAYMENT: {
    CardInputPage: {
      CardNumberLabel: 'Card Number',
      CardNumberPlaceHolder: 'XXXX-XXXX-XXXX-XXXX',
      ExpirationLabel: 'Expiration',
      ExpirationPlaceHolder: 'MM/YY',
      CvvLabel: 'CVV',
      CvvPlaceHolder: 'Security Code',
      FirstNameLabel: 'First Name',
      FirstNamePlaceHolder: 'John',
      LastNameLabel: 'Last Name',
      LastNamePlaceHolder: 'Doe',
    },
  },
};
