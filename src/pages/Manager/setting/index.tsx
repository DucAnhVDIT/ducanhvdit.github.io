import React, { useEffect } from 'react'

function SettingsPage() {
  useEffect(() => {
    document.body.style.backgroundColor = 'white';
    return () => {
      document.body.style.backgroundColor = ''; // Reset background color when component unmounts
    };
  }, []);
  return (
    <div className='h-full'>
        Setings
    </div>
  )
}

export default SettingsPage