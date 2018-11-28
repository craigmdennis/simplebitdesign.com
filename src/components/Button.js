import React from 'react';
import './Button.css';

const Button = props => (
  <a className="Button Button--primary" href="#">{props.text}<span>&rarr;</span></a>
)

export default Button;