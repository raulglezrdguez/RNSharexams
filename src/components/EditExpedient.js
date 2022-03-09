/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';

import {
  usePreferencesState,
  usePreferencesDispatch,
} from '../context/preferences';

import WorkExpedient from './WorkExpedient';

const EditExpedient = ({expedientId, setId2Edit}) => {
  const {expedients} = usePreferencesState();
  const dispatch = usePreferencesDispatch();

  const [initialData, setInitialData] = useState({
    province: '25',
    municipality: '01',
    cp: '',
    clinic: '',
    identifier: '',
    name: '',
    sex: 'femenino',
    birthdate: '01-01-1950',
  });

  useEffect(() => {
    const currentExpedient = expedients.find(exp => exp.id === expedientId);
    console.log(expedients);
    if (currentExpedient) {
      console.log(currentExpedient);
      setInitialData({
        province: currentExpedient.province,
        municipality: currentExpedient.municipality,
        cp: currentExpedient.cp,
        clinic: currentExpedient.clinic,
        identifier: currentExpedient.identifier,
        name: currentExpedient.name,
        sex: currentExpedient.sex,
        birthdate: currentExpedient.birthdate,
      });
    }
  }, [expedientId]);

  const saveExpedients = newExpedients => {
    let exp = JSON.stringify(newExpedients);
    let expedientsFile = RNFS.ExternalDirectoryPath + '/expedients.db';

    RNFS.writeFile(expedientsFile, exp, 'utf8')
      .then(success => {
        dispatch({
          type: 'SET_SNACK_MESSAGE',
          payload: 'Datos modificados correctamente.',
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const updExpedient = expedient => {
    let newExps = [...expedients];
    const index = newExps.findIndex(e => e.id === expedient.id);
    if (index !== -1) {
      newExps.splice(index, 1);
      newExps = [...newExps, expedient];

      dispatch({type: 'SET_EXPEDIENTS', payload: newExps});
      saveExpedients(newExps);
    }
  };

  const sendForm = data => {
    const expedient = {
      ...data,
      id: expedientId,
    };
    updExpedient(expedient);
  };

  return (
    <WorkExpedient
      initialData={initialData}
      cancelFn={setId2Edit}
      saveFn={sendForm}
    />
  );
};

export default EditExpedient;
