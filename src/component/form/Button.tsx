import React from 'react';

type variantType = {
  contained: string;
  outlined: string;
};
type Key = keyof variantType;

type Props = {
  text: string;
  type: 'button' | 'submit' | 'reset';
  variant: Key;
  onClick?: () => void;
};

const variants = {
  contained: 'w-24 bg-yellow-500 p-2 text-gray-600 rounded-md font-semibold',
  outlined:
    'w-24 bg-opacity-0 p-2 text-gray-300 border border-gray-300 rounded-md font-semibold',
};
const Button = ({ text, type, variant = 'contained', onClick }: Props) => {
  return (
    <div>
      <button
        type={type}
        className={variants[variant]}
        onClick={() => onClick && onClick()}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
