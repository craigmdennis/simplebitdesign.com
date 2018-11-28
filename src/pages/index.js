import React from 'react'
import Section from '../components/Section'
import Work from '../components/Work'
import Testimonial from '../components/Testimonial'
import staticdata from '../staticdata.json'

const IndexPage = () => (
  <div>
    <Section title="What can we do?">
      <p>We specialise in web design and online software for businesses. If it has a screen, we can design for it.</p>
    </Section>

    <Work title="Some of our work" />

    <Section title="Why work with us?">
      <p>Our skill and & experience has helped increase conversion, add new features, and simplify complex user-flows. For well known brands and recently funded start-ups.</p>
      <div className="LogoGrid">
        <div className="ClientLogo"><img src={require('../images/megamac.png')} alt="Megamac"/></div>
        <div className="ClientLogo"><img src={require('../images/smashing-magazine.png')} alt="Megamac"/></div>
        <div className="ClientLogo"><img src={require('../images/bond-international.png')} alt="Megamac"/></div>
        <div className="ClientLogo"><img src={require('../images/bbc.png')} alt="Megamac"/></div>
        <div className="ClientLogo"><img src={require('../images/octopus.png')} alt="Megamac"/></div>
        <div className="ClientLogo"><img src={require('../images/dell.png')} alt="Megamac"/></div>
      </div>

      {staticdata.testimonials.map((testimonial, index) => (
        <Testimonial
          key={index}
          quote={testimonial.quote}
          avatarUrl={testimonial.avatarUrl}
          name={testimonial.name}
          jobTitle={testimonial.jobTitle}
          company={testimonial.company} />
      ))}

    </Section>
    <Section title="Where are we based?">
      <p>We operate remotely from the south-east of the UK (GMT). We use tools like Slack and Zoom to work with companies all over the world.</p>

      <iframe
        className="fullWidthMap"
        frameBorder="0"
        src="https://www.google.com/maps/embed/v1/place?q=Simple%20Bit%20Design%2C%20King%20Street%2C%20Maidstone%2C%20Kent"
        allowFullScreen></iframe>

    </Section>
  </div>
)

export default IndexPage
