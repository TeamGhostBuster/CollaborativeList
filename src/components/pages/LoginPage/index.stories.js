import React from 'react'
import {storiesOf} from '@kadira/storybook'
import {LoginPage} from 'components'

storiesOf('LoginPage', module)
  .add('default', () => (
    <LoginPage />
  ))
