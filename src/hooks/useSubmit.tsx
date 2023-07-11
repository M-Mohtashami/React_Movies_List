import { useContext } from 'react';
import { MovieFormContext } from '../context/FormContext';

export const useSubmit = () => {
  return useContext(MovieFormContext);
};
