import React from 'react'
import PropTypes from 'prop-types'

import Banner from '../banner'
import ScrollToTop from '../scroll-to-top'

import './hotel-info.css'

const HotelInfo = ({ name: hotelName, message, restaurants, handleSelect }) => ([
  <ScrollToTop key="scroll-to-top" />,
  <section key="heading" className="hotel-info" >
    <h4 className="title is-4 is-spaced">{hotelName || <span className="placeholder">&nbsp;</span>}</h4>
    <h6 className="subtitle is-6">{message || <span className="placeholder">&nbsp;</span>}</h6>
  </section>,
  Array.isArray(restaurants) && restaurants.length > 0 ?
    restaurants.map(({ rid, name, images, cuisines, timings }) => (
      <Banner
        key={rid}
        {...{ name, cuisines, timings, imageUrl: images[0] }}
        handleClick={() => handleSelect(rid)}
      />
    ))
    :
    (
      (['restaurant-one', 'restaurant-two']).map(key => (
        <Banner key={key} />
      ))
    )
])

HotelInfo.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  restaurants: PropTypes.arrayOf(PropTypes.shape({
    rid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cuisines: PropTypes.string.isRequired,
    timings: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired
  })),
  handleSelect: PropTypes.func.isRequired
}

export default HotelInfo
