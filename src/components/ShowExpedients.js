/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card, IconButton, List, Title, useTheme} from 'react-native-paper';
import RNFS from 'react-native-fs';

import {
  usePreferencesState,
  usePreferencesDispatch,
} from '../context/preferences';

import EditExpedient from './EditExpedient';

const ShowExpedients = () => {
  const {colors} = useTheme();
  const {expedients} = usePreferencesState();
  const dispatch = usePreferencesDispatch();

  const [id2Edit, setId2Edit] = useState(null);

  const saveExpedients = newExpedients => {
    let exp = JSON.stringify(newExpedients);
    let expedientsFile = RNFS.ExternalDirectoryPath + '/expedients.db';

    RNFS.writeFile(expedientsFile, exp, 'utf8')
      .then(success => {
        console.log('Expedientes almacenados');
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const delExpedient = id => {
    const exp = expedients.find(e => e.id === id);
    let deleteFile = true;
    if (exp) {
      RNFS.readDir(RNFS.ExternalDirectoryPath)
        .then(result => {
          result.forEach(r => {
            if (
              r.isFile() &&
              r.name.endsWith('.data') &&
              r.name.includes(exp.identifier)
            ) {
              dispatch({
                type: 'SET_SNACK_MESSAGE',
                payload: 'Expediente con exámenes.',
              });

              deleteFile = false;
            }
          });

          if (deleteFile) {
            const newExps = [...expedients];
            const index = newExps.findIndex(e => e.id === id);
            if (index !== -1) {
              newExps.splice(index, 1);

              dispatch({type: 'SET_EXPEDIENTS', payload: newExps});
              saveExpedients(newExps);

              dispatch({
                type: 'SET_SNACK_MESSAGE',
                payload: 'Expediente eliminado.',
              });
            } else {
              dispatch({
                type: 'SET_SNACK_MESSAGE',
                payload: 'Expediente no encontrado.',
              });
            }
          }
        })
        .catch(err => {
          dispatch({
            type: 'SET_SNACK_MESSAGE',
            payload: 'Error al leer ficheros.',
          });
          console.log(err.message, err.code);
        });
    }
  };

  const expList = expedients.map(exp =>
    id2Edit && id2Edit === exp.id ? (
      <EditExpedient
        key={exp.id}
        expedientId={exp.id}
        setId2Edit={setId2Edit}
      />
    ) : (
      <Card key={exp.id} style={{marginVertical: 5}}>
        <List.Item
          key={exp.id}
          title={`${exp.name} - ${exp.identifier}`}
          titleNumberOfLines={2}
          right={() => (
            <IconButton
              icon="account-edit"
              size={38}
              onPress={() => setId2Edit(exp.id)}
            />
          )}
          left={() => (
            <IconButton
              color={colors.error}
              icon="delete"
              size={38}
              onPress={() => {
                delExpedient(exp.id);
              }}
            />
          )}
        />
      </Card>
    ),
  );

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Title style={{marginTop: 10}}>Editando</Title>
        <ScrollView style={styles.scroll}>
          <List.Section>{expList}</List.Section>
        </ScrollView>
      </View>
    </View>
  );
};

export default ShowExpedients;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },
  scroll: {
    width: '100%',
    padding: 2,
    marginBottom: 10,
    alignContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
