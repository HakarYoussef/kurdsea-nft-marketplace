import styled from 'styled-components';

export const SucceedCardContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const SucceedCardWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  background-color: ${(props) => props.theme.bgTwo};
  margin: 10px 40px;
  -webkit-animation: animateCard 5s ease forwards;
  animation: animateCard 5s ease forwards;

  padding: 10px;
  border-radius: 8px;
  img {
    width: 24px;
  }
  h4 {
    margin-left: 10px;
    color: ${(props) => props.theme.textHeader};
  }

  @keyframes animateCard {
    0% {
      transform: translateY(-10px);
      opacity: 0;
    }
    99% {
      transform: translateY(0px);
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
