import React from 'react'
import PropTypes from 'prop-types'

import assets from './assets'

const RatingBar = ({ handleChange, rating }) => (
  <section className="has-text-centered rating-bar">
    <h5 className="title is-5">How was your experience?</h5>
    {
      [...Array(assets.ratingTotal).keys()].map(i => (
        <label className="checkbox" htmlFor={`rating-${i}`} key={`rating-${i}`}>
          <input
            type="checkbox"
            className="rating-icon"
            id={`rating-${i}`}
            checked={rating > i}
            onChange={() => handleChange(i + 1)}
          />
          <span className="icon is-large">
            <i className={`fa fa-lg ${rating > i ? 'fa-star' : 'fa-star-o'}`} />
          </span>
        </label>
      ))
    }
    {
      rating > 0 && rating <= assets.ratingTotal ?
        <h6 className="title is-6">{assets.textForRating[rating - 1]}</h6>
        :
        null
    }
  </section>
)

RatingBar.propTypes = {
  rating: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default RatingBar
