import React from 'react'
import { HomeHero } from '../components/Hero'
import { HomeServices } from '../components/HomeServices'
import ContactInfo from '../components/ContactInfo'
import { HomeImages } from '../components/HomeImages'

export const Home = () => {
  return (
    <div>
      <HomeHero />
      <HomeServices />
      <HomeImages />
      <ContactInfo />
    </div>
  )
}
