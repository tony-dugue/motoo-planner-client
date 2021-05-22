import React from 'react';

export function BikeAnimation({status}) {
  return (
      <div className={"bike " + status}>
          <div className="bike-container">
              <div className="bike-body">
                  <div className="seat"></div>
                  <div className="cover"></div>
                  <div className="lamp"></div>
                  <div className="motor">
                      <div className="part-1">
                          <div className="part-1-top"></div>
                          <div className="part-1-bottom"></div>
                      </div>
                      <div className="part-2">
                          <div className="part-2-base">
                              <div className="line"></div>
                              <div className="line"></div>
                              <div className="line"></div>
                              <div className="line"></div>
                          </div>
                      </div>
                  </div>
                  <div className="front"></div>
                  <div className="back"></div>
              </div>
              <div className="tire"></div>
              <div className="tire"></div>
              <div className="smoke"></div>
          </div>
      </div>
  );
}
