import React from 'react'
import { mount } from 'enzyme'
import PageTemplate from './index'

it('mounts', () => {
  mount(<PageTemplate>test</PageTemplate>)
})
