import React from 'react'
import { PageTemplate } from 'components'
import {browserHistory} from 'react-router'
import UpperSection from './subComponent/UpperSection'
import LowerSection from './subComponent/LowerSection'

const getGroupJason = () => {

};



export default class HomePage extends React.Component {

  render() {

    return (
      <PageTemplate>
        <UpperSection/>
        <LowerSection/>
      </PageTemplate>
    );
  }
}

