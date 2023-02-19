import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import Button from '../../shared/components/Button';
import LabeledInput from '../../shared/components/LabeledInput';
import SafeAreaPage from '../../shared/pages/SafeAreaPage';
import * as Validation from '../../../utils/validation';
import * as Masks from '../../../utils/masks';
import {Strings} from '../../../resources/strings';
import {isNullOrWhiteSpace} from '../../../utils/stringMethods';

const SCOPED_STRINGS = Strings.FEATURES.PAYMENT.CardInputPage;

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
    setCardNumberError(Validation.cardNumberValidator(cardNumber));
    setExpirationError(Validation.expirationValidator(expiration));
    setCvvError(
      isAmexCard
        ? Validation.amexCvvValidator(cvv)
        : Validation.cvvValidator(cvv),
    );
    setFirstNameError(Validation.nameValidator(firstName));
    setLastNameError(Validation.nameValidator(lastName));

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
        style={localStyles.scrollView}>
        <View style={localStyles.container}>
          <LabeledInput
            label={SCOPED_STRINGS.cardNumberLabel}
            error={cardNumberError}
            onChangeText={setCardNumber}
            validator={Validation.cardNumberValidator}
            onValidate={setCardNumberError}
            placeholder={SCOPED_STRINGS.cardNumberPlaceHolder}
            inputValue={cardNumber}
            inputProps={
              isAmexCard
                ? Validation.amexCardInputProps
                : Validation.defaultCardInputProps
            }
            mask={isAmexCard ? Masks.amexCreditCardMask : Masks.creditCardMask}
          />
          <View style={localStyles.inputGroup}>
            <LabeledInput
              label={SCOPED_STRINGS.expirationLabel}
              error={expirationError}
              onChangeText={setExpiration}
              validator={Validation.expirationValidator}
              onValidate={setExpirationError}
              placeholder={SCOPED_STRINGS.expirationPlaceHolder}
              inputValue={expiration}
              inputProps={Validation.expirationInputProps}
              mask={Masks.cardExpirationMask}
            />
            <LabeledInput
              label={SCOPED_STRINGS.cvvLabel}
              error={cvvError}
              onChangeText={setCvv}
              validator={
                isAmexCard
                  ? Validation.amexCvvValidator
                  : Validation.cvvValidator
              }
              onValidate={setCvvError}
              placeholder={SCOPED_STRINGS.cvvPlaceHolder}
              inputValue={cvv}
              inputProps={
                isAmexCard
                  ? Validation.amexCvvInputProps
                  : Validation.defaultCvvInputProps
              }
              mask={Masks.CvvMask}
            />
          </View>
          <View style={localStyles.inputGroup}>
            <LabeledInput
              label={SCOPED_STRINGS.firstNameLabel}
              error={firstNameError}
              onChangeText={setFirstName}
              validator={Validation.nameValidator}
              onValidate={setFirstNameError}
              placeholder={SCOPED_STRINGS.firstNamePlaceHolder}
              inputValue={firstName}
              inputProps={Validation.nameInputProps}
            />
            <LabeledInput
              label={SCOPED_STRINGS.lastNameLabel}
              error={lastNameError}
              onChangeText={setLastName}
              validator={Validation.nameValidator}
              onValidate={setLastNameError}
              placeholder={SCOPED_STRINGS.lastNamePlaceHolder}
              inputValue={lastName}
              inputProps={Validation.nameInputProps}
            />
          </View>
          <Button touchableOpacityProps={{onPress: submitHandler}} />
        </View>
      </ScrollView>
    </SafeAreaPage>
  );
}

const localStyles = StyleSheet.create({
  scrollView: {
    marginTop: 16,
  },
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
