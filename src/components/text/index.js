import React from 'react'
import PropTypes from 'prop-types'

const Text = ({ text }) => (
  <section>
    <p className="has-text-centered">{text}</p>
  </section>
)

Text.propTypes = {
  text: PropTypes.string.isRequired
}

export default Text
