import React from 'react';
import Lottie from 'react-lottie'
import animationData from './CheckAnimation.json'; 

const LottieAnimation: React.FC = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} height={400} width={400} />;
};

export default LottieAnimation;
