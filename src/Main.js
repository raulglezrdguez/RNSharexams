/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  Snackbar,
} from 'react-native-paper';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {XMLParser} from 'fast-xml-parser';

import DrawerContent from './components/DrawerContent';
import RNFS from 'react-native-fs';

import {
  usePreferencesState,
  usePreferencesDispatch,
} from './context/preferences';

const Drawer = createDrawerNavigator();

import RootScreen from './screens/RootScreen';
import Exams from './screens/Exams';
import RootExpedients from './screens/RootExpedients';

import {egef, katz, lawton, frail} from './exams';

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};

const Main = () => {
  const {theme, snackMessage} = usePreferencesState();
  const dispatch = usePreferencesDispatch();
  const userTheme = theme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;

  const onDismissSnackBar = () =>
    dispatch({
      type: 'SET_SNACK_MESSAGE',
      payload: '',
    });

  const createFile = (name, content) => {
    // create a path you want to write to
    const path = RNFS.ExternalDirectoryPath + `/${name}`;
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      allowBooleanAttributes: true,
    });

    RNFS.exists(path)
      .then(fileExists => {
        if (!fileExists) {
          // write the file
          RNFS.writeFile(path, content, 'utf8')
            .then(success => {
              console.log('FILE WRITTEN! ' + path);
              let parsedContent = parser.parse(content);
              parsedContent = {...parsedContent, filename: name};
              dispatch({type: 'ADD_KB', payload: parsedContent});
            })
            .catch(err => {
              console.log(err.message);
            });
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    createFile('egef.xml', egef);
    createFile('katz.xml', katz);
    createFile('lawton.xml', lawton);
    createFile('frail.xml', frail);
  }, []);

  return (
    <PaperProvider theme={userTheme}>
      <NavigationContainer theme={userTheme}>
        <Drawer.Navigator
          initialRouteName="Inicio"
          drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen
            name="Inicio"
            component={RootScreen}
            options={{title: 'INICIO'}}
          />
          <Drawer.Screen
            name="Expedients"
            component={RootExpedients}
            options={{title: 'EXPEDIENTES'}}
          />
          <Drawer.Screen
            name="Exams"
            component={Exams}
            options={{title: 'EXÁMENES'}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
      <Snackbar
        visible={snackMessage !== ''}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Ok',
          onPress: () => {
            // Do something
          },
        }}>
        {snackMessage}
      </Snackbar>
    </PaperProvider>
  );
};

export default Main;
