import React, { useState } from 'react';
import './Menu.css';
import StoryViewer from './StoryViewer';

function Menu() {
  const [currentMenu, setCurrentMenu] = useState('main');
  const [currentStory, setCurrentStory] = useState(null);

  const handleStoriesClick = (e) => {
    e.preventDefault();
    setCurrentMenu('stories');
  };

  const handleBackClick = () => {
    if (currentStory) {
      setCurrentStory(null);
    } else {
      setCurrentMenu('main');
    }
  };

  const handleStoryClick = (e, storyId) => {
    e.preventDefault();
    setCurrentStory(storyId);
  };

  if (currentStory === 'coniglino') {
    return <StoryViewer onBack={handleBackClick} />;
  }

  if (currentMenu === 'main') {
    return (
      <nav className="menu">
        <ul className="menu-list">
          <li className="menu-item">
            <a href="/games">Games (Coming Soon)</a>
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
            <a href="/stories/coniglino" onClick={(e) => handleStoryClick(e, 'coniglino')}>
              Coniglino bim bim
            </a>
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
