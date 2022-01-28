/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {
  Headline,
  Subheading,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import RNFS from 'react-native-fs';
import {XMLParser} from 'fast-xml-parser';

import {usePreferencesDispatch} from '../context/preferences';

const RootScreen = ({navigation}) => {
  const {colors} = useTheme();

  const dispatch = usePreferencesDispatch();

  const refreshExpedients = () => {
    const expedientsFile = RNFS.ExternalDirectoryPath + '/expedients.db';

    RNFS.exists(expedientsFile)
      .then(exist => {
        if (exist) {
          RNFS.readFile(expedientsFile, 'utf8')
            .then(content => {
              const exp = JSON.parse(content);
              dispatch({type: 'SET_EXPEDIENTS', payload: exp});
            })
            .catch(err => {
              console.log(err.message);
            });
        } else {
          dispatch({type: 'SET_EXPEDIENTS', payload: []});
          RNFS.writeFile(expedientsFile, '[]', 'utf8')
            .then(success => {
              console.log('FILE WRITTEN! ' + expedientsFile);
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

  const refreshKbs = () => {
    RNFS.readDir(RNFS.ExternalDirectoryPath)
      .then(result => {
        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: '@_',
          allowBooleanAttributes: true,
        });
        result.map(res => {
          var ext = res.name.split('.');
          ext = ext.splice(ext.length - 1, 1)[0];
          if (res.isFile() && ext === 'xml') {
            RNFS.readFile(res.path, 'utf8')
              .then(content => {
                let parsedContent = parser.parse(content);
                parsedContent = {...parsedContent, filename: res.name};
                dispatch({type: 'ADD_KB', payload: parsedContent});
              })
              .catch(err => {
                console.log(err.message);
              });
          }
        });
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  };

  useEffect(() => {
    refreshExpedients();
    refreshKbs();
  }, []);

  const navigate = async c => {
    navigation.navigate(c);
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <Headline />
        <Headline style={styles.bold}>Sistema de Evaluación</Headline>
        <Headline />
        <Subheading style={styles.bold}>Revise los expedientes.</Subheading>
        <TouchableRipple
          style={[styles.link, {borderColor: colors.text}]}
          onPress={() => navigate('Expedients')}>
          <Text>{'Expedientes'}</Text>
        </TouchableRipple>
        <Headline />
        <Subheading style={styles.bold}>
          Realice evaluaciones utilizando bases de conocimientos.
        </Subheading>
        <TouchableRipple
          style={[styles.link, {borderColor: colors.text}]}
          onPress={() => navigate('Exams')}>
          <Text>{'Exámenes'}</Text>
        </TouchableRipple>
        <Headline />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  link: {
    borderRadius: 5,
    borderWidth: 1,
    margin: 2,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
});

export default RootScreen;
