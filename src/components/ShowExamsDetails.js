/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, List, Snackbar, useTheme} from 'react-native-paper';
import RNFS from 'react-native-fs';

import {usePreferencesState} from '../context/preferences';
import ShowExamDetails from './ShowExamDetails';

const ShowExamsDetails = ({expedientId, setId2Show}) => {
  const {colors} = useTheme();
  const {expedients} = usePreferencesState();

  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState(new Date(1950, 0, 1));
  const [sex, setSex] = useState('femenino');
  const [identifier, setIdentifier] = useState('');
  const [exams, setExams] = useState([]);

  const [detail2Show, setDetail2Show] = useState(null);

  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const onDismissSnackBar = () => setSnackVisible(false);

  useEffect(() => {
    const currentExpedient = expedients.find(exp => exp.id === expedientId);
    if (currentExpedient) {
      setName(currentExpedient.name);
      const date = new Date(currentExpedient.birthdate);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      setBirthdate(`${day}/${month}/${year}`);
      setSex(currentExpedient.sex === 'femenino' ? 'Femenino' : 'Masculino');
      setIdentifier(currentExpedient.identifier);

      RNFS.readDir(RNFS.ExternalDirectoryPath)
        .then(result => {
          let newExams = [];
          result.forEach(r => {
            if (
              r.isFile() &&
              r.name.endsWith('.data') &&
              r.name.includes(currentExpedient.identifier)
            ) {
              console.log(currentExpedient.identifier, r.name);
              RNFS.readFile(r.path, 'utf8')
                .then(content => {
                  const parsedContent = JSON.parse(content);
                  newExams = [
                    ...newExams,
                    {...parsedContent, filename: r.name.split('.')[0]},
                  ];
                  setExams(newExams);
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
    } else {
      setBirthdate('1/1/1950');
    }
  }, [expedientId]);

  const deleteExam = filename => {
    // create a path you want to delete
    const path = RNFS.ExternalDirectoryPath + `/${filename}.data`;

    RNFS.unlink(path)
      .then(() => {
        console.log('FILE DELETED');
        const newExams = exams.filter(e => e.filename !== filename);
        setExams(newExams);
        setSnackMessage('Examen eliminado.');
        setSnackVisible(true);
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch(err => {
        console.log(err.message);
      });
  };
  const examsList = exams.map(exm =>
    detail2Show && detail2Show === exm.filename ? (
      <ShowExamDetails
        key={exm.filename}
        exam={exm}
        setDetail2Show={setDetail2Show}
      />
    ) : (
      <List.Section key={exm.filename}>
        <List.Item
          title={`${exm.filename}`}
          titleNumberOfLines={2}
          right={() => (
            <Button
              icon="page-next"
              onPress={() => setDetail2Show(exm.filename)}
            />
          )}
          left={() => (
            <Button
              icon="delete"
              color={colors.error}
              onPress={() => deleteExam(exm.filename)}
            />
          )}
        />
      </List.Section>
    ),
  );

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <ScrollView style={styles.scroll}>
          <List.Section>
            <List.Item
              title={`${name}`}
              description={`${identifier}- ${sex}. ${birthdate}`}
              titleNumberOfLines={2}
              descriptionNumberOfLines={4}
              left={() => (
                <Button
                  icon="close"
                  color={colors.error}
                  onPress={() => setId2Show(null)}
                />
              )}
            />
          </List.Section>
          {examsList}
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

export default ShowExamsDetails;

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
  row_around: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
