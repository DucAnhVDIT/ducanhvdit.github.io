// FloatingActionButtons.jsx

import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import './styles.css'

interface FloatingActionButtonsProps {
  onClose: () => void;
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({ onClose }) => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!isExpanded);
    onClose(); // Call the onClose prop to notify the parent component
  };

  const floatButtonSpring = useSpring({
    transform: isExpanded ? 'translateY(-120px)' : 'translateY(0px)',
  });

  const buttonSpring = useSpring({
    opacity: isExpanded ? 1 : 0,
    transform: isExpanded ? 'translateY(0px)' : 'translateY(20px)',
  });

  return (
    <div className="float-button-container">
      <animated.div style={floatButtonSpring} className="float-button">
        <animated.button style={buttonSpring} className="action-button add">
          <FaPlus />
        </animated.button>
        <animated.button style={buttonSpring} className="action-button edit">
          <FaEdit />
        </animated.button>
        <animated.button style={buttonSpring} className="action-button delete">
          <FaTrash />
        </animated.button>
      </animated.div>
      {/* <button onClick={toggleExpand} className="time-slot-button">
        Click to show buttons
      </button> */}
    </div>
  );
};

export default FloatingActionButtons;
