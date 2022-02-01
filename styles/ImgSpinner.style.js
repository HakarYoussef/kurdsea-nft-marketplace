import styled from 'styled-components';

export const SpinnerWrapper = styled.div`
  width: 100px;
  background-color: none;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  z-index: 100;
`;

export const Spinner = styled.div`
  width: 200px;
  text-align: center;

  @-webkit-keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
`;

export const BounceOne = styled.div`
  width: 18px;
  height: 18px;
  background-color: ${(props) => props.theme.btn};

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.2s infinite ease-in-out both;
  animation: sk-bouncedelay 1.2s infinite ease-in-out both;
`;
