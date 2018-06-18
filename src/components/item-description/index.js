import React from 'react'
import PropTypes from 'prop-types'

import './item-description.css'
import Tags from '../tags'

const ItemDescription = ({ name, desc, extra, tagDefinitions, tags, disabled }) => (
  <section className={`item-description ${disabled ? 'disabled' : ''}`}>
    {
      name.length > 0 ?
        <h5 className="title is-5">{name}</h5>
        :
        <h5 className="title is-5 placeholder">&nbsp;</h5>
    }
    {
      (desc.length > 0 || name.length > 0) ?
        <p>{desc}</p>
        :
        <p className="placeholder">&nbsp;</p>
    }
    {
      (extra.length > 0 && name.length > 0) && <p><br /><i>{extra}</i></p>
    }
    <Tags definitions={tagDefinitions} {...{ tags, disabled }} />
  </section>
)

ItemDescription.propTypes = {
  name: PropTypes.string,
  desc: PropTypes.string,
  extra: PropTypes.string,
  tagDefinitions: PropTypes.shape(),
  tags: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool.isRequired
}

ItemDescription.defaultProps = { name: '', desc: '', extra: '', tagDefinitions: {}, tags: [] }

export default ItemDescription
