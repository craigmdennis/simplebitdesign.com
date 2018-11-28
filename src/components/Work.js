import React from 'react'
import Section from "../components/Section"
import Card from "../components/Card"
// import "./Work.css"

const Work = props => (
  <Section title={props.title} dark={true}>
    <div className="CardGroup">
      <Card 
        title="Megamac" 
        text="A complete redesign of the online shop, including front-end development."
        image="https://via.placeholder.com/240x160"
        />
      <Card 
        title="Rail Modeller" 
        text="Refresh the UI of the Mac app focussing on improved usability."
        image="https://via.placeholder.com/240x160"
        />
      <Card 
        title="Clipisode" 
        text="Design the mobile experience to allow frictionless video upload and collaboration."
        image="https://via.placeholder.com/240x160"
        />
      <Card 
        title="Octopus" 
        text="Roll out their updated brand throughout new and existing verticals."
        partner="Band Pie"
        image="https://via.placeholder.com/240x160"
        />
    </div>
  
  </Section>
)

export default Work
