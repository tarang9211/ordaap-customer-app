import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ItemCustomization from '../components/item-customization'

configure({ adapter: new Adapter() })

const type = 'Choose Addon'
const options =
[
  { name: 'Ghee', price: 0.99 },
  { name: 'Paneer', price: 0.99 },
  { name: 'Cheese', price: 0.99 },
  { name: 'Butter', price: 0.99 }
]
const handleChange = jest.fn()

describe('ItemCustomization Component', () => {
  test('should render an options section', () => {
    const wrapper = shallow(<ItemCustomization
      type={type}
      options={options}
      handleChange={handleChange}
    />)
    expect(wrapper).toHaveLength(1)
  })

  test('should render four options', () => {
    const wrapper = shallow(<ItemCustomization
      type={type}
      options={options}
      handleChange={handleChange}
    />)
    expect(wrapper.find('label')).toHaveLength(4)
  })

  test('should render appropriate option name', () => {
    const wrapper = shallow(<ItemCustomization
      type={type}
      options={options}
      handleChange={handleChange}
    />)
    expect(wrapper.find('.header').text()).toBe(type)
  })
})
