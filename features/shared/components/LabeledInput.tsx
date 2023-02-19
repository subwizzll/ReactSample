import React from 'react';
import {
  View,
  StyleSheet,
  ViewProps,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  TextInputEndEditingEventData,
} from 'react-native';

import {Colors} from '../../../resources/colors';
import Text from './Text';
import TextInput from './TextInput';
import {TextInputProps} from 'react-native/Libraries/Components/TextInput/TextInput';
import {isNullOrWhiteSpace} from '../../../utils/stringMethods';

interface LabeledInputProps {
  label: string;
  error: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  inputValue: string;
  mask?: (text: string) => string;
  validator?: (text: string) => string;
  onValidate?: (value: string) => void;
  viewProps?: ViewProps;
  inputProps?: TextInputProps;
}

export default function LabeledInput(props: LabeledInputProps) {
  const changeTextHandler = (inputText: string) => {
    const displayText = props?.mask ? props.mask(inputText) : inputText;
    props.onChangeText(displayText);
  };

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
    <View
      {...props.viewProps}
      style={[props.viewProps?.style, localStyles.container]}>
      <Text style={localStyles.label}>{props.label}</Text>
      <TextInput
        {...props.inputProps}
        placeholder={props.placeholder}
        style={localStyles.input}
        onChangeText={changeTextHandler}
        onSubmitEditing={endEditingHandler}
        onEndEditing={endEditingHandler}
        value={props.inputValue}
      />
      {!isNullOrWhiteSpace(props.error) && (
        <Text style={localStyles.error}>{props.error}</Text>
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    padding: 8,
  },
  error: {
    fontSize: 12,
    paddingHorizontal: 8,
    color: Colors.danger,
    marginTop: 4,
  },
});
