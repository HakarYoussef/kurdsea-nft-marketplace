import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oleo+Script:wght@400;700&display=swap');
*{
    box-sizing: border-box;
    font-family: 'Source Sans Pro', sans-serif;
    margin: 0;
    font-smooth: inherit;
    
}
body{
    background-color: ${(props) => props.theme.bgOne};
    height: 100%;
    
}
body::-webkit-scrollbar {
  width: 0.6em;
  
}
 
body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 183, 190, 0.6);
  
}
 
body::-webkit-scrollbar-thumb {
  background-color: ${(props) => props.theme.btn};
  border-radius: 5px;
}
* {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: -moz-none;
    -o-user-select: none;
    user-select: none;
}
`;
