import { SubmitFeedback, LinkEmail } from '../utils/api'
import { emailLinked, emailAlreadyInUse, emailLinkingFailed, feedbackSubmitted, isSubmittingFeedback } from '../actions'

export const linkEmail = email => (dispatch, getState) => {
  const { app: { uid } } = getState()
  return LinkEmail(email)
    .then(() => {
      dispatch(emailLinked(email))
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        dispatch(emailAlreadyInUse(email))
      } else {
        dispatch(emailLinkingFailed(error, email, uid))
      }
    })
}

export const submitFeedback = (rating, comments, otherComments) => (dispatch, getState) => {
  const { metadata: { _persist, ...metadata }, app: { uid } } = getState()
  dispatch(isSubmittingFeedback(true))
  return SubmitFeedback({
    ...metadata,
    uid,
    rating,
    comments,
    otherComments
  }).then(() => {
    dispatch(feedbackSubmitted())
    dispatch(isSubmittingFeedback(false))
  })
}
