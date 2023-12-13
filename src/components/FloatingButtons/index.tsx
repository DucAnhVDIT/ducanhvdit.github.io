// FloatingActionButtons.jsx

import React from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import './styles.css';

interface FloatingActionButtonsProps {
  onPlusClick: () => void;
  position: { x: number; y: number }; // New prop for position
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({ onPlusClick, position }) => {
    const offsetX = 59;
    const offsetY = -59;
    
    
    console.log('Floating button group position:', position);
    const springProps = useSpring({
        zIndex: 1000,
        opacity: 1,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        from: { opacity: 0, transform: `translate3d(0,0, 0)` },
      });
      
    
      const containerStyle = {
        position: 'absolute',
        left: `${position.x + offsetX}px`,
        top: `${position.y + offsetY}px`,
      };

  return (
    <animated.div style={{ ...containerStyle, ...springProps }} className="float-button-container">
      <animated.div className="float-button">
        <animated.button className="action-button add bg-primary" onClick={onPlusClick}>
          <FaPlus />
        </animated.button>
        <animated.button className="action-button bg-primary edit">
          <FaEdit />
        </animated.button>
        <animated.button className="action-button bg-primary delete">
          <FaTrash />
        </animated.button>
      </animated.div>
    </animated.div>
  );
};

export default FloatingActionButtons;
