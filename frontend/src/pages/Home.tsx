import React from 'react'
import { HomeHero } from '../components/Hero'
import { HomeServices } from '../components/HomeServices'
import ContactInfo from '../components/ContactInfo'

export const Home = () => {
  return (
    <div>
      <HomeHero />
      <HomeServices />
      <ContactInfo />
    </div>
  )
}
