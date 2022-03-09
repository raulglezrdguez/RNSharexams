/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  Caption,
  HelperText,
  IconButton,
  Subheading,
  Switch,
  TextInput,
  useTheme,
} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

import {usePreferencesDispatch} from '../context/preferences';

import provincesList from '../data/provinces';
import municipalitiesList from '../data/municipalities';

import {validateBirthdate} from '../utils/date';

const WorkExpedient = ({initialData, cancelFn, saveFn}) => {
  const {colors} = useTheme();
  const dispatch = usePreferencesDispatch();

  const [showProvinceList, setShowProvinceList] = useState(false);
  const [province, setProvince] = useState(initialData.province); // provincia
  const [showMunicipalityList, setShowMunicipalityList] = useState(false);
  const [municipality, setMunicipality] = useState(initialData.municipality); // municipio

  const [cp, setCP] = useState(initialData.cp); // consejo popular
  const [clinic, setClinic] = useState(initialData.clinic); // consultorio medico
  const [identifier, setIdentifier] = useState(initialData.identifier);
  const [name, setName] = useState(initialData.name);
  const [birthdate, setBirthdate] = useState(initialData.birthdate);
  const [sex, setSex] = useState(initialData.sex);

  useEffect(() => {
    if (initialData) {
      setProvince(initialData.province); // provincia
      setMunicipality(initialData.municipality); // municipio
      setCP(initialData.cp); // consejo popular
      setClinic(initialData.clinic); // consultorio medico
      setIdentifier(initialData.identifier);
      setName(initialData.name);
      setBirthdate(initialData.birthdate);
      setSex(initialData.sex);
    }
  }, [initialData]);

  const validateForm = () => {
    if (validateBirthdate(birthdate) === false) {
      return false;
    }
    return (
      cp.trim().length > 0 &&
      clinic.trim().length > 0 &&
      identifier.trim().length === 11 &&
      name.trim().length > 6 &&
      sex.trim().length > 7
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
      const data = {
        province,
        municipality,
        cp,
        clinic,
        identifier,
        name,
        sex,
        birthdate,
      };
      saveFn(data);
    } else {
      dispatch({
        type: 'SET_SNACK_MESSAGE',
        payload: 'Introduzca correctamente los datos del expediente.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Subheading>
          {initialData.identifier === '' ? 'Creando' : name}
        </Subheading>
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
            error={identifier.length !== 11}
            style={{marginTop: 10}}
            keyboardType={'number-pad'}
          />
          <HelperText type="error" visible={identifier.length !== 11}>
            {identifier.length !== 11 && 'Identificador incorrecto'}
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
            {cancelFn && (
              <IconButton
                icon="close"
                color={colors.error}
                size={48}
                onPress={() => cancelFn(null)}
              />
            )}

            <IconButton
              icon="content-save"
              size={48}
              color={colors.primary}
              onPress={sendForm}
              disabled={!validateForm()}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default WorkExpedient;

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
    marginTop: 10,
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
