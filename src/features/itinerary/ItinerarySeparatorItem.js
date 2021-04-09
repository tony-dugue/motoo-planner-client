import React from 'react';

export function ItinerarySeparatorItem({ distance }) {
  return (
       <li className="distance"><span className="distance-icon">|</span>{distance} km</li>
  );
}
