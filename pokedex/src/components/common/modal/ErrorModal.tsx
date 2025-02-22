import React from 'react';
import { useError } from '../../../context/ErrorContext';
import Button from '../Button';

const ErrorModal: React.FC = () => {
  const { error, clearError } = useError();

  if (!error) return null;

  return (
    <div className='bg-greyColor bg-opacity-50 fixed w-full h-full z-30 flex items-center justify-center top-0 left-0'>
      <div className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] right-0 bottom-0 p-4 text-center flex flex-col items-center bg-white h-fit w-3/4 z-50 rounded-[40px] shadow-lg'>
        <h2 className='mb-6'>Error</h2>
        <p className='mb-4'>{error}</p>
        <Button id='close-error-modal_button' className='mb-2' onClick={clearError}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default ErrorModal;