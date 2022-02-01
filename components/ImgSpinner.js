import React from 'react';
import { BounceOne, Spinner, SpinnerWrapper } from '../styles/ImgSpinner.style';

function ImgSpinner() {
  return (
    <SpinnerWrapper>
      <Spinner>
        <BounceOne />
      </Spinner>
    </SpinnerWrapper>
  );
}

export default ImgSpinner;
