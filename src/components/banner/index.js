import React from 'react'
import PropTypes from 'prop-types'

import './banner.css'

const Banner = ({ name, cuisines, timings, imageUrl, expanded, handleClick }) => ([
  <aside
    key="banner-image"
    className={`banner-image${expanded ? ' expanded' : ''}`}
    style={{ backgroundImage: `url("${imageUrl}")` }}
    {...handleClick && { onClick: handleClick }}
  />,
  <section
    key="banner"
    className="has-text-centered
    banner"
    {...handleClick && { onClick: handleClick }}
  >
    <h4 className="title is-4">
      {name || <span className="placeholder">&nbsp;</span>}
    </h4>
    <h6 className="subtitle is-6">
      {cuisines || <span className="placeholder">&nbsp;</span>}
    </h6>
    <h6 className="subtitle is-6">
      {timings || <span className="placeholder">&nbsp;</span>}
    </h6>
    <hr />
  </section>
])

Banner.propTypes = {
  name: PropTypes.string,
  cuisines: PropTypes.string,
  timings: PropTypes.string,
  expanded: PropTypes.bool,
  handleClick: PropTypes.func
}

Banner.defaultProps = {
  name: '',
  cuisines: '',
  timings: '',
  expanded: true,
  handleClick: null
}

export default Banner
