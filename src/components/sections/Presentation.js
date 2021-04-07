import React from 'react';
import placeholder from "../../assets/images/placeholder.png";

export function Presentation() {
  return (
      <div className="container">

          <div className="row presentation__row">
              <div className="col-md-8  order-md-2">
                  <h3 className="presentation__heading">Etape 1 :</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad corporis culpa
                      debitis dicta dolorem dolorum ex fugit harum itaque natus nemo nisi, nostrum
                      quae quod rerum saepe suscipit tenetur.</p>
              </div>
              <div className="col-md-4  order-md-1">
                  <img src={placeholder} alt="placeholder" className="presentation__img"/>
              </div>
          </div>

          <div className="row presentation__row">
              <div className="col-md-8">
                  <h3 className="presentation__heading">Etape 2 :</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad corporis culpa
                      debitis dicta dolorem dolorum ex fugit harum itaque natus nemo nisi, nostrum
                      quae quod rerum saepe suscipit tenetur.</p>
              </div>
              <div className="col-md-4">
                  <img src={placeholder} alt="placeholder" className="presentation__img"/>
              </div>
          </div>

          <div className="row presentation__row">
              <div className="col-md-8  order-md-2">
                  <h3 className="presentation__heading">Etape 3 :</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad corporis culpa
                      debitis dicta dolorem dolorum ex fugit harum itaque natus nemo nisi, nostrum
                      quae quod rerum saepe suscipit tenetur.</p>
              </div>
              <div className="col-md-4  order-md-1">
                  <img src={placeholder} alt="placeholder" className="presentation__img"/>
              </div>
          </div>

          <div className="row presentation__row">
              <div className="col-md-8">
                  <h3 className="presentation__heading">Etape 4 :</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad corporis culpa
                      debitis dicta dolorem dolorum ex fugit harum itaque natus nemo nisi, nostrum
                      quae quod rerum saepe suscipit tenetur.</p>
              </div>
              <div className="col-md-4">
                  <img src={placeholder} alt="placeholder" className="presentation__img"/>
              </div>
          </div>
      </div>
  );
}
