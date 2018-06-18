import React from 'react'
import PropTypes from 'prop-types'

import './fab.css'

const Fab = ({ icon, handleClick, tag }) => (
  <div className="fab" role="button" tabIndex={0} onClick={handleClick}>
    <span className="icon">
      <i className={`fa fa-${icon}`} />
    </span>
    {tag ? <span className="tag is-primary">{tag}</span> : null}
  </div>
)

Fab.propTypes = {
  icon: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Fab.defaultProps = { tag: null }

export default Fab
