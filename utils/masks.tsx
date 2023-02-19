export const creditCardMask = (text: string) => {
  let formattedText = text.replace(/\D/g, ''); // remove all non-numeric characters
  if (formattedText.length > 16) {
    formattedText = formattedText.slice(0, 16); // limit to 16 digits
  }
  let maskedText = '';
  for (let i = 0; i < formattedText.length; i++) {
    if (i !== 0 && i % 4 === 0) {
      maskedText += '-'; // add dash after 4th and 10th digit
    }
    maskedText += formattedText[i];
  }
  return maskedText;
};

export const amexCreditCardMask = (text: string) => {
  let formattedText = text.replace(/\D/g, ''); // remove all non-numeric characters
  if (formattedText.length > 15) {
    formattedText = formattedText.slice(0, 15); // limit to 15 digits
  }
  let maskedText = '';
  for (let i = 0; i < formattedText.length; i++) {
    if (i === 4 || i === 10) {
      maskedText += '-'; // add dash after 4th and 10th digit
    }
    maskedText += formattedText[i];
  }
  return maskedText;
};

export const cardExpirationMask = (text: string) => {
  // Remove non-numeric characters
  const numericText = text.replace(/\D/g, '');

  // Limit input to 4 characters
  const truncatedText = numericText.slice(0, 4);

  // Apply format based on input length
  if (truncatedText.length === 1) {
    return truncatedText.match(/^([01])$/) ? truncatedText : '';
  } else if (truncatedText.length === 2) {
    return truncatedText.match(/^(0[1-9]|1[0-2])$/)
      ? truncatedText
      : truncatedText.slice(0, 1);
  } else if (truncatedText.length > 2) {
    return `${truncatedText.slice(0, 2)}/${truncatedText.slice(2)}`;
  } else {
    return truncatedText;
  }
};

export const CvvMask = (text: string) => {
  // Remove non-numeric characters
  return text.replace(/\D/g, '');
};
