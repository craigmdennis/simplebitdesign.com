import React from 'react'
import './Section.css'

const Section = props => (
  <div className={props.dark ? 'Section Section--dark' : 'Section'}>
    <h1 className={props.dark ? 'Section__title Section__title--large' : 'Section__title'}>{props.title}</h1>
    {props.children}
  </div>
)

export default Section