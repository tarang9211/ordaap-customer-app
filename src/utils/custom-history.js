import createHistory from 'history/createBrowserHistory'

const createCustomHistory = (options) => {
  const history = createHistory(options)
  history.backOrTo = (route) => {
    if (history.length > 2) {
      history.goBack()
    } else {
      history.replace(route)
    }
  }
  history.to = (route) => {
    history.push(route)
  }
  return history
}

export default createCustomHistory
