import React from 'react';
import './Style/Loadnig.css'

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ 
  message = 'Loading', 
  fullScreen = false
}) => {
  // Split message into characters for animation
  const characters = message.split('');

  return (
    <div className={`loading-container ${fullScreen ? 'loading-fullscreen' : ''}`}>
      <div className="text-animation">
        {characters.map((char, index) => (
          <span 
            key={index} 
            className="animated-char"
            style={{
              animationDelay: `${index * 0.08}s`
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
      
      <div className="cricket-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>

      <div className="cricket-info">
        <span className="ball-icon">🏏</span>
        <span className="loading-subtext">CricIt</span>
        <span className="ball-icon">🏏</span>
      </div>
    </div>
  );
};

export default Loading;