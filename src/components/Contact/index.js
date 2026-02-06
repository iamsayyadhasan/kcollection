import React from 'react'
import Cbanner from './Cbanner'
import Add from './Add'
import Collections from './Collectionimage'
import FAQPage from './Faqs'
import HeroStorySection from '../Home/Herostory'
import Socialmedia from '../Home/Socialmedia'

function Contactpage() {
  return (
    <div>
      <Cbanner/>
      <Add/>
      <Collections/>
      <FAQPage/>
      <HeroStorySection/>
      <Socialmedia/>
    </div>
  )
}

export default Contactpage
