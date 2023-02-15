import React from 'react';
import {TextInput as NativeTextInput, TextInputProps} from 'react-native';
import * as Themes from '../../../resources/Styles';

export default function TextInput(props: TextInputProps) {
  return (
    <NativeTextInput
      {...props}
      style={[Themes.GlobalStyles().textInput, props.style]}
      placeholderTextColor={Themes.GlobalStyles().textInput.borderColor}
      onChangeText={(text: string) => {
        if (props.onChangeText) {
          props.onChangeText(text);
        }
      }}
    />
  );
}
