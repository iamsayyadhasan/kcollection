"use client"
import React from 'react'
import Hero from './Banner'
import BestSellers from './Bestsellersection'
import Collections from './Collectionimage'
import Homenwarrival from './Homenwarrival'
import HeroStorySection from './Herostory'
import HomeNewSales from './HomeSales'
import Review from './Review'
import Socailmedia from './Socialmedia'
import ButtonPage from '../Services/Index'

function Homepage() {
  return (
    <div>
      <Hero/>
      <BestSellers/>
      <Collections/>
      <Homenwarrival/>
      <HeroStorySection/>
      <HomeNewSales/>
      <Review/>
      <Socailmedia/>
      <ButtonPage/>

    </div>
  )
}

export default Homepage
