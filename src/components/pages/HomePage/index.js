import React from 'react';
import { PageTemplate } from 'components';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import UpperSection from './subComponent/UpperSection';
import LowerSection from './subComponent/LowerSection';

export default class HomePage extends React.Component {

  render() {
    return (
      <PageTemplate>
        <AppBar title="HomePage" iconElementLeft={<div />} />
        <UpperSection />
        <Divider />
        <LowerSection />
      </PageTemplate>
    );
  }
}

