import styled from 'styled-components';
import ReactSelect from 'react-select';
import { FiSearch } from 'react-icons/fi';

export const ExploreContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 900px) {
    /* display: flex;
    align-items: center; */
  }
`;
export const SearchAndFilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 40px 20px 20px 40px;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    margin: 20px 55px;
  }
`;
export const SearchWrapper = styled.div`
  display: flex;
  width: 30rem;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  background: ${(props) => props.theme.bgOne};
  border: 1px solid ${(props) => props.theme.borders};
  border-radius: 5px;
  @media (max-width: 900px) {
    width: 100%;
    margin: 20px 0;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  border: 0;
  outline: 0;
  background: none;
  color: ${(props) => props.theme.textHeader};
  ::placeholder {
    color: ${(props) => props.theme.borders};
  }
`;

export const SearchIcon = styled(FiSearch)`
  color: ${(props) => props.theme.borders};
  margin-right: 5px;
  font-size: 18px;
`;
export const MarketItemsWrapper = styled.div`
  @media (max-width: 900px) {
    /* display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap; */
  }
`;

export const StyledReactSelect = styled(ReactSelect)`
  .Select__control {
    background: ${(props) => props.theme.bgOne};
    border: 1px solid ${(props) => props.theme.borders};
    color: ${(props) => props.theme.textHeader};
    margin-left: 20px;
    padding: 0 10px;
    width: 15rem;
    :hover {
      border: solid 1px rgba(47, 137, 252, 1);
      box-shadow: 0 0 0 4px rgba(47, 137, 252, 0.3);
    }
    @media (max-width: 900px) {
      width: 100%;
      margin: 0 auto;
    }
  }

  .Select__indicator-separator {
    display: none;
  }
  .Select__dropdown-indicator {
    color: inherit;
    :hover {
      color: inherit;
    }
  }
  .Select__control--menu-is-open {
    .Select__dropdown-indicator {
      transition: all 0.3s ease;
      content: 's';
      transform: rotate(180deg);
    }
  }
  .Select__single-value {
    content: 'something';
    color: ${(props) => props.theme.textHeader};
  }
  .Select__menu {
    border-radius: 3px;
    background: ${(props) => props.theme.bgOne};
    width: 100%;
    padding: 10px;
    color: ${(props) => props.theme.textHeader};
  }
  .Select__menu-list {
    padding: 0;
  }
  .Select__option {
    border-radius: 3px;
    color: ${(props) => props.theme.textHeader};
    margin: 10px 0;
  }
  .Select__option--is-focused {
    background: ${(props) => props.theme.bgTwo};
  }
  .Select__option--is-selected {
    background: ${(props) => props.theme.primary};
  }
`;
