import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class OtherComments extends PureComponent {
  state = {
    comment: ''
  }

  handleCommentChange = (event) => {
    this.setState({ comment: event.target.value })
    this.props.handleChange(event.target.value)
  }

  render = () => (
    <section className="other-comments">
      <div className="control">
        <textarea className="textarea" value={this.state.comment} placeholder="Other comments" rows={2} onChange={this.handleCommentChange} />
      </div>
    </section>
  )
}

OtherComments.propTypes = {
  handleChange: PropTypes.func.isRequired
}

export default OtherComments
