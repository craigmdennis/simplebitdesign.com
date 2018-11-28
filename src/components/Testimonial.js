import React from 'react'
import "./Testimonial.css"

const Testimonial = props => (
  <div className="Testimonial">
    <p className="Testimonial__quote">{props.quote}</p>
    <img className="Testimonial__avatar" src={props.avatarUrl} alt=""/>
    <span className="Testimonial__name">{props.name}</span>
    <span className="Testimonial__jobTitle">{props.jobTitle}</span>
    <span className="Testimonial__company">{props.company}</span>
  </div>
)

export default Testimonial
