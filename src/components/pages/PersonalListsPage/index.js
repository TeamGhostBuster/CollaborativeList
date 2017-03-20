import React from 'react';
import { PageTemplate } from 'components';
import { browserHistory } from 'react-router';
import List from '../CommenComponents/List/List';
import CreateList from '../CommenComponents/List/CreateList';
import { AppBar, IconButton } from 'material-ui';
import Back from 'material-ui/svg-icons/hardware/keyboard-backspace';
import GetUserListsRequest from '../../Requests/GetUserListsRequest';
import MyAppBar from '../CommenComponents/MyAppBar';
export default class ListsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lists: [<div key="something" />] };

    // bind the functions here
    this.componentWillMount = this.componentWillMount.bind(this);

    // css styles
    this.styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        height: '100%'
      },
      List: {
        listStyle: 'none',
        display: 'inline-flex',
        flexWrap: 'nowrap',
        padding: '0'
      }
    };
  }

  componentWillMount() {
    // thi is part of the constructor, but it can be used as a callback function for a child node.

    // call back function for getLists request function
    const cb = (response) => {
      console.log('list page index', response);
      const listObjs = response.lists;
      this.setState({
        lists: listObjs
          .filter((obj) => !obj.archived)
          .map((listObject) =>
            <List
              key={listObject.id} id={listObject.id} name={listObject.name}
              reloadCallback={this.componentWillMount}
            />)
      });
    };

    // send out the request
    GetUserListsRequest.get(cb);
  }


  render() {
    return (
      <PageTemplate>
        <MyAppBar title="Personal List" />
        <div style={this.styles.root}>
          <ul style={this.styles.List}>
            {this.state.lists}
            <CreateList reloadCallback={this.componentWillMount} />
          </ul>
        </div>
      </PageTemplate>
    );
  }
}

