import { MoonIcon, SunIcon } from './Toggle.style';

const Toggle = ({ theme, toggleTheme }) => {
  return (
    <div onClick={toggleTheme}>
      {theme === 'light' ? <MoonIcon size={24} /> : <SunIcon size={24} />}
    </div>
  );
};

export default Toggle;
