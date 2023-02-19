import React from 'react';
import {TextInput as NativeTextInput, TextInputProps} from 'react-native';
import * as Styles from '../../../resources/styles';

export default function TextInput(props: TextInputProps) {
  return (
    <NativeTextInput
      {...props}
      style={[Styles.useGlobalStyles().textInput, props.style]}
      placeholderTextColor={Styles.useGlobalStyles().textInput.borderColor}
      onChangeText={(text: string) => {
        if (props.onChangeText) {
          props.onChangeText(text);
        }
      }}
    />
  );
}
