import { configure } from '@storybook/react';

const loadGlobalStyling = () => {
  require('../src/style/app.css')
}

const loadStories = () => {
  require('../src/stories')
}

configure(loadGlobalStyling, module)
configure(loadStories, module)
