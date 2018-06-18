import React from 'react'
import PropTypes from 'prop-types'

import './page.css'

const Page = ({ children }) => (
  <div className="page">
    {children}
  </div>
)

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

Page.defaultProps = { children: null }

export default Page
