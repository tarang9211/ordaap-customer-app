import { GetTags } from '../utils/api'
import { setGlobalTags } from '../actions'

export const setTags = () => dispatch =>
  GetTags()
    .then(tags => dispatch(setGlobalTags(tags)))

export default setTags
