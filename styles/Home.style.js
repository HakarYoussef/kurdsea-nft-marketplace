import styled from 'styled-components';

export const HomeWrapper = styled.div`
  display: inline-block;
  width: 100%;
  overflow-x: hidden;

  @media (max-width: 900px) {
    /* display: flex;
    align-items: center; */
  }
`;

export const LatestItemsWrapper = styled.div`
  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`;

export const LatestTitle = styled.div`
  text-align: center;
  color: ${(props) => props.theme.textHeader};
  margin: 40px 40px 20px 40px;

  @media (max-width: 900px) {
  }
`;
