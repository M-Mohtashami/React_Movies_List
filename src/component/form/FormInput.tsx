// import { useState } from 'react';
import { InputType } from './../../interfaces/interfaces';
type Props = {
  label?: string;
  state: InputType;
  type: string;
  placeholder: string;
  onChange: (value: string) => void;
};
const FormInput = ({ label, state, placeholder, type, onChange }: Props) => {
  // const [isRequired, setIsRequired] = useState(false);
  return (
    <div className="w-full lg:max-w-sm space-y-2 text-gray-200">
      {label && (
        <label className="border-r-[0.4rem] border-yellow-500 rounded-sm pr-2 ">
          {label}
        </label>
      )}
      <input
        type={type}
        value={state.value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={
          'bg-[#515050] w-full px-4 py-1 border border-gray-400 rounded-md focus:outline-none  focus:bg-yellow-300 focus:bg-opacity-20 focus:border-yellow-400'
        }
      />
      <p>{state.error}</p>
    </div>
  );
};

export default FormInput;
