import React from 'react'
import Sticky from 'react-stickynode'
import PropTypes from 'prop-types'
import ScrollableAnchor from 'react-scrollable-anchor'

import './menu-types-tabs.css'

const MenuTypesTabs = ({ types, handleOnClick, sticky }) => (
  <ScrollableAnchor id="menu-categories">
    <section className="menu-types">
      <Sticky enabled={sticky.enabled} top={sticky.offset}>
        <div className="tabs is-centered">
          {types && types.length ? (
            <ul>
              {types.map(({ name, active }) => (
                <li
                  role="presentation"
                  key={name}
                  className={active ? 'is-active' : ''}
                  onClick={() => handleOnClick(name)}
                >
                  <a href="#menu-categories">{name}</a>
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              <li key="category-1" className="is-active">
                <span className="placeholder">&nbsp;</span>
              </li>
              <li key="category-2">
                <span className="placeholder">&nbsp;</span>
              </li>
              <li key="category-3">
                <span className="placeholder">&nbsp;</span>
              </li>
            </ul>
          )}
        </div>
      </Sticky>
    </section>
  </ScrollableAnchor>
)

MenuTypesTabs.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      active: PropTypes.bool
    })
  ).isRequired,
  handleOnClick: PropTypes.func.isRequired,
  sticky: PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    offset: PropTypes.number.isRequired
  })
}

MenuTypesTabs.defaultProps = {
  sticky: {
    enabled: true,
    offset: 0
  }
}

export default MenuTypesTabs
