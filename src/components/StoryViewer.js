import React, {useState, useEffect, useCallback, useRef} from 'react';
import './StoryViewer.css';
import bim1 from '../images/story/bim1.png';
import bim2 from '../images/story/bim2.png';
import bim3 from '../images/story/bim3.png';
import bim4 from '../images/story/bim4.png';
import bim5 from '../images/story/bim5.png';
import bim6 from '../images/story/bim6.png';
import bim7 from '../images/story/bim7.png';
import bim8 from '../images/story/bim8.png';
import bim9 from '../images/story/bim9.png';
import bim10 from '../images/story/bim10.png';
import bim11 from '../images/story/bim11.png';
import bim1Audio from '../recordings/bim1.mp3';
import bim2Audio from '../recordings/bim2.mp3';
import bim3Audio from '../recordings/bim3.mp3';
import bim4Audio from '../recordings/bim4.mp3';
import bim5Audio from '../recordings/bim5.mp3';
import bim6Audio from '../recordings/bim6.mp3';
import bim7Audio from '../recordings/bim7.mp3';
import bim8Audio from '../recordings/bim8.mp3';
import bim9Audio from '../recordings/bim9.mp3';
import bim10Audio from '../recordings/bim10.mp3';
import bim11Audio from '../recordings/bim11.mp3';
import bim1Text from '../text/bim1.txt';
import bim2Text from '../text/bim2.txt';
import bim3Text from '../text/bim3.txt';
import bim4Text from '../text/bim4.txt';
import bim5Text from '../text/bim5.txt';
import bim6Text from '../text/bim6.txt';
import bim7Text from '../text/bim7.txt';
import bim8Text from '../text/bim8.txt';
import bim9Text from '../text/bim9.txt';
import bim10Text from '../text/bim10.txt';
import bim11Text from '../text/bim11.txt';

function StoryViewer({onBack}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [storyText, setStoryText] = useState('');
  const audioRef = useRef(null);

  const storyPages = [
    { image: bim1, audio: bim1Audio, text: bim1Text, title: "Capitolo 1" },
    { image: bim2, audio: bim2Audio, text: bim2Text, title: "Capitolo 2" },
    { image: bim3, audio: bim3Audio, text: bim3Text, title: "Capitolo 3" },
    { image: bim4, audio: bim4Audio, text: bim4Text, title: "Capitolo 4" },
    { image: bim5, audio: bim5Audio, text: bim5Text, title: "Capitolo 5" },
    { image: bim6, audio: bim6Audio, text: bim6Text, title: "Capitolo 6" },
    { image: bim7, audio: bim7Audio, text: bim7Text, title: "Capitolo 7" },
    { image: bim8, audio: bim8Audio, text: bim8Text, title: "Capitolo 8" },
    { image: bim9, audio: bim9Audio, text: bim9Text, title: "Capitolo 9" },
    { image: bim10, audio: bim10Audio, text: bim10Text, title: "Capitolo 10" },
    { image: bim11, audio: bim11Audio, text: bim11Text, title: "Capitolo 11" }
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    fetch(storyPages[currentImageIndex].text)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch story text');
        }
        return response.text();
      })
      .then(text => setStoryText(text))
      .catch(error => {
        console.error('Error loading story text:', error);
        setStoryText('Story text could not be loaded.');
      });

    if (audioRef.current) {
      setIsAudioPlaying(true);
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
        setIsAudioPlaying(false);
      });
    }
  }, [currentImageIndex, storyPages]);

  const handleNextImage = useCallback(() => {
    if (currentImageIndex < storyPages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  }, [currentImageIndex, storyPages.length]);

  const handlePrevImage = useCallback(() => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  }, [currentImageIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        handleNextImage();
      } else if (event.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNextImage, handlePrevImage]);

  const handleAudioEnded = () => {
    setIsAudioPlaying(false);
  };

  return (
      <div className="story-viewer">
        <div className="story-container">
          <div className="story-content">
            <img
                src={storyPages[currentImageIndex].image}
                alt={`Story page ${currentImageIndex + 1}`}
                className="story-image"
            />
            
            <div className="story-text-box">
              <h3>{storyPages[currentImageIndex].title}</h3>
              <p>{storyText}</p>
            </div>
          </div>

          {currentImageIndex > 0 && (
              <button
                  className="nav-button prev-button"
                  onClick={handlePrevImage}
              >
                &#8592;
              </button>
          )}

          {currentImageIndex < storyPages.length - 1 && (
              <button
                  className="nav-button next-button"
                  onClick={handleNextImage}
              >
                &#8594;
              </button>
          )}

          {isAudioPlaying && (
            <div className="audio-playing-indicator">
              Audio Playing...
            </div>
          )}

          <audio 
            ref={audioRef} 
            src={storyPages[currentImageIndex].audio} 
            onEnded={handleAudioEnded} 
            style={{ display: 'none' }}
          />
        </div>

        <button onClick={onBack} className="back-button story-back-button">
          Back to Stories
        </button>
      </div>
  );
}

export default StoryViewer;
