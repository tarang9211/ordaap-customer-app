import React from 'react'
import PropTypes from 'prop-types'

import './navbar.css'

const Navbar = ({ fixed, title, handleBack }) => (
  <header className={`navigation-bar${fixed ? ' is-fixed' : ''}`}>
    <nav className="navbar">
      <div className="navbar-brand">
        {
          handleBack &&
          <a
            role="button"
            tabIndex={0}
            className="navbar-item"
            onClick={handleBack}
          >
            <span className="icon">
              <i className="fa fa-arrow-left" />
            </span>
          </a>
        }
        <div className="navbar-item">
          <h4 className="title is-4">
            {title || <span className="placeholder">&nbsp;</span>}
          </h4>
        </div>
      </div>
    </nav>
  </header>
)

Navbar.propTypes = {
  fixed: PropTypes.bool,
  title: PropTypes.string,
  handleBack: PropTypes.func
}

Navbar.defaultProps = {
  fixed: false,
  title: '',
  handleBack: null
}

export default Navbar
