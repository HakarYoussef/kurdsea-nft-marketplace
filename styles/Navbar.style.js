import styled from 'styled-components';
import { RiMenu4Fill, RiCloseFill } from 'react-icons/ri';

export const MenuOpenIcon = styled(RiMenu4Fill)`
  color: ${(props) => props.theme.textHeader};
`;
export const MenuCloseIcon = styled(RiCloseFill)`
  color: ${(props) => props.theme.textHeader};
`;

export const NavBarContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: ${(props) => (props.extendNavbar ? '100vh' : '80px')};
  padding: 0 40px;
  background-color: ${(props) => props.theme.bgTwo};
  /* position: absolute; */
  z-index: 1;

  @media (min-width: 900px) {
    height: 80px;
  }
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
`;

export const LogoWrapper = styled.div`
  flex: 1;
  a {
    font-family: 'Oleo Script', cursive;
  }
  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
  }
`;

export const NavBarItems = styled.div``;

export const LogoStyledLink = styled.a`
  font-size: 28px;
  font-weight: 700;
  color: ${(props) => props.theme.textHeader};
  cursor: pointer;
`;

export const StyledLink = styled.a`
  color: ${(props) => props.theme.textHeader};
  text-decoration: none;
  margin: 0 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 5px;
  padding: 8px 16px;
  transition: all 80ms ease;
  @media (max-width: 900px) {
    display: none;
  }

  &:hover {
    color: ${(props) => props.theme.btn};
    background-color: ${(props) => props.theme.bgThree};
  }
`;

export const ExtendStyledLink = styled.div`
  color: ${(props) => props.theme.textHeader};
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 8px 75px;
  font-size: 16px;
  font-weight: 500;
  margin: 10px 0;
  transition: all 80ms ease;
  @media (min-width: 900px) {
    display: none;
  }

  &:hover {
    color: ${(props) => props.theme.btn};
    background-color: ${(props) => props.theme.bgThree};
  }
`;

export const ToggleStyle = styled.div`
  border-radius: 5px;
  padding: 8px 10px;
  transition: all 80ms ease;
  cursor: pointer;
  margin-left: 20px;

  &:hover {
    background-color: ${(props) => props.theme.bgThree};
  }
`;

export const OpenLinkButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  font-size: 45px;
  cursor: pointer;

  @media (min-width: 900px) {
    display: none;
  }
`;

export const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;

  @media (min-width: 900px) {
    display: none;
  }
`;

export const ConnectBtn = styled.div`
  color: #fff;
  background-color: ${(props) => props.theme.btn};
  padding: 12px 40px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 80ms ease;
  &:hover {
    background-color: ${(props) => props.theme.btnH};
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

export const ExtendConnectBtn = styled.div`
  margin-top: 20px;
  color: #fff;
  background-color: ${(props) => props.theme.btn};
  padding: 12px 40px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 80ms ease;
  &:hover {
    background-color: ${(props) => props.theme.btnH};
  }
  @media (min-width: 900px) {
    display: none;
  }
`;

export const AddressStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${(props) => props.theme.btn};
  background-color: ${(props) => props.theme.bgThree};
  padding: 10px 10px 10px 0px;

  border-radius: 5px;
  cursor: pointer;

  p {
    margin: 0 10px;
    padding: 3px 15px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.bgTwo};
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const ExtendAddressStyle = styled.div`
  color: ${(props) => props.theme.btn};
  margin-top: 20px;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.bgThree};
  padding: 10px 10px 10px 0;
  border-radius: 5px;
  cursor: pointer;
  p {
    margin: 0 10px;
    padding: 3px 15px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.bgTwo};
  }

  @media (min-width: 900px) {
    display: none;
  }
`;

export const WrongNetworkBtn = styled.div`
  color: #fff;
  background-color: rgba(223, 137, 49, 1);
  padding: 12px 40px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 80ms ease;
  @media (max-width: 900px) {
    display: none;
  }
`;

export const NotInstalletWarningContainer = styled.div`
  color: #fff;
  background-color: rgba(223, 137, 49, 1);
  padding: 12px 40px;
  cursor: pointer;
  @media (max-width: 900px) {
    text-align: center;
  }
`;

export const ExtendWrongNetworkBtn = styled.div`
  color: #fff;
  background-color: rgba(223, 137, 49, 1);
  padding: 12px 40px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 80ms ease;
  cursor: pointer;
  @media (min-width: 900px) {
    display: none;
  }
`;
