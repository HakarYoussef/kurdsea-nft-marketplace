import styled, { keyframes } from 'styled-components';

export const SkeletonCardContainer = styled.div`
  display: inline-block;
  align-items: center;
  margin: 15px;
  border: 1px solid ${(props) => props.theme.borders};
  padding: 8px;
  border-radius: 5px;
  min-width: 320px;
  position: relative;
  overflow: hidden;
  @media (max-width: 760px) {
    /* width: 100%; */
    /* margin: 20px 55px; */
  }
`;

export const SkeletonImageCardWrapper = styled.div`
  width: 320px;
  height: 400px;
  background-color: ${(props) => props.theme.skeleton};
  border-radius: 5px;
  img {
    border-radius: 5px;
    height: 100%;
    width: 100%;
  }
  @media (max-width: 760px) {
    width: 100%;
  }
`;

export const SkeletonCardDetailsWrapper = styled.div``;

export const SkeletonCardTopDetail = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 10px 0;
`;

export const SkeletonTitleWrapper = styled.div`
  p {
    background-color: ${(props) => props.theme.skeleton};

    height: 20px;
    width: 60px;
    margin: 5px 0;
    border-radius: 5px;
    font-size: 14px;
  }
  h4 {
    height: 20px;
    width: 150px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.skeleton};
  }
`;

export const SkeletonPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  h4 {
    height: 20px;
    width: 90px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.skeleton};
  }

  p {
    color: ${(props) => props.theme.textParagraph};
    margin: 5px 0;
    font-size: 14px;
    height: 20px;
    width: 60px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.skeleton};
  }
`;

export const SkeletonCardBottomDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

export const SkeletonSellerWrapper = styled.div`
  h4 {
    height: 20px;
    width: 120px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.skeleton};
  }

  p {
    height: 20px;
    width: 60px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.skeleton};
    margin: 5px 0;
  }
`;

export const SkeletonOwnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  h4 {
    height: 20px;
    width: 120px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.skeleton};
  }

  p {
    height: 20px;
    width: 60px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.skeleton};
    margin: 5px 0;
  }
`;

export const slideInTop = keyframes`
  0% {
    
    transform: translateX(-150%);
  }
  50% {
    
    transform: translateX(-60%);
  }
  100% {
    
    transform: translateX(150%);
  }
 
`;

export const ShimmerWrapperStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: ${slideInTop} 2s ease-in-out infinite;
`;

export const ShimmerStyle = styled.div`
  width: 25%;
  height: 100%;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.skeletonGredient}
  );
  transform: skewX(0deg);
`;
