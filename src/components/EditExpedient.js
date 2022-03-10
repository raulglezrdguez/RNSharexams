/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';

import {
  usePreferencesState,
  usePreferencesDispatch,
} from '../context/preferences';
import {saveExpedients} from '../utils/fs';

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
    if (currentExpedient) {
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

  const updExpedient = async expedient => {
    let newExps = [...expedients];
    const index = newExps.findIndex(e => e.id === expedient.id);
    if (index !== -1) {
      newExps.splice(index, 1);
      newExps = [...newExps, expedient];

      dispatch({type: 'SET_EXPEDIENTS', payload: newExps});
      const result = await saveExpedients(newExps);
      dispatch({
        type: 'SET_SNACK_MESSAGE',
        payload: result
          ? 'Datos modificados correctamente.'
          : 'Error al modificar los datos.',
      });
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
