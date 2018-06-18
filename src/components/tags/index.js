import React from 'react'
import PropTypes from 'prop-types'

import './tags.css'

const Tags = ({ definitions, tags, hideText, disabled }) => {
  if (tags && tags.length) {
    return (
      <div className="tags">
        {
          tags.map((key) => {
            const tag = definitions[key]
            if (tag) {
              return (
                <span
                  key={key}
                  className={`tag tag-${tag.icon.type === 'class' ? tag.icon.value : 'image'} ${!tag.title || hideText ? 'tag-icon-only' : ''}${disabled ? ' disabled' : ''}`}
                >
                  {
                    tag.icon.type === 'image' &&
                    <img alt={`tag-${key}`} src={tag.icon.value} />
                  }
                  { !hideText && tag.title}
                </span>
              )
            }
            return ''
          }
          )}
      </div>
    )
  }
  return ''
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.string
  ),
  definitions: PropTypes.shape(),
  hideText: PropTypes.bool,
  disabled: PropTypes.bool
}

Tags.defaultProps = {
  tags: [],
  definitions: {},
  hideText: false,
  disabled: false
}

export default Tags
