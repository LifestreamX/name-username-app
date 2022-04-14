import React from 'react';
import { MdDarkMode } from 'react-icons/md';
import { MdOutlineLightMode } from 'react-icons/md';

const DarkMode = ({ toggleTheme, theme }) => {
  // console.log(theme);

  return (
    <div className='theme-button'>
      {theme === 'light' ? (
        <MdDarkMode onClick={toggleTheme} />
      ) : (
        <MdOutlineLightMode
          style={{ color: 'white' }}
          onClick={toggleTheme}
        />
      )}
    </div>
  );
};

export default DarkMode;
