import React from 'react'
import ProductDetail from './ProductDetail'
import HomeNewSales from '../Home/HomeSales'
import Detailsale from './HomeSales'
import Review from '../Home/Review'
import FAQPage from '../Contact/Faqs'
import Socialmedia from '../Home/Socialmedia'

function Productdetailpage() {
  return (
    <div>
      <ProductDetail/>

      <Detailsale/>
      <Review/>
      <FAQPage/>
      <Socialmedia/>
      
    </div>
  )
}

export default Productdetailpage
