import React from 'react'
import './Logo.css'
import LogoUrl, { ReactComponent as LogoSVG } from '../images/logo.svg'

const Logo = props => (
  <div className="Logo">
    <LogoSVG className="Logo__image" />
    <span className="Logo__text">{ props.siteTitle }</span>
  </div>
)

export default Logo