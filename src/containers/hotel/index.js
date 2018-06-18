import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import HotelInfo from '../../components/hotel-info'
import { DataContainer } from '../../containers'
import { getHotel } from '../../thunks/hotel'

const Hotel = ({
  isFetchingHotel,
  hotel,
  initialize,
  onInitializeError,
  handleClick
}) => [
  <HotelInfo
    key="hotel-info"
    {...hotel}
    handleSelect={handleClick}
  />,
  <DataContainer
    key="data-container"
    initialize={() => initialize(isFetchingHotel, hotel)}
    onError={onInitializeError}
  />
]

Hotel.propTypes = {
  isFetchingHotel: PropTypes.bool.isRequired,
  hotel: PropTypes.shape({
    hid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    restaurants: PropTypes.arrayOf(PropTypes.shape({
      rid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      cuisines: PropTypes.string.isRequired,
      timings: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired
    }))
  }),
  initialize: PropTypes.func.isRequired,
  onInitializeError: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired
}

Hotel.defaultProps = { hotel: {} }

const mapStateToProps = ({ hotel, app: { isFetchingHotel } }) => ({ hotel, isFetchingHotel })

const mapDispatchToProps = (dispatch, { history, match: { params: { hid, sid } } }) => ({
  initialize: (isFetchingHotel, hotel) => {
    if (typeof hotel === 'object' && hotel.hid === hid) return Promise.resolve()
    if (isFetchingHotel) return Promise.resolve(false)
    return dispatch(getHotel(hid))
  },

  onInitializeError: () => {
    history.backOrTo('/scan')
  },

  handleClick: (rid) => {
    history.replace(`/metadata/${rid}/${sid}`)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Hotel)
