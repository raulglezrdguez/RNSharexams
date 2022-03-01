/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  Caption,
  HelperText,
  IconButton,
  Snackbar,
  Subheading,
  Switch,
  TextInput,
  useTheme,
} from 'react-native-paper';
import RNFS from 'react-native-fs';
import DropDown from 'react-native-paper-dropdown';

import {
  usePreferencesState,
  usePreferencesDispatch,
} from '../context/preferences';

import provincesList from '../data/provinces';
import municipalitiesList from '../data/municipalities';

import {validateBirthdate} from '../utils/date';

const EditExpedient = ({expedientId, setId2Edit}) => {
  const {colors} = useTheme();
  const {expedients} = usePreferencesState();
  const dispatch = usePreferencesDispatch();

  const [cp, setCP] = useState(''); // consejo popular
  const [clinic, setClinic] = useState(''); // consultorio medico
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState(new Date(1950, 0, 1));
  const [sex, setSex] = useState('femenino');
  const [identifier, setIdentifier] = useState('');

  const [showProvinceList, setShowProvinceList] = useState(false);
  const [province, setProvince] = useState('25'); // provincia
  const [showMunicipalityList, setShowMunicipalityList] = useState(false);
  const [municipality, setMunicipality] = useState('01'); // municipio

  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const onDismissSnackBar = () => setSnackVisible(false);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    const currentExpedient = expedients.find(exp => exp.id === expedientId);
    if (currentExpedient) {
      setProvince(currentExpedient.province);
      setMunicipality(currentExpedient.municipality);
      setCP(currentExpedient.cp);
      setClinic(currentExpedient.clinic);
      setName(currentExpedient.name);
      setBirthdate(currentExpedient.birthdate);
      setSex(currentExpedient.sex);
      setIdentifier(currentExpedient.identifier);
    } else {
      setBirthdate(`${currentDay}-${currentMonth + 1}-${currentYear - 65}`);
    }
  }, [expedientId]);

  const saveExpedients = newExpedients => {
    let exp = JSON.stringify(newExpedients);
    let expedientsFile = RNFS.ExternalDirectoryPath + '/expedients.db';

    RNFS.writeFile(expedientsFile, exp, 'utf8')
      .then(success => {
        setSnackMessage('Datos modificados correctamente.');
        setSnackVisible(true);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const updExpedient = () => {
    let newExps = [...expedients];
    const index = newExps.findIndex(e => e.id === expedientId);
    if (index !== -1) {
      newExps.splice(index, 1);
      newExps = [
        ...newExps,
        {
          id: expedientId,
          name,
          birthdate,
          sex,
          identifier,
          province,
          municipality,
          cp,
          clinic,
        },
      ];

      dispatch({type: 'SET_EXPEDIENTS', payload: newExps});
      saveExpedients(newExps);

      setSnackMessage('Expediente modificado.');
      setSnackVisible(true);
    }
  };

  const validateForm = () => {
    return (
      name.trim().length > 6 &&
      sex.trim().length > 7 &&
      identifier.trim().length === 11 &&
      cp.trim().length > 0 &&
      clinic.trim().length > 0
    );
  };

  const changeProvince = newProvince => {
    setProvince(newProvince);
    setMunicipality('01');
  };

  const getMunicipalitiesList = () =>
    municipalitiesList
      .filter(m => m.prov === province)
      .map(m => ({label: m.label, value: m.mun}));

  const sendForm = () => {
    if (validateForm()) {
      updExpedient();
    } else {
      setSnackMessage('Introduzca correctamente los datos del expediente.');
      setSnackVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Subheading>{name}</Subheading>
        <ScrollView style={styles.scroll}>
          <DropDown
            label={'Provincia'}
            mode={'outlined'}
            visible={showProvinceList}
            showDropDown={() => setShowProvinceList(true)}
            onDismiss={() => setShowProvinceList(false)}
            value={province}
            setValue={newProvince => changeProvince(newProvince)}
            list={provincesList}
          />

          <DropDown
            label={'Municipio'}
            mode={'outlined'}
            visible={showMunicipalityList}
            showDropDown={() => setShowMunicipalityList(true)}
            onDismiss={() => setShowMunicipalityList(false)}
            value={municipality}
            setValue={setMunicipality}
            list={getMunicipalitiesList()}
          />

          <TextInput
            label="Consejo popular"
            value={cp}
            onChangeText={value => setCP(value)}
            mode="outlined"
            placeholder="Consejo popular"
            error={cp.trim().length === 0}
            style={{marginTop: 10}}
            autoCapitalize={'words'}
          />
          <HelperText type="error" visible={cp.trim().length === 0}>
            {cp.trim().length === 0 && 'Consejo popular incorrecto'}
          </HelperText>

          <TextInput
            label="Consultorio"
            value={clinic}
            onChangeText={value => setClinic(value)}
            mode="outlined"
            placeholder="Consultorio"
            error={clinic.trim().length === 0}
            style={{marginTop: 10}}
            keyboardType={'number-pad'}
          />
          <HelperText type="error" visible={clinic.trim().length === 0}>
            {clinic.trim().length === 0 && 'Consultorio incorrecto'}
          </HelperText>

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
            error={validateBirthdate(birthdate) === false}
            style={{marginTop: 10}}
            keyboardType={'numeric'}
          />
          <HelperText
            type="error"
            visible={validateBirthdate(birthdate) === false}>
            {validateBirthdate(birthdate) === false && 'Fecha incorrecta'}
          </HelperText>

          <View style={[styles.row_around, {marginTop: 10}]}>
            <IconButton
              icon="close"
              color={colors.error}
              onPress={() => setId2Edit(null)}
              disabled={!validateForm()}
            />
            <IconButton
              icon="content-save"
              color={colors.accent}
              onPress={sendForm}
              disabled={!validateForm()}
            />
          </View>
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

export default EditExpedient;

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
});
