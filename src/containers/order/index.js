import React from 'react'

import ScrollToTop from '../../components/scroll-to-top'
import Navbar from '../../components/navbar'

import NewOrder from '../new-order'
import PreviousOrder from '../previous-order'

const Order = ({ history }) => [
  <ScrollToTop key="scroll-to-top" />,
  <Navbar
    key="navbar"
    fixed
    title="New Order"
    handleBack={() => history.backOrTo('/restaurant')}
  />,
  <NewOrder
    key="new-order"
    navigateToHome={() => history.backOrTo('/restaurant')}
    editItem={idx => history.to(`/orders/${idx}`)}
  />,
  <PreviousOrder
    key="previous-order"
    navigateToBilling={() => history.to('/billing')}
  />
]

export default Order
