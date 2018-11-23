import React from 'react';
import './Card.css';

const Card = props => (
  <div className="Card">
    <span className="Card__label">Client:</span>
    <h3 className="Card__title">{props.title}</h3>
    <img src={props.image} alt=""/>
    <p className="Card__text">{props.text}</p>
    <a className="Card__link" href={props.url}>View the project <span>&rarr;</span></a>
  </div>
)

export default Card