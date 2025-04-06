import React, { useState } from 'react';
import './Menu.css';

function Menu() {
  const [currentMenu, setCurrentMenu] = useState('main');

  const handleStoriesClick = (e) => {
    e.preventDefault();
    setCurrentMenu('stories');
  };

  const handleBackClick = () => {
    setCurrentMenu('main');
  };

  if (currentMenu === 'main') {
    return (
      <nav className="menu">
        <ul className="menu-list">
          <li className="menu-item">
            <a href="/games">Games</a>
          </li>
          <li className="menu-item">
            <a href="/stories" onClick={handleStoriesClick}>Stories</a>
          </li>
        </ul>
      </nav>
    );
  } else if (currentMenu === 'stories') {
    return (
      <nav className="menu">
        <ul className="menu-list">
          <li className="menu-item">
            <a href="/stories/coniglino">Coniglino bim bim</a>
          </li>
          <li className="menu-item back-item">
            <button onClick={handleBackClick} className="back-button">Back</button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Menu;
