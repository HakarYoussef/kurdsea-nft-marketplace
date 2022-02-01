import React from 'react';
import {
  SucceedCardContainer,
  SucceedCardWrapper,
} from '../styles/SucceedCard.style';

const SucceedCard = () => {
  return (
    <SucceedCardContainer>
      <SucceedCardWrapper>
        <img src="/SucceedIcon.svg" alt="" />
        <h4>Succeed!</h4>
      </SucceedCardWrapper>
    </SucceedCardContainer>
  );
};

export default SucceedCard;
