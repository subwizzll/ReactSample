import React from 'react';
import {Text as NativeText} from 'react-native';
import {TextProps} from 'react-native/Libraries/Text/Text';
import * as Styles from '../../../resources/styles';

export default function Text(props: TextProps) {
  return (
    <NativeText
      {...props}
      style={[Styles.useGlobalStyles().text, props.style]}
    />
  );
}
