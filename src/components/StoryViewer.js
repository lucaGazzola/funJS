import React, {useState, useEffect, useCallback, useRef} from 'react';
import './StoryViewer.css';
import { storyPages } from './storyResources';

function StoryViewer({onBack}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [storyText, setStoryText] = useState('');
  const audioRef = useRef(null);

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
