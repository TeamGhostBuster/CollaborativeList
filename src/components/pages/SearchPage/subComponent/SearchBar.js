import React from 'react';
import { FlatButton } from 'material-ui';
import Search from 'material-ui/svg-icons/action/search';

export default class Searchbar extends React.Component {

  render() {
    return (
      <FlatButton icon="Search" href="/search" />
    );
  }
}
