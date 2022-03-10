import React, {useState, useEffect} from 'react';

import {
  usePreferencesState,
  usePreferencesDispatch,
} from '../context/preferences';
import {saveExpedients} from '../utils/fs';

import WorkExpedient from './WorkExpedient';

const NewExpedient = () => {
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
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    setInitialData({
      province: '25',
      municipality: '01',
      cp: '',
      clinic: '',
      identifier: '',
      name: '',
      sex: 'femenino',
      birthdate: `${currentDay}-${currentMonth + 1}-${currentYear - 65}`,
    });
  }, []);

  const addExpedient = async expedient => {
    const found = expedients.find(
      exp => exp.identifier === expedient.identifier || exp.id === expedient.id,
    );

    if (typeof found === 'undefined') {
      const newExpedients = [...expedients, expedient];
      dispatch({type: 'SET_EXPEDIENTS', payload: newExpedients});
      const result = await saveExpedients(newExpedients);
      dispatch({
        type: 'SET_SNACK_MESSAGE',
        payload: result
          ? 'Datos almacenados correctamente.'
          : 'Error al almacenar los datos.',
      });
    } else {
      dispatch({
        type: 'SET_SNACK_MESSAGE',
        payload: 'El expediente ya existe, inténtelo de nuevo.',
      });
    }
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

  const sendForm = data => {
    const id = guid();
    const expedient = {
      ...data,
      id,
    };

    addExpedient(expedient);
  };

  return (
    <WorkExpedient
      initialData={initialData}
      cancelFn={null}
      saveFn={sendForm}
    />
  );
};

export default NewExpedient;
