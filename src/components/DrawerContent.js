/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  useDrawerProgress,
} from '@react-navigation/drawer';
import {
  Caption,
  Drawer,
  Paragraph,
  Switch,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TapButton from './TapButton';

import {
  usePreferencesState,
  usePreferencesDispatch,
} from '../context/preferences';

import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerContent = props => {
  //   const {progress, navigation, state} = props;
  const progress = useDrawerProgress();
  const {navigation} = props;

  const [errors] = useState({});

  const {colors} = useTheme();
  const {theme} = usePreferencesState();
  const dispatch = usePreferencesDispatch();

  const opacity = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const storagePreferences = async () => {
    try {
      await AsyncStorage.setItem('@theme', theme);
    } catch (e) {
      console.log(e);
    }
  };

  const navigate = async c => {
    navigation.navigate(c);
  };

  return (
    <DrawerContentScrollView {...props}>
      <Animated.View
        style={[
          styles.drawerContent,
          {
            backgroundColor: colors.surface,
            opacity,
          },
        ]}>
        <Drawer.Section title={'Versión'}>
          <Caption style={{textAlign: 'center'}}>v2.0.1</Caption>
        </Drawer.Section>
        <Drawer.Section title={'Preferencias'}>
          <TouchableRipple onPress={() => dispatch({type: 'TOGGLE_THEME'})}>
            <View style={styles.preferenceTheme}>
              <Text>{'Tema'}</Text>
              <MaterialCommunityIcons
                name={
                  theme === 'dark' ? 'moon-waning-crescent' : 'weather-sunny'
                }
                color={colors.accent}
                size={24}
              />
              <View pointerEvents="none">
                <Switch value={theme === 'dark'} />
              </View>
            </View>
          </TouchableRipple>

          {errors.general ? (
            <Paragraph
              style={{
                borderRadius: 5,
                borderColor: colors.error,
                borderWidth: 1,
                color: colors.error,
                marginVertical: 10,
                padding: 10,
              }}>
              {errors.general}
            </Paragraph>
          ) : null}

          <View style={styles.button}>
            <TapButton onPress={storagePreferences} icon="content-save" />
          </View>
        </Drawer.Section>

        <Drawer.Section title={'Opciones'}>
          <TouchableRipple
            style={[styles.link, {borderColor: colors.text}]}
            onPress={() => navigate('Expedients')}>
            <Text>{'Expedientes'}</Text>
          </TouchableRipple>
          <TouchableRipple
            style={[styles.link, {borderColor: colors.text, marginTop: 20}]}
            onPress={() => navigate('Exams')}>
            <Text>{'Examinar'}</Text>
          </TouchableRipple>
        </Drawer.Section>
      </Animated.View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  preferenceTheme: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    width: '100%',
  },
  link: {
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    width: '70%',
  },
});

export default DrawerContent;
