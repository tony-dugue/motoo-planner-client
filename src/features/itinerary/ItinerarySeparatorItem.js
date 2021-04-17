import React from 'react';

export function ItinerarySeparatorItem({ diffTime}) {
  return (
      <li className="itinerary__step-item">
        <div className="itinerary__step-item-icon">
          <span className="distance-icon">|</span>
        </div>

        <div className="itinerary__step-item-content-distance">
          {diffTime} heures
        </div>
      </li>
  );
}
