import React from 'react';
import { PageTemplate } from 'components';
import List from '../CommenComponents/List/List';
import CreateList from '../CommenComponents/List/CreateList';
import GetUserListsRequest from '../../Requests/GetUserListsRequest';
import MyAppBar from '../CommenComponents/MyAppBar';
import GetGroupsRequest from '../../Requests/GetGroupsRequest';
import NavDrawerItem from "../CommenComponents/NavDrawerItem";
import { Divider, Drawer } from 'material-ui';
import NavDrawerPersonalItem from '../CommenComponents/NavDrawerPersonalItem';
import NavDrawerCreateGroupItem from '../CommenComponents/NavDrawerCreateGroupItem';

export default class ListsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [<div key="something" />],
      open: false,
      groups: []
    };

    // bind the functions here
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

  componentWillMount(childCall) {
    // thi is part of the constructor, but it can be used as a callback function for a child node.
    if (childCall){
      this.setState({lists: false})
    }
    // call back function for getLists request function
    const getPersonalListCallback = (response) => {
      const listObjs = response.lists;
      console.log("list page")
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
          />)
      });
    };

    // send out the request
    GetUserListsRequest.get(getPersonalListCallback);
    GetGroupsRequest.get(navDrawerCallback);
  }

  // Handle the click event of Menu Button at AppBar
  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <PageTemplate>
        <MyAppBar
          title="Personal List"
          openDrawer={this.handleToggle}
          pageType="personal"
          reloadCallback={this.componentWillMount}
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
            <CreateList reloadCallback={this.componentWillMount} />
          </ul>
        </div>
      </PageTemplate>
    );
  }
}

