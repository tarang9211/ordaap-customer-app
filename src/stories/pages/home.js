import React from 'react'
import PropTypes from 'prop-types'

import Page from '../../components/page'
import Banner from '../../components/banner'
import MenuList from '../../components/menu-list'
import Fab from '../../components/fab'
import FeedbackButton from '../../components/feedback-button'

import { menu, tags } from '../data'

import tagMapper from '../../utils/tag-mapper'

const Home = ({ action }) => (
  <Page imageUrl="https://lbb.in/bangalore/wp-content/uploads/sites/2/2015/08/Maadadhaba.jpg">
    <Banner
      name="Guru Lakshmi"
      cuisines="Indian, South"
      timings="Thu 5PM to 7PM"
    />
    <MenuList
      {...{ menu, tagDefinitions: tagMapper.combineTags(tags) }}
      handleClick={action}
    />
    <FeedbackButton
      handleClick={() => action('Feedback button clicked!')}
    />
    <Fab
      icon="cutlery"
      tag={3}
      handleClick={() => action('Fab clicked!')}
    />
  </Page>
)

Home.propTypes = {
  action: PropTypes.func.isRequired
}

export default Home
