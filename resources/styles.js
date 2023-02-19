import {StyleSheet, useColorScheme} from 'react-native';
import {Colors} from './colors';

export function useGlobalStyles() {
  return StyleSheet.create({
    statusBar: {
      backgroundColor: useDarkMode() ? Colors.darker : Colors.light,
    },
    pageContainer: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
      backgroundColor: useDarkMode() ? Colors.dark : Colors.lighter,
    },
    viewContainer: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    text: {
      fontSize: 20,
      color: useDarkMode() ? Colors.white : Colors.black,
    },
    textInput: {
      fontSize: 16,
      color: useDarkMode() ? Colors.white : Colors.black,
      borderWidth: 2,
      borderRadius: 4,
      borderColor: useDarkMode() ? Colors.lightGray : Colors.gray,
    },
  });
}

export function useDarkMode() {
  return useColorScheme() === 'dark';
}
export function useStatusBarScheme() {
  return useDarkMode() ? 'light-content' : 'dark-content';
}
