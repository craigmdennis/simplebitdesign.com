import React from 'react'
import Button from './Button'
import Logo from './Logo'
import './Header.css'

class Header extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      hasScrolled: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = (event) => {
    const scrollTop = window.pageYOffset

    if (scrollTop > 50) {
      this.setState({ hasScrolled: true })
    } else {
      this.setState({ hasScrolled: false })
    }
  }

  render() {
    return (
      <header className={this.state.hasScrolled ? 'Header Header--hasScrolled' : 'Header'}>
        <Logo siteTitle={this.props.siteTitle} />
        <h1 className="Header__title">The Digital Design Experts</h1>
        <p className="Header__subtitle">Creating web and software products to help grow your businesses.</p>
        <Button text="Talk to us about your goals" url="#" />
      </header>
    )
  }
}

export default Header