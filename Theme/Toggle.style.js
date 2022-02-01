import styled from 'styled-components';
import { FiMoon, FiSun } from 'react-icons/fi';

export const MoonIcon = styled(FiMoon)`
  color: ${(props) => props.theme.textHeader};
  transition: all 80ms ease;
  &:hover {
    color: ${(props) => props.theme.btn};
  }
`;

export const SunIcon = styled(FiSun)`
  color: ${(props) => props.theme.textHeader};
  transition: all 80ms ease;
  &:hover {
    color: ${(props) => props.theme.btn};
  }
`;
