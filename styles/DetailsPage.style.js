import styled from 'styled-components';

export const DetailPageContainer = styled.div`
  display: flex;
  margin: 40px;

  justify-content: space-between;
  /* background-color: #fff; */
  p {
    margin-top: 20px;
    margin-bottom: 8px;
    color: ${(props) => props.theme.textParagraph};
    opacity: 0.6;
  }
  @media (max-width: 900px) {
    display: flex;
    flex-wrap: wrap;
  }
`;
export const DetailPageLeftSide = styled.div`
  width: 100%;
  margin-right: 40px;
  @media (max-width: 900px) {
  }
`;

export const DetailPageRightSide = styled.div`
  @media (max-width: 900px) {
  }
`;

export const ImageWrapper = styled.div`
  width: 800px;
  height: 600px;
  position: relative;
  box-shadow: 0px 15px 50px -10px rgba(207, 119, 243, 0.3),
    0px 30px 40px -20px rgba(0, 155, 255, 0.1),
    0px 45px 40px -30px rgba(42, 201, 219, 0.1);

  img {
    border-radius: 5px;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  @media (max-width: 900px) {
    width: 100%;
    height: 600px;
    margin-top: 40px;
  }
`;

export const Title = styled.h3`
  font-family: 'Oleo Script', cursive;
  font-size: 36px;
  text-transform: capitalize;
  color: ${(props) => props.theme.textHeader};
  @media (max-width: 900px) {
  }
`;

export const Description = styled.div`
  color: ${(props) => props.theme.textHeader};
  text-align: justify;
  text-justify: inter-word;
  font-weight: 300;
  @media (max-width: 900px) {
  }
`;

export const OwnerAndSellerContainer = styled.div`
  display: flex;

  @media (max-width: 900px) {
  }
`;

export const SellerWrapper = styled.div`
  color: ${(props) => props.theme.textHeader};
  margin-right: 40px;
  @media (max-width: 900px) {
  }
`;

export const Seller = styled.div`
  @media (max-width: 900px) {
  }
`;

export const OwnerWrapper = styled.div`
  color: ${(props) => props.theme.textHeader};
  @media (max-width: 900px) {
  }
`;

export const Owner = styled.div`
  @media (max-width: 900px) {
  }
`;

export const PriceWrapper = styled.div`
  color: ${(props) => props.theme.textHeader};
  margin-bottom: 20px;
  @media (max-width: 900px) {
  }
`;

export const Price = styled.div`
  @media (max-width: 900px) {
  }
`;

export const BtnWrapper = styled.div`
  /* width: 100%; */
  button {
    height: 45px;
    width: 100%;
    border: 0;
    border-radius: 5px;
    font-size: 16px;
    color: #fff;
    background-color: ${(props) => props.theme.btn};
    cursor: pointer;
    transition: all 80ms ease;

    & :hover {
      background-color: ${(props) => props.theme.btnH};
    }
  }
  @media (max-width: 900px) {
  }
`;
