import React from 'react';
import {Text as NativeText} from 'react-native';
import {TextProps} from 'react-native/Libraries/Text/Text';
import * as Themes from '../../../resources/Styles';

export default function Text(props: TextProps) {
  return (
    <NativeText {...props} style={[Themes.GlobalStyles().text, props.style]} />
  );
}
