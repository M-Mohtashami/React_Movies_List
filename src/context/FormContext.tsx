import { createContext, ReactNode, useReducer, Reducer } from 'react';
import { ActionType, ContextType } from '../interfaces/interfaces';
import { StateType } from './../interfaces/interfaces';

export const initState: StateType = {
  name: {
    value: '',
    error: '',
  },
  desc: {
    value: '',
    error: '',
  },
  genre: {
    value: '',
    error: '',
  },
  director: {
    value: '',
    error: '',
  },
  year: {
    value: '',
    error: '',
  },
  submit: 'ذخیره',
  isSubmited: false,
  targetId: '',
};

const initContext: ContextType = {
  state: initState,
  dispatch: () => {
    console.log('');
  },
};

export const reducer = function (state: StateType, action: ActionType) {
  switch (action.type) {
    case 'Field_is_Required':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case 'Reset_Form_State':
      return initState;
    case 'Render_Ui':
      console.log(action.payload);
      return {
        ...initState,
        isSubmited: action.payload,
      };
    case 'Fetch_Data_To_Form':
      return action.payload;
    default:
      return state;
  }
};

export const MovieFormContext = createContext<ContextType>(initContext);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initState, undefined);
  return (
    <MovieFormContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieFormContext.Provider>
  );
};
