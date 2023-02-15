import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import * as Themes from '../../resources/Styles';

interface SafeAreaPageProps {
  children: React.ReactNode;
}

export default function SafeAreaPage(props: SafeAreaPageProps) {
  const styles = Themes.GlobalStyles();
  return (
    <SafeAreaView style={styles.pageContainer}>
      <StatusBar
        barStyle={Themes.StatusBarScheme()}
        backgroundColor={styles.statusBar.backgroundColor}
      />
      {props.children}
    </SafeAreaView>
  );
}
