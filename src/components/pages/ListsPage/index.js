import React from 'react'
import {PageTemplate} from 'components'
import {browserHistory} from 'react-router'
import List from './subComponent/List'
import cookie from 'react-cookie'
import Axios from 'axios'
import CreateList from './subComponent/CreateList'
import {AppBar, IconButton} from 'material-ui'
import Back from 'material-ui/svg-icons/hardware/keyboard-backspace'

export default class ListsPage extends React.Component {
  constructor() {
    super();
    this.getLists = this.getLists.bind(this);
    this.state = {lists: [<div key="something"></div>]};
    this.componentWillMount = this.componentWillMount.bind(this);
    this.styles = {
      bar: {
        width: '100%'
      },
      backButton: {},
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
    var that = this;
    const cb = (response) => {
      console.log(response);
      const listObjs = response['lists'];
      this.setState({
        lists: listObjs.filter((obj) => !obj['archived']).map((listObject) =>
          <List key={listObject['id']} id={listObject['id']} name={listObject['name']}
                reloadCallback={this.componentWillMount}/>)
      })
    };
    this.getLists(cb);
  }

  getLists(callback) {
    //todo: remove the hardcoded part
    const host = window.location.host;
    const token = cookie.load('Access-Token');

    var http = Axios.create({
      baseURL: "https://api.vfree.org",
      responseType: "json",
      headers: {"Access-Token": token},
    });

    http.get('/user/lists')
      .then((respond) => {
        if (respond.status === 200) {

          callback(respond.data);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 401) {
          console.log("invalid token");
        } else {
          console.log("invalid request of lists info1111");
        }
      })
  }


  render() {
    return (
      <PageTemplate>
        {console.log(this.props.location.query.id)}
        <AppBar style={this.styles.bar} title='Personal Lists'
                iconElementLeft={<IconButton style={this.styles.backButton} iconStyle={this.styles.backButton}
                                             onTouchTap={browserHistory.goBack}
                ><Back color={'#ffffff'}/></IconButton>}/>

        <div style={this.styles.root}>
          <ul style={this.styles.List}>
            {this.state.lists}
            <CreateList reloadCallback={this.componentWillMount}/>
          </ul>
        </div>
        {console.log(this.props.location.pathname === '/personal')}

      </PageTemplate>
    );
  }
}

