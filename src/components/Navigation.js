import React from 'react'
import Link from 'gatsby-link'
import "./Navigation.css"
import HomeUrl, { ReactComponent as HomeSVG } from '../images/home.svg'
import WorkUrl, { ReactComponent as WorkSVG } from '../images/work.svg'
import ServicesUrl, { ReactComponent as ServicesSVG } from '../images/services.svg'
import ContactUrl, { ReactComponent as ContactSVG } from '../images/contact.svg'

const Navigation = props => (
  <nav className="Navigation">
    <ul className="Navigation__menu">
      <li className="Navigation__menuItem">
        <Link to="#" className="Navigation__link Navigation__link--isActive">
          <HomeSVG className="Navigation__icon" />
          <span className="Navigation__label">Home</span>
        </Link>
      </li>
      <li className="Navigation__menuItem">
        <Link to="#" className="Navigation__link">
          <WorkSVG className="Navigation__icon" />
          <span className="Navigation__label">Work</span>
        </Link>
      </li>
      <li className="Navigation__menuItem">
        <Link to="#" className="Navigation__link">
          <ServicesSVG className="Navigation__icon" />
          <span className="Navigation__label">Services</span>
        </Link>
      </li>
      <li className="Navigation__menuItem">
        <Link to="#" className="Navigation__link">
          <ContactSVG className="Navigation__icon" />
          <span className="Navigation__label">Contact</span>
        </Link>
      </li>
    </ul>
  </nav>
)

export default Navigation
