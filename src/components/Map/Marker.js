import React from 'react';
import './map.scss';

const Marker = (fest) => {
  return (
    <div className="maker">
      <div
        className="pin bounce"
        style={{ cursor: 'pointer' }}
      />
      <img
        alt={fest.name}
        src="https://cdn.discordapp.com/attachments/120955568063119361/626058127329984522/small_horns.png"
        className="pin bounce image"
        title={fest.name}
      />
      <div className="pulse" />
    </div>
  );
};

export default Marker;
