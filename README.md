# Running the Validation tests
This is a set of tests for different validators to be used in a credit card payment form. To run these tests, you need to have Node.js installed in your environment.

To get started, please follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repository.git
```

2. Navigate to the directory where the tests are located:
```bash
cd your-repository/tests/utils/
```

3. Install dependencies by running:
```bash
npm install
```

4. Run the tests:
```bash
npm test
```
The above command will execute all tests in the file `Validation.test.js` and show the results in the console.

If you want to run a specific test, you can do so by using the `describe` or `it` function name as follows:

```bash
npm test -- -t 'NameValidator should return an error message when the input is too long'
```
This command will run only the `NameValidator` test case that checks if an error message is returned when the input is too long.

That's it! You are now ready to run the tests and verify that the validators work as expected.

# See it in Action

### Input validation in the form fields is triggered in 3 ways:
The `endEditingHandler` via `TextInputEndEditingEventData` & `TextInputSubmitEditingEventData`. These events are triggered when the user presses the submit button with the native keyboard or the input element is unfocused.
```
const endEditingHandler = (
  e: NativeSyntheticEvent<
    TextInputEndEditingEventData | TextInputSubmitEditingEventData
  >,
) => validate(e.nativeEvent.text);

const validate = (text: string) => {
  if (props?.validator) {
    const error = props.validator(text);
    props?.onValidate && props?.onValidate(error);
  }
};

  return (
    <View {...props.viewProps}>
      <Text 
        ...
      />
      <TextInput
        ...
        onSubmitEditing={endEditingHandler}
        onEndEditing={endEditingHandler}
        ...
      />
      {!isNullOrWhiteSpace(props.error) && (
        <Text style={localStyles.error}>{props.error}</Text>
      )}
    </View>
  );
}
```

The 3rd way is triggered via `submitHandler` which is fired by the main button on screen:

```
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
```

### Additional Features:

- For fun, I included some input masking as part of the validation flow found in `Masks.tsx`.
- I also abstracted user facing strings to `Localization.js` to reduce test failures from mismatched strings.
- Custom components were created to reduce verbosity in the `CardInputPage`
- This app also supports `light` and `dark` mode with a global color scheme for each device theme.
- `TypeScript` was also used through-out this project to better manage the codebase.
