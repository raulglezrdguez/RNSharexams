import React, {useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Button, Headline, Snackbar, useTheme} from 'react-native-paper';

import RNFS from 'react-native-fs';

import {usePreferencesState} from '../context/preferences';

import SelectExpedients from '../components/SelectExpedient';
import SelectKb from '../components/SelectKb';
import ExecKb from '../components/ExecKb';
import ShowResult from '../components/ShowResult';

const Exams = () => {
  const {colors} = useTheme();
  const {expedients} = usePreferencesState();

  const [expedient, setExpedient] = useState(null);
  const [kb, setKb] = useState(null);
  const [result, setResult] = useState(null);

  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const onDismissSnackBar = () => setSnackVisible(false);

  useEffect(() => {
    setExpedient(null);
    setKb(null);
    setResult(null);
  }, []);

  const clearExpedient = () => {
    setResult(null);
    setExpedient(null);
  };
  const clearKb = () => {
    setResult(null);
    setKb(null);
  };

  const createFile = (name, content) => {
    // create a path you want to write to
    const path = RNFS.ExternalDirectoryPath + `/${name}`;

    RNFS.exists(path)
      .then(fileExists => {
        if (!fileExists) {
          RNFS.writeFile(path, content, 'utf8')
            .then(success => {
              console.log('FILE WRITTEN! ' + path, content);
              setSnackMessage('Datos almacenados.');
              setSnackVisible(true);
            })
            .catch(err => {
              console.log(err.message);
              setSnackMessage('Error al almacenar los datos.');
              setSnackVisible(true);
            });
        } else {
          setSnackMessage('El fichero existe.');
          setSnackVisible(true);
        }
      })
      .catch(err => {
        setSnackMessage('Error al almacenar los datos.');
        setSnackVisible(true);
        console.log(err.message);
      });
  };

  const saveExam = () => {
    const kbName = kb.filename;
    const expedientId = expedient.identifier;
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();

    const content = {
      ...result,
      kb: kbName,
      expedient: expedientId,
      day,
      month,
      year,
      hour,
      minute,
    };
    const filename =
      kbName.split('.')[0] +
      `-${expedientId}-${day}-${month}-${year}-${hour}-${minute}.data`;
    createFile(filename, JSON.stringify(content));
    clearKb();
  };

  let content = null;
  if (expedient === null) {
    content = <SelectExpedients setExpedient={setExpedient} />;
  } else if (kb === null) {
    content = <SelectKb setKb={setKb} />;
  } else if (result === null) {
    content = <ExecKb kb={kb} setResult={setResult} />;
  }
  if (expedient !== null) {
    const found = expedients.find(e => e.identifier === expedient.identifier);
    if (!found) {
      clearExpedient();
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <Headline />
        {expedient && (
          <Button
            color={colors.primary}
            icon="close"
            onPress={() => {
              clearExpedient();
            }}>
            {expedient.name}
          </Button>
        )}
        {kb && (
          <Button
            color={colors.primary}
            icon="close"
            onPress={() => {
              clearKb();
            }}>
            {kb.knowledgebase.properties.title}
          </Button>
        )}
        {result && <ShowResult kb={kb} result={result} saveExam={saveExam} />}

        {content}
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

export default Exams;
