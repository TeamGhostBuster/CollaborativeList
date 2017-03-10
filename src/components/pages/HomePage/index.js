import React from 'react'
import { PageTemplate } from 'components'
import {browserHistory} from 'react-router'
import UpperSection from './subComponent/UpperSection'
import LowerSection from './subComponent/LowerSection'
import AppBar from 'material-ui/AppBar'
import Divider from 'material-ui/Divider';

export default class HomePage extends React.Component {

  render() {
    return (
      <PageTemplate>
        <AppBar title="HomePage" iconElementLeft={<div></div>}/>
        <UpperSection/>
        <Divider/>
        <LowerSection/>
      </PageTemplate>
    );
  }
}

