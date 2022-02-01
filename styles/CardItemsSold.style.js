import styled from 'styled-components';

export const SoldCardContainer = styled.div`
  display: inline-block;
  align-items: center;
  margin: 15px;
  border: 1px solid ${(props) => props.theme.borders};
  padding: 5px;
  border-radius: 5px;
  min-width: 320px;
  transition: all 200ms ease;

  & :hover {
    transform: scale(1.02) translateY(-5px);
    cursor: pointer;
  }
  @media (max-width: 760px) {
    /* width: 100%;
    margin: 20px 55px; */
  }
`;

export const SoldBadge = styled.div`
  background-color: #ff5959;
  padding: 5px 15px;
  border-radius: 5px;
  position: absolute;
  margin: 5px;
  font-size: 14px;
  color: #fff;
  font-weight: 700;
`;

export const SoldImageCardWrapper = styled.div`
  width: 320px;
  height: 400px;
  width: 320px;
  height: 400px;
  box-shadow: 0px 15px 40px -10px rgba(207, 119, 243, 0.3),
    0px 30px 30px -20px rgba(0, 155, 255, 0.1),
    0px 20px 20px -10px rgba(42, 201, 219, 0.1);
  img {
    border-radius: 5px;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  @media (max-width: 760px) {
    width: 100%;
  }
`;

export const SoldCardDetailsWrapper = styled.div``;

export const SoldCardTopDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

export const SoldTitleWrapper = styled.div`
  p {
    color: ${(props) => props.theme.textParagraph};
    opacity: 0.6;
    margin: 5px 0;
    font-size: 14px;
  }
  h4 {
    text-transform: capitalize;
    color: ${(props) => props.theme.textHeader};
  }
`;

export const SoldPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  h4 {
    color: ${(props) => props.theme.textHeader};
  }

  p {
    color: ${(props) => props.theme.textParagraph};
    opacity: 0.6;
    margin: 5px 0;
    font-size: 14px;
  }
`;

export const SoldCardBottomDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

export const SoldSellerWrapper = styled.div`
  h4 {
    color: ${(props) => props.theme.textHeader};
    text-decoration: underline;
    transition: all 80ms ease;

    & :hover {
      color: ${(props) => props.theme.btnH};
      cursor: pointer;
    }
  }

  p {
    color: ${(props) => props.theme.textParagraph};
    opacity: 0.6;
    margin: 5px 0;
    font-size: 14px;
  }
`;

export const SoldOwnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  h4 {
    color: ${(props) => props.theme.textHeader};
    text-decoration: underline;
    transition: all 80ms ease;

    & :hover {
      color: ${(props) => props.theme.btnH};
      cursor: pointer;
    }
  }

  p {
    color: ${(props) => props.theme.textParagraph};
    opacity: 0.6;
    margin: 5px 0;
    font-size: 14px;
  }
`;
