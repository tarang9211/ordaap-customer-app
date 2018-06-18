import React from 'react'
import PropTypes from 'prop-types'
import Page from '../../components/page'
import HotelInfo from '../../components/hotel-info'

import { hotel } from '../data'
import businessRules from '../../utils/business-rules'

hotel.restaurants = hotel.restaurants.map(restaurant =>
  ({ ...restaurant, timings: businessRules.computeOpenHours(restaurant.timings) }))

const Hotel = ({ action }) => (
  <Page>
    <section style={{ padding: '0.75rem' }} >
      <h4 className="title is-4 is-spaced">{hotel.name}</h4>
      <h6 className="subtitle is-6">{hotel.message}</h6>
    </section>
    <HotelInfo restaurants={hotel.restaurants} handleSelect={action('rid')} />
  </Page>
)

Hotel.propTypes = {
  action: PropTypes.func.isRequired
}

Hotel.defaultProps = {
  placeholder: false
}

export default Hotel
