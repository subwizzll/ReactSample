import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import Button from '../shared/components/Button';
import LabeledInput from '../shared/components/LabeledInput';
import SafeAreaPage from '../shared/pages/SafeAreaPage';
import * as Validation from '../utils/Validation';
import * as Masks from '../utils/Masks';
import Localization from '../resources/Localization';
import {isNullOrWhiteSpace} from '../utils/StringMethods';

const SCOPED_STRINGS = Localization.PAYMENT.CardInputPage;

export default function CardInputPage() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [isAmexCard, setIsAmexCard] = useState(cardNumber.charAt(0) === '3');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expirationError, setExpirationError] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  useEffect(() => {
    setIsAmexCard(cardNumber.charAt(0) === '3');
  }, [cardNumber]);

  useEffect(() => {
    setExpiration('');
    setCvv('');
  }, [isAmexCard]);

  const submitHandler = () => {
    setCardNumberError(Validation.CardNumberValidator(cardNumber));
    setExpirationError(Validation.ExpirationValidator(expiration));
    setCvvError(
      isAmexCard
        ? Validation.AmexCvvValidator(cvv)
        : Validation.CvvValidator(cvv),
    );
    setFirstNameError(Validation.NameValidator(firstName));
    setLastNameError(Validation.NameValidator(lastName));
    if (
      isNullOrWhiteSpace(cardNumberError) &&
      isNullOrWhiteSpace(expirationError) &&
      isNullOrWhiteSpace(cvvError) &&
      isNullOrWhiteSpace(firstNameError) &&
      isNullOrWhiteSpace(lastNameError)
    ) {
      console.log({
        CardNumber: cardNumber,
        Expiration: expiration,
        CVV: cvv,
        FirstName: firstName,
        LastName: lastName,
      });
    }
  };
  return (
    <SafeAreaPage>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{marginTop: 16}}>
        <View style={localStyles.container}>
          <LabeledInput
            label={SCOPED_STRINGS.CardNumberLabel}
            error={cardNumberError}
            onChangeText={setCardNumber}
            validator={Validation.CardNumberValidator}
            onValidate={setCardNumberError}
            placeholder={SCOPED_STRINGS.CardNumberPlaceHolder}
            inputValue={cardNumber}
            inputProps={
              isAmexCard
                ? Validation.AmexCardInputProps
                : Validation.DefaultCardInputProps
            }
            mask={isAmexCard ? Masks.AmexCreditCardMask : Masks.CreditCardMask}
          />
          <View style={localStyles.inputGroup}>
            <LabeledInput
              label={SCOPED_STRINGS.ExpirationLabel}
              error={expirationError}
              onChangeText={setExpiration}
              validator={Validation.ExpirationValidator}
              onValidate={setExpirationError}
              placeholder={SCOPED_STRINGS.ExpirationPlaceHolder}
              inputValue={expiration}
              inputProps={Validation.ExpirationInputProps}
              mask={Masks.CardExpirationMask}
            />
            <LabeledInput
              label={SCOPED_STRINGS.CvvLabel}
              error={cvvError}
              onChangeText={setCvv}
              validator={
                isAmexCard
                  ? Validation.AmexCvvValidator
                  : Validation.CvvValidator
              }
              onValidate={setCvvError}
              placeholder={SCOPED_STRINGS.CvvPlaceHolder}
              inputValue={cvv}
              inputProps={
                isAmexCard
                  ? Validation.AmexCvvInputProps
                  : Validation.DefaultCvvInputProps
              }
              mask={Masks.CvvMask}
            />
          </View>
          <View style={localStyles.inputGroup}>
            <LabeledInput
              label={SCOPED_STRINGS.FirstNameLabel}
              error={firstNameError}
              onChangeText={setFirstName}
              validator={Validation.NameValidator}
              onValidate={setFirstNameError}
              placeholder={SCOPED_STRINGS.FirstNamePlaceHolder}
              inputValue={firstName}
              inputProps={Validation.NameInputProps}
            />
            <LabeledInput
              label={SCOPED_STRINGS.LastNameLabel}
              error={lastNameError}
              onChangeText={setLastName}
              validator={Validation.NameValidator}
              onValidate={setLastNameError}
              placeholder={SCOPED_STRINGS.LastNamePlaceHolder}
              inputValue={lastName}
              inputProps={Validation.NameInputProps}
            />
          </View>
          <Button touchableOpacityProps={{onPress: submitHandler}} />
        </View>
      </ScrollView>
    </SafeAreaPage>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 4,
    rowGap: 16,
    paddingHorizontal: 16,
  },
  inputGroup: {
    flex: 2,
    columnGap: 16,
    alignItems: 'stretch',
    flexGrow: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
