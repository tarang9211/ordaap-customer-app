import React from 'react'
import PropTypes from 'prop-types'

import './loader.css'

const Loader = ({ pastDelay }) => (
  pastDelay ?
    <div className="loader">
      <div className="container">
        <div><div /></div>
        <div><div /></div>
        <div><div /></div>
        <div><div /></div>
        <div><div /></div>
      </div>
    </div>
    : null
)

Loader.propTypes = {
  pastDelay: PropTypes.bool.isRequired
}

export default Loader
