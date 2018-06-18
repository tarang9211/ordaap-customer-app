import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Sticky from 'react-stickynode'
import smoothscroll from 'smoothscroll-polyfill'

import './menu-list.css'
import Tags from '../tags'

smoothscroll.polyfill()

class MenuList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tabsTopOffset: 0,
      tabsWidth: 0,
      menu: props.menu && this.groupMenuByCategories(props.menu)
    }
    this.tabsRef = null
    this.tabsCanScroll = true
    this.doNotScrollTabsTimer = null
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.menu !== this.props.menu && nextProps.menu !== null) {
      this.setState({ menu: this.groupMenuByCategories(nextProps.menu) })
    }
  }

  componentWillUnmount = () => {
    clearTimeout(this.doNotScrollTabsTimer)
  }

  groupMenuByCategories = (menu) => {
    const catMap = new Map()
    const subcatMap = new Map()
    Object.keys(menu).forEach((iid) => {
      if (this.props.hideUnavailableMenuItems && !menu[iid].available) return
      const item = { iid, ...menu[iid] }
      if (typeof item.cat !== 'string') return
      const cat = item.cat.trim()
      if (cat === '') return
      const subcat =
        typeof item.subcat === 'string' ? item.subcat.trim() : ''

      const subcatKey = `${cat}/${subcat}`
      if (subcatMap.has(subcatKey)) {
        subcatMap.get(subcatKey).items.push(item)
      } else {
        const subcatMenu = { subcat, items: [item] }
        subcatMap.set(subcatKey, subcatMenu)
        if (catMap.has(cat)) {
          catMap.get(cat).subcats.push(subcatMenu)
        } else {
          const catMenu = { cat, subcats: [subcatMenu] }
          catMap.set(cat, catMenu)
        }
      }
    })
    return Array.from(catMap.values())
  }

  doNotScrollTabs = () => {
    this.tabsCanScroll = false
    clearTimeout(this.doNotScrollTabsTimer)
    this.doNotScrollTabsTimer = setTimeout(() => {
      this.tabsCanScroll = true
    }, 500)
  }

  captureTabsRef = (ref) => {
    if (ref == null) return
    this.tabsRef = ref
    let stickyOffset = 0
    if (typeof this.props.sticky.offset === 'string') {
      const offsetEl = document.querySelector(this.props.sticky.offset)
      if (offsetEl != null) stickyOffset = offsetEl.offsetHeight
    }
    this.setState({
      tabsTopOffset: ref.offsetTop + ref.offsetHeight + stickyOffset,
      tabsWidth: ref.offsetWidth
    })
  }

  handleStick = (catIndex) => {
    const activeTabRef = this.tabsRef.querySelector('.is-active')
    if (activeTabRef != null) activeTabRef.className = ''
    const tabRef = this.tabsRef.querySelector(`#tab-${catIndex}`)
    tabRef.className = 'is-active'
    const { offsetLeft, offsetWidth } = tabRef
    if (this.tabsCanScroll) {
      this.tabsRef.scrollTo({
        left: (offsetLeft - (this.state.tabsWidth / 2)) + (offsetWidth / 2),
        behavior: 'smooth'
      })
    }
  }

  handleTabClick = (catIndex) => {
    const catSection = document.querySelector(`#category-section-${catIndex}`)
    if (catSection == null) return
    const { offsetTop } = catSection
    this.doNotScrollTabs()
    window.scrollTo({ top: (offsetTop - this.state.tabsTopOffset) + 4, behavior: 'smooth' })
  }

  renderTabsPlaceholder = () => (
    <section key="menu-tabs" className="menu-tabs">
      <div className="tabs is-centered">
        <ul>
          <li key="category-1">
            <span className="placeholder">&nbsp;</span>
          </li>
          <li key="category-2">
            <span className="placeholder">&nbsp;</span>
          </li>
          <li key="category-3">
            <span className="placeholder">&nbsp;</span>
          </li>
        </ul>
      </div>
    </section>
  )

  renderTabs = () => (
    <section key="menu-tabs" className="menu-tabs">
      <Sticky enabled={this.props.sticky.enabled} top={this.props.sticky.offset}>
        <div className="tabs is-centered" ref={this.captureTabsRef} >
          <ul>
            {
              this.state.menu.map(({ cat }, catIndex) => (
                <li key={cat} id={`tab-${catIndex}`}>
                  <a role="link" tabIndex={0} onClick={() => this.handleTabClick(catIndex)}>{cat}</a>
                </li>
              ))
            }
          </ul>
        </div>
      </Sticky>
    </section>
  )

  renderMenuPlaceholder = () => (
    <section key="category-loading" className="menu-category">
      <h6 className="title is-6 placeholder">&nbsp;</h6>
      <div key="category-item-loading-1" className="item">
        <div className="header">
          <h6 className="title is-6 placeholder">&nbsp;</h6>
          <h6 className="title is-6 placeholder">&nbsp;</h6>
        </div>
        <p className="placeholder">&nbsp;</p>
      </div>
      <div key="category-item-loading-2" className="item">
        <div className="header">
          <h6 className="title is-6 placeholder">&nbsp;</h6>
          <h6 className="title is-6 placeholder">&nbsp;</h6>
        </div>
        <p className="placeholder">&nbsp;</p>
      </div>
    </section>
  )

  renderMenu = () => (
    this.state.menu.map(({ cat, subcats }, catIndex) => (
      <section
        key={`category-section-${cat}`}
        id={`category-section-${catIndex}`}
        className="menu-category"
      >
        {
          subcats.map(({ subcat, items }, subcatIndex) => ([
            <Sticky
              enabled={this.props.sticky.enabled}
              key={`subcategory-heading-${subcat}`}
              top={this.state.tabsTopOffset}
              bottomBoundary={`#subcategory-item-${catIndex}-${subcatIndex}-${items.length - 1}`}
              onStateChange={
                ({ status }) => { if (status === 2) this.handleStick(catIndex) }
              }
              activeClass={`active${subcat.length === 0 ? ' empty' : ''}`}
            >
              <h6
                id={`subcategory-heading-${catIndex}-${subcatIndex}`}
                className="title is-6 subcategory"
              >{subcat}
              </h6>
            </Sticky>,
            items.map(({ iid, name, desc, price, tags, available }, itemIndex) => (
              <div
                key={iid}
                id={`subcategory-item-${catIndex}-${subcatIndex}-${itemIndex}`}
                className={`item${tags != null ? ` ${tags.join(' ')}` : ''} ${available ? '' : 'disabled'}`}
                role="button"
                tabIndex={0}
                onClick={() => this.props.handleClick(iid)}
                first={itemIndex === 0 ? '' : undefined}
                last={itemIndex === items.length - 1 ? '' : undefined}
              >
                <div className="header">
                  <h6 className="title is-6">{name}</h6>
                  <h6 className="title is-6">{`${this.props.currency} ${price}`}</h6>
                </div>
                <p>{desc}</p>
                <Tags definitions={this.props.tagDefinitions} tags={tags} hideText />
              </div>
            ))
          ]))}
      </section>
    ))
  )

  render = () => (
    this.state.menu && this.state.menu.length ? [
      this.renderTabs(),
      this.renderMenu()
    ] : [
      this.renderTabsPlaceholder(),
      this.renderMenuPlaceholder()
    ]
  )
}

MenuList.propTypes = {
  sticky: PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
  }),
  menu: PropTypes.shape(),
  currency: PropTypes.string,
  tagDefinitions: PropTypes.shape(),
  hideUnavailableMenuItems: PropTypes.bool,
  handleClick: PropTypes.func.isRequired
}

MenuList.defaultProps = {
  sticky: {
    enabled: true,
    offset: 0
  },
  currency: '',
  tagDefinitions: null,
  hideUnavailableMenuItems: false,
  menu: null
}

export default MenuList
