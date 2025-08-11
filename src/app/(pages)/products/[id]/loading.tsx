import React from 'react';
import Spinner from '../../../../components/Spinner';

export default function loading() {
  return (
    <div className="h-full flex justify-center items-center">
      <Spinner />
    </div>
  );
}
