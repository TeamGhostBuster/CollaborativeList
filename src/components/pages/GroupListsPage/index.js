import React from 'react';
import { PageTemplate } from 'components';
import List from '../CommenComponents/List/List';
import CreateList from '../CommenComponents/List/CreateList';
import MyAppBar from '../CommenComponents/MyAppBar';
import GetGroupListsRequest from '../../Requests/GetGroupListsRequest';

export default class GroupListsPage extends React.Component {
  constructor() {
    super();
    this.state = { lists: [<div key="something" />] };

    // bind the function
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
      console.log(response);
      const listObjs = response.lists;
      this.setState({
        lists: listObjs
          .filter((obj) => !obj.archived)
          .map((listObject) =>
            <List
              key={listObject.id} id={listObject.id} name={listObject.name}
              reloadCallback={this.componentWillMount} group="true" groupId={this.props.location.query.id}
            />)
      });
    };

    // send out the request
    GetGroupListsRequest.get(this.props.location.query.id, cb);
  }


  render() {
    return (
      <PageTemplate>
        <MyAppBar title={this.props.location.query.name} />
        <div style={this.styles.root}>
          <ul style={this.styles.List}>
            {this.state.lists}
            <CreateList group="true" groupId={this.props.location.query.id} reloadCallback={this.componentWillMount} />
          </ul>
        </div>
      </PageTemplate>
    );
  }
}

