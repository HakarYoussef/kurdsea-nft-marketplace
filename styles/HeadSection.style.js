import styled from 'styled-components';

export const HeaderContainer = styled.div`
  width: 100%;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 40px;
  @media (max-width: 840px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const TitleStyle = styled.div`
  flex: 1;

  h1 {
    font-family: 'Oleo Script', cursive;
    font-size: 36px;
    font-weight: 700;
    color: ${(props) => props.theme.textHeader};
    justify-content: start;
    @media (max-width: 840px) {
      text-align: center;
    }
  }
  p {
    margin-top: 20px;
    margin-bottom: 40px;
    color: ${(props) => props.theme.textParagraph};
    font-size: 18px;
    @media (max-width: 840px) {
      text-align: center;
    }
  }
`;

export const BtnStyledLink = styled.a`
  margin-bottom: 20px;
  justify-content: center;
  width: 10rem;
  color: #fff;
  background-color: ${(props) => props.theme.btn};
  padding: 12px 60px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 80ms ease;
  &:hover {
    background-color: ${(props) => props.theme.btnH};
  }
  @media (max-width: 840px) {
    display: flex;
    width: 100%;
  }
`;

export const ImageContainer = styled.div`
  width: 320px;
  height: 400px;

  img {
    border-radius: 25px;
    width: 320px;
    height: 400px;
    box-shadow: 10px 15px 80px -10px rgba(207, 119, 243, 0.1),
      -20px 20px 50px -10px rgba(0, 155, 255, 0.1),
      0px 20px 60px -10px rgba(42, 201, 219, 0.1);
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  @media (max-width: 840px) {
    width: 100%;
    height: 320px;
  }
`;
