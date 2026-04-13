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


  return (
    <div className={`loading-container ${fullScreen ? 'loading-fullscreen' : ''}`}>
      
      

      <div className="cricket-info">
        <span className="loading-subtext">CricIt</span>
        <span className="ball-icon">🏏</span>
      </div>

      <div className="cricket-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default Loading;