/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useEffect, useContext, useReducer} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const PreferencesStateContext = createContext();
const PreferencesDispatchContext = createContext();

const preferencesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark',
      };

    case 'SET_EXPEDIENTS':
      const newExp = action.payload.sort((a, b) =>
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
      );
      return {
        ...state,
        expedients: newExp,
      };

    case 'ADD_KB':
      return {
        ...state,
        kbs: [...state.kbs, action.payload],
      };

    case 'SET_SNACK_MESSAGE':
      return {
        ...state,
        snackMessage: action.payload,
      };

    default:
      return state;
  }
};

export const PreferencesProvider = ({children}) => {
  const initialState = {
    theme: 'light',
    expedients: [],
    kbs: [],
    snackMessage: '',
  };
  const [state, dispatch] = useReducer(preferencesReducer, initialState);

  useEffect(() => {
    getPreferences();
  }, []);

  const getPreferences = async () => {
    const theme = await getItem('@theme');

    dispatch({type: 'SET_THEME', payload: theme || 'light'});
  };

  const getItem = async item => {
    let it = '';
    try {
      it = await AsyncStorage.getItem(item);

      if (it === null) {
        it = '';
      }
    } catch (error) {
      it = '';
    }
    return it;
  };

  return (
    <PreferencesDispatchContext.Provider value={dispatch}>
      <PreferencesStateContext.Provider value={state}>
        {children}
      </PreferencesStateContext.Provider>
    </PreferencesDispatchContext.Provider>
  );
};

export const usePreferencesState = () => useContext(PreferencesStateContext);
export const usePreferencesDispatch = () =>
  useContext(PreferencesDispatchContext);
