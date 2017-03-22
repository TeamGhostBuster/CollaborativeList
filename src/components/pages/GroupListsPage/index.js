import React from 'react';
import { PageTemplate } from 'components';
import List from '../CommenComponents/List/List';
import CreateList from '../CommenComponents/List/CreateList';
import MyAppBar from '../CommenComponents/MyAppBar';
import GetGroupListsRequest from '../../Requests/GetGroupListsRequest';
import GetGroupsRequest from '../../Requests/GetGroupsRequest';
import NavDrawerItem from '../CommenComponents/NavDrawerItem';
import { Divider, Drawer } from 'material-ui';
import NavDrawerPersonalItem from '../CommenComponents/NavDrawerPersonalItem';
import NavDrawerCreateGroupItem from '../CommenComponents/NavDrawerCreateGroupItem';

export default class GroupListsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      lists: [<div key="something" />],
      open: false,
      groups: []
    };

    // bind the function
    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);

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
    const getGroupListCallback = (response) => {
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

    // callback method for getGroups method
    const navDrawerCallback = (response) => {
      const listObjs = response.groups;
      this.setState({
        groups: listObjs.map((listObject) =>
          <NavDrawerItem
            key={listObject.id}
            id={listObject.id}
            name={listObject.name}
            onDrawerClose={this.handleClose}
            fromGroup={true}
            location={this.props.location}
          />)
      });
    };

    // send out the request
    GetGroupListsRequest.get(this.props.location.query.id, getGroupListCallback);
    GetGroupsRequest.get(navDrawerCallback);
  }

  // Handle the click event of Menu Button at AppBar
  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <PageTemplate test={this.props.test}>
        <MyAppBar
          title={this.props.location.query.name}
          openDrawer={this.handleToggle}
        />

        <Drawer
          className="Drawer"
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <Divider />
          <NavDrawerPersonalItem />
          <Divider />
          {this.state.groups}
          <Divider />
          <NavDrawerCreateGroupItem reloadCallback={this.componentWillMount}/>
        </Drawer>


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

GroupListsPage.propTypes = {
  // passed by react router
  location: React.PropTypes.object,
};
