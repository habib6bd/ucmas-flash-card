import React from 'react';

const NumberModal = ({ number, onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl text-center font-bold mb-4">{number}</h2>
          <button
            className="button block mx-auto"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default NumberModal;
  