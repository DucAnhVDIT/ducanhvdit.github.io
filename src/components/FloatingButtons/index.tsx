// FloatingActionButtons.jsx

import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import './styles.css'

// interface FloatingActionButtonsProps {
//   onClose: () => void;
// }

const FloatingActionButtons = () => {
  

  return (
    <div className="float-button-container">
      <animated.div  className="float-button">
        <animated.button  className="action-button add">
          <FaPlus />
        </animated.button>
        <animated.button  className="action-button edit">
          <FaEdit />
        </animated.button>
        <animated.button  className="action-button delete">
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
