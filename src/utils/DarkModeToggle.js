import React from 'react';
import useDarkMode from 'use-dark-mode';


const DarkModeToggle = () => {

  const darkMode = useDarkMode(true);

  return (
    <div className="dark-mode-toggle">
      {darkMode.value ? <button type="button" onClick={darkMode.disable} className="txt-light">
        <span className="sr-only">change to</span> light <span className="desktop-only">mode</span> <span className="sun" />
      </button> 
      :
      <button type="button" onClick={darkMode.enable}>
        <span className="sr-only">change to</span> dark <span className="desktop-only">mode</span> <span className="moon" />
      </button>}
    </div>
  );
};

export default DarkModeToggle;