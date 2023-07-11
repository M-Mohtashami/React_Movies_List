import { InputType } from '../../interfaces/interfaces';

type Props = {
  label?: string;
  options: string[];
  state: InputType;
  onChange: (value: string) => void;
};
const FormSelect = ({ label, options, state, onChange }: Props) => {
  return (
    <div className="w-full lg:max-w-sm flex flex-col gap-2 text-gray-200 bg-opacity-0">
      {label && (
        <label
          className="border-r-[0.4rem] border-yellow-500 rounded-sm pr-2 "
          htmlFor="select_box"
        >
          {label}
        </label>
      )}
      <select
        className="w-full py-1 px-2 rounded-md bg-[#515050] border border-gray-400 focus:outline-none focus:bg-yellow-300 focus:bg-opacity-20 focus:border-yellow-400"
        value={state.value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option className="text-gray-500" value={'همه'}>
          {' ژانر فیلم'}
        </option>
        {options.map((option, index) => {
          return (
            <option className="text-gray-500" key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
