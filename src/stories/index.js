import React from 'react'

import { storiesOf } from '@storybook/react'  // eslint-disable-line
import { action } from '@storybook/addon-actions' // eslint-disable-line
import { linkTo } from '@storybook/addon-links' // eslint-disable-line

import * as Pages from './pages'

storiesOf('Ordaap Customer app', module)
  .add('Scan QR', () => <Pages.ScanQR action={action} />)
  .add('Home', () => <Pages.Home action={action} />)
  .add('Menu selection', () => <Pages.MenuSelection action={action} />)
  .add('Order confirmation', () => <Pages.OrderConfirmation action={action} />)
  .add('Billing', () => <Pages.Billing action={action} />)
  .add('Feedback (with email)', () => <Pages.FeedbackPage action={action} />)
  .add('Feedback (without email)', () => <Pages.FeedbackPage action={action} getEmail={false} />)
  .add('Feedback (email in use)', () => <Pages.FeedbackPage action={action} getEmail emailInUse="test@test.com" />)
  .add('Hotel (with data)', () => <Pages.Hotel action={action} />)
  .add('Hotel (without data)', () => <Pages.Hotel action={action} />)
