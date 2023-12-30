import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="bg-blue-100 hover:bg-green-200 p-6 rounded-xl shadow-xl">
      {children}
    </div>
  );
};

export default Card;
