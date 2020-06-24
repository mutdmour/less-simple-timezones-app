import React, { useEffect, useState } from 'react';
import { getCurrentTimezone } from '../../api';

const YourTimezone = () => {
  const [currentTZ, setCurrentTZ] = useState('...');

  useEffect(() => {
    getCurrentTimezone()
      .then((data) => {
        setCurrentTZ(data.timezone);
      })
      .catch(() => {
        setCurrentTZ('unknown <span role="img" aria-label="disappointed">😞</span>')
      });
  }, [setCurrentTZ]);

  return <div>
    <span>Hello <span role="img" aria-label="thumbs-up">👍</span>! Your timezone is {currentTZ}</span>
  </div>
};

export default YourTimezone;
