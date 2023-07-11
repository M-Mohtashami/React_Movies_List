import { InputType } from '../../interfaces/interfaces';

type Props = {
  label: string;
  state: InputType;
  onChange: (value: string) => void;
  placeholder: string;
};
const FormTextarea = ({ label, state, placeholder, onChange }: Props) => {
  return (
    <div className="w-full flex flex-col gap-2 text-gray-200">
      <label className="border-r-[0.4rem] border-yellow-500 rounded-sm pr-2 ">
        {label}
      </label>
      <textarea
        className="bg-[#515050] border border-gray-400 rounded-md p-2 w-full focus:outline-none  focus:bg-yellow-300 focus:bg-opacity-20 focus:border-yellow-400"
        rows={3}
        value={state.value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormTextarea;
