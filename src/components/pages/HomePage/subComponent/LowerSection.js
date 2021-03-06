import React from 'react';
import Axios from 'axios';
import cookie from 'react-cookie';
import Group from './Group';
import CreateGroup from './CreateGroup';

export default class LowerSection extends React.Component {
  constructor() {
    super();
    this.state = { groups: [] };
    this.getGroups = this.getGroups.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    const cb = (response) => {
      console.log(response);
      const listObjs = response.groups;
      this.setState({
        groups: listObjs.map((listObject) =>
          <Group key={listObject.id} id={listObject.id} name={listObject.name} />)
      });
    };
    this.getGroups(cb);
  }

  getGroups(callback) {
    const token = localStorage.token;

    const http = Axios.create({
      baseURL: 'https://api.vfree.org',
      responseType: 'json',
      headers: { 'Access-Token': token },
    });

    http.get('/user/groups')
      .then((respond) => {
        if (respond.status === 200) {
          callback(respond.data);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('error get group list');
      });
  }

  render() {
    return (
      <div style={{ display: 'inline-flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {console.log(this.state.groups)}
        {this.state.groups}
        <CreateGroup reloadCallback={this.componentWillMount} />
      </div>
    );
  }
}
