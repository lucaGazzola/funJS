import React, {useState} from 'react';
import './StoryViewer.css';
import bim1 from '../images/story/bim1.png';
import bim2 from '../images/story/bim2.png';
import bim3 from '../images/story/bim3.png';
import bim4 from '../images/story/bim4.png';
import bim5 from '../images/story/bim5.png';
import bim6 from '../images/story/bim6.png';
import bim7 from '../images/story/bim7.png';

function StoryViewer({onBack}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const storyImages = [
    bim1,
    bim2,
    bim3,
    bim4,
    bim5,
    bim6,
    bim7
  ];

  const handleNextImage = () => {
    if (currentImageIndex < storyImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
      <div className="story-viewer">
        <div className="story-container">
          <img
              src={storyImages[currentImageIndex]}
              alt={`Story page ${currentImageIndex + 1}`}
              className="story-image"
          />

          {currentImageIndex > 0 && (
              <button
                  className="nav-button prev-button"
                  onClick={handlePrevImage}
              >
                &#8592;
              </button>
          )}

          {currentImageIndex < storyImages.length - 1 && (
              <button
                  className="nav-button next-button"
                  onClick={handleNextImage}
              >
                &#8594;
              </button>
          )}
        </div>

        <button onClick={onBack} className="back-button story-back-button">
          Back to Stories
        </button>
      </div>
  );
}

export default StoryViewer;
