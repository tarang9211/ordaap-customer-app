import React from 'react'
import PropTypes from 'prop-types'

import assets from './assets'

const FeedbackComments = ({ rating, handleChange }) => (rating > 0 &&
  <section className="feedback-comments">
    <p>
      {
        rating < assets.ratingTotal ?
          'Can you share what went wrong?' : 'Can you share what went perfect?'
      }
    </p>
    <ul>
      {
        assets.feedbackComments[rating - 1].map((comment, i) => (
          <li key={`${rating}-${comment}`}>
            <label className="checkbox" htmlFor={`comment-${i}`}>
              <input
                type="checkbox"
                id={`comment-${i}`}
                onChange={event =>
                  handleChange(event.target.checked, i, comment)
                }
              />
              &nbsp;&nbsp;{comment}
            </label>
          </li>))
      }
    </ul>
  </section>)


FeedbackComments.propTypes = {
  rating: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default FeedbackComments
