import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ItemDescription from '../components/item-description'

configure({ adapter: new Adapter() })

describe('ItemDescription Component', () => {
  test('should render without any props', () => {
    const wrapper = shallow(<ItemDescription />)
    expect(wrapper).toHaveLength(1)
  })

  test('should display menu name and description', () => {
    const name = 'Ghee Dosa'
    const desc = 'Thin crispy crepe cooked to golden perfection brushed with ghee'
    const wrapper = shallow(<ItemDescription name={name} desc={desc} />)

    const headerText = wrapper.find('h5').text()
    const descText = wrapper.find('p').text()

    expect(headerText).toEqual(name)
    expect(descText).toEqual(desc)
  })
})
