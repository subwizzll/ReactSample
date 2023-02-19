import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import * as Styles from '../../../resources/styles';

interface SafeAreaPageProps {
  children: React.ReactNode;
}

export default function SafeAreaPage(props: SafeAreaPageProps) {
  const styles = Styles.useGlobalStyles();
  return (
    <SafeAreaView style={styles.pageContainer}>
      <StatusBar
        barStyle={Styles.useStatusBarScheme()}
        backgroundColor={styles.statusBar.backgroundColor}
      />
      {props.children}
    </SafeAreaView>
  );
}
