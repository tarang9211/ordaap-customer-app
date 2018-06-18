import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Toast } from '../../components/toast'
import { clearToast } from '../../actions'

const ToastContainer = props => (
  <Toast {...props} />
)

ToastContainer.propTypes = {
  toast: PropTypes.shape({
    message: PropTypes.string
  }),
  handleDismiss: PropTypes.func.isRequired
}

ToastContainer.defaultProps = {
  toast: null
}

const mapStateToProps = ({ toast: { toasts } }) => ({
  toast: toasts[0]
})

const mapDispatchToProps = dispatch => ({
  handleDismiss: () => {
    dispatch(clearToast())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ToastContainer)

