import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import Text from './Text';
import {Colors} from '../../resources/Colors';
import {TouchableOpacityProps} from 'react-native/Libraries/Components/Touchable/TouchableOpacity';
import {TextProps} from 'react-native/Libraries/Text/Text';

interface ButtonProps {
  touchableOpacityProps?: TouchableOpacityProps;
  textProps?: TextProps;
}
export default function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      {...props.touchableOpacityProps}
      onPress={props && props.touchableOpacityProps?.onPress}
      style={localStyles.container}>
      <Text {...props.textProps} children="Submit" style={localStyles.label} />
    </TouchableOpacity>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.primary,
  },
  label: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
