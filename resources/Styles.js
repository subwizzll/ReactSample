import {StyleSheet, useColorScheme} from 'react-native';
import {Colors} from './Colors';

export function GlobalStyles() {
  return StyleSheet.create({
    statusBar: {
      backgroundColor: IsDarkMode() ? Colors.darker : Colors.light,
    },
    pageContainer: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
      backgroundColor: IsDarkMode() ? Colors.dark : Colors.lighter,
    },
    viewContainer: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    text: {
      fontSize: 20,
      color: IsDarkMode() ? Colors.white : Colors.black,
    },
    textInput: {
      fontSize: 16,
      color: IsDarkMode() ? Colors.white : Colors.black,
      borderWidth: 2,
      borderRadius: 4,
      borderColor: IsDarkMode() ? Colors.lightGray : Colors.gray,
    },
  });
}

export function IsDarkMode() {
  return useColorScheme() === 'dark';
}
export function StatusBarScheme() {
  return IsDarkMode() ? 'light-content' : 'dark-content';
}
