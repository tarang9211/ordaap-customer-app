import React from 'react'
import { connect } from 'react-redux'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import Page from '../../components/page'
import Splash from '../../components/splash'
import {
  RestaurantHome, ReadQR, MenuItem, CartItem, Hotel,
  Order, Metadata, Billing, ToastContainer
} from '../../containers'

const RoutesContainer = ({ loaded, history, isOrderClosed, isRestaurantSet, orderAvailable }) => (
  loaded ?
    <Page>
      <ToastContainer />
      <Router history={history} >
        <Switch>
          {
            !isOrderClosed && [
              <Route
                exact
                key="Metadata"
                path="/metadata/:rid/:sid?"
                component={Metadata}
              />,
              <Route
                exact
                key="ReadQR"
                path="/scan"
                component={ReadQR}
              />,
              !orderAvailable &&
              <Route
                exact
                key="Hotel"
                path="/hotels/:hid/:sid"
                component={Hotel}
              />,
              isRestaurantSet ? [
                <Route
                  exact
                  key="RestaurantHome"
                  path="/restaurant"
                  component={RestaurantHome}
                />,
                <Route
                  exact
                  key="MenuItem"
                  path="/menu/:iid"
                  component={MenuItem}
                />,
                <Route
                  exact
                  key="CartItem"
                  path="/orders/:cid"
                  component={CartItem}
                />,
                <Route
                  exact
                  key="Orders"
                  path="/orders"
                  component={Order}
                />
              ] : null
            ]
          }
          {
            orderAvailable &&
            <Route
              exact
              key="Billing"
              path="/billing"
              component={Billing}
            />
          }
          {isOrderClosed && <Redirect to="/billing" />}
          <Redirect to="/scan" />
        </Switch>
      </Router>
    </Page>
    : <Splash />
)

RoutesContainer.propTypes = {
  history: PropTypes.shape().isRequired,
  loaded: PropTypes.bool,
  isOrderClosed: PropTypes.bool.isRequired,
  isRestaurantSet: PropTypes.bool.isRequired,
  orderAvailable: PropTypes.bool
}

RoutesContainer.defaultProps = {
  loaded: false,
  orderAvailable: false
}

const mapStateToProps = ({ app: { loaded }, metadata: { rid, oid }, order: { closed } }) => ({
  loaded,
  isOrderClosed: closed,
  isRestaurantSet: rid.length > 0,
  orderAvailable: oid.length > 0
})

export default connect(mapStateToProps, null)(RoutesContainer)
