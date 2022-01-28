/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  Button,
  Caption,
  HelperText,
  Snackbar,
  Switch,
  TextInput,
  Title,
} from 'react-native-paper';
import RNFS from 'react-native-fs';

import {
  usePreferencesState,
  usePreferencesDispatch,
} from '../context/preferences';

const NewExpedient = () => {
  const {expedients} = usePreferencesState();
  const dispatch = usePreferencesDispatch();

  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('01-01-1950');
  const [sex, setSex] = useState('femenino');
  const [identifier, setIdentifier] = useState('');

  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const onDismissSnackBar = () => setSnackVisible(false);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    setBirthdate(`${currentDay}-${currentMonth + 1}-${currentYear - 65}`);
  }, []);

  const saveExpedients = newExpedients => {
    let exp = JSON.stringify(newExpedients);
    let expedientsFile = RNFS.ExternalDirectoryPath + '/expedients.db';

    RNFS.writeFile(expedientsFile, exp, 'utf8')
      .then(success => {
        setSnackMessage('Datos almacenados correctamente.');
        setSnackVisible(true);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const addExpedient = expedient => {
    const found = expedients.find(
      exp => exp.identifier === expedient.identifier || exp.id === expedient.id,
    );

    if (typeof found === 'undefined') {
      const newExpedients = [...expedients, expedient];
      dispatch({type: 'SET_EXPEDIENTS', payload: newExpedients});
      saveExpedients(newExpedients);
    } else {
      setSnackMessage('El expediente ya existe, inténtelo de nuevo.');
      setSnackVisible(true);
    }
  };

  const daysInMonth = (month, year) => {
    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
      return 31;
    }
    if ([4, 6, 9, 11].includes(month)) {
      return 30;
    }
    // February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return year % 4 === 0 && (!(year % 100 === 0) || year % 400 === 0)
      ? 29
      : 28;
  };

  const validateBirthdate = () => {
    let validation = /^\d{1,2}-\d{1,2}-\d{4}$/.test(birthdate);
    if (!validation) {
      return false;
    }
    validation = birthdate.split('-');
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();
    const day = +validation[0];
    const month = +validation[1];
    const year = +validation[2];
    if (year > currentYear || year < currentYear - 110) {
      return false;
    }
    if (month < 1 || month > 12) {
      return false;
    }
    if (year === currentYear && month > currentMonth) {
      return false;
    }
    if (year === currentYear && month === currentMonth && day > currentDay) {
      return false;
    }
    const maxDays = daysInMonth(month, year);
    if (day > maxDays) {
      return false;
    }

    return true;
  };

  const validateForm = () => {
    if (validateBirthdate === false) {
      return false;
    }
    return (
      name.trim().length > 6 &&
      sex.trim().length > 7 &&
      identifier.trim().length > 5
    );
  };

  const guid = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    );
  };

  const sendForm = () => {
    if (validateForm()) {
      const id = guid();
      const expedient = {id, name, birthdate, sex, identifier};

      addExpedient(expedient);
    } else {
      setSnackMessage('Introduzca correctamente los datos del expediente.');
      setSnackVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Title style={{marginTop: 10}}>Creando</Title>
        <ScrollView style={styles.scroll}>
          <TextInput
            label="Identificador"
            value={identifier}
            onChangeText={iden => setIdentifier(iden)}
            mode="outlined"
            placeholder="Identificador"
            error={identifier.length < 6}
            style={{marginTop: 10}}
            keyboardType={'number-pad'}
          />
          <HelperText type="error" visible={identifier.length < 6}>
            {identifier.length < 6 && 'Identificador incorrecto'}
          </HelperText>

          <TextInput
            label="Nombre"
            value={name}
            onChangeText={n => setName(n)}
            mode="outlined"
            placeholder="Nombre"
            error={name.length < 7}
            style={{marginTop: 10}}
            autoCapitalize={'words'}
          />
          <HelperText type="error" visible={name.length < 7}>
            {name.length < 7 && 'Nombre incorrecto'}
          </HelperText>

          <View style={[styles.row, {marginTop: 10}]}>
            <Caption>{sex === 'femenino' ? 'Femenino' : 'Masculino'}</Caption>
            <Switch
              value={sex === 'femenino'}
              onValueChange={checked =>
                setSex(checked ? 'femenino' : 'masculino')
              }
            />
          </View>

          <TextInput
            label="Fecha de nacimiento"
            value={birthdate}
            onChangeText={bd => setBirthdate(bd)}
            mode="outlined"
            placeholder="día-mes-año"
            error={validateBirthdate() === false}
            style={{marginTop: 10}}
            keyboardType={'numeric'}
          />
          <HelperText type="error" visible={validateBirthdate() === false}>
            {validateBirthdate() === false && 'Fecha incorrecta'}
          </HelperText>

          <Button
            icon="account-plus"
            mode="contained"
            onPress={sendForm}
            style={{
              width: '60%',
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 20,
            }}
            disabled={!validateForm()}>
            Crear
          </Button>
        </ScrollView>

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
    </View>
  );
};

export default NewExpedient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
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
});

/*
<View style={[styles.row, {marginTop: 10}]}>
            <Caption>Fecha de nacimiento: </Caption>
            <Button
              icon="calendar-range"
              onPress={() => setShowDatePicker(true)}>
              {birthdate.getDate() +
                '/' +
                (birthdate.getMonth() + 1) +
                '/' +
                birthdate.getFullYear()}
            </Button>
            {showDatePicker && (
              <DateTimePicker
                value={birthdate}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChangeDate}
                minimumDate={minDate}
                maximumDate={maxDate}
              />
            )}
          </View>

*/
