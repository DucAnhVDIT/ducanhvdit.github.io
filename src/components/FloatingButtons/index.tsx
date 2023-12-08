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
  const springProps = useSpring({
    zIndex: 1000,
    opacity: 1,
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    from: { opacity: 0, transform: 'translate3d(0, 0, 0)' },
  });

  return (
    <animated.div style={springProps} className="float-button-container">
      <animated.div className="float-button">
        <animated.button className="action-button add" onClick={onPlusClick}>
          <FaPlus />
        </animated.button>
        <animated.button className="action-button edit">
          <FaEdit />
        </animated.button>
        <animated.button className="action-button delete">
          <FaTrash />
        </animated.button>
      </animated.div>
    </animated.div>
  );
};

export default FloatingActionButtons;
