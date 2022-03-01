/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Card,
  List,
  Snackbar,
  Title,
  useTheme,
} from 'react-native-paper';
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

  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const onDismissSnackBar = () => setSnackVisible(false);

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
              console.log(r);
              setSnackMessage('Expediente con exámenes.');
              setSnackVisible(true);

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

              setSnackMessage('Expediente eliminado.');
            } else {
              setSnackMessage('Expediente no encontrado.');
            }
            setSnackVisible(true);
          }
        })
        .catch(err => {
          setSnackMessage('Error al leer ficheros.');
          setSnackVisible(true);
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
      <Card>
        <List.Item
          key={exp.id}
          title={`${exp.name} - ${exp.identifier}`}
          titleNumberOfLines={2}
          right={() => (
            <Button icon="account-edit" onPress={() => setId2Edit(exp.id)} />
          )}
          left={() => (
            <Button
              color={colors.error}
              icon="delete"
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
      <Snackbar
        visible={snackVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Ok',
          onPress: () => {
            // Do something
          },
        }}>
        {snackMessage}
      </Snackbar>
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
