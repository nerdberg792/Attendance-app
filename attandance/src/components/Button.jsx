import React from 'react';

const Button = ({ children, onClick, className }) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
