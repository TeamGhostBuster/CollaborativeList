/**
 * Created by pwnbo on 3/19/2017.
 */
import React from 'react';

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);

    this.q = '';
  }

  updateQ(qVal) {
    this.q = qVal;
  }

  // goToResults() {
  //   // browserHistory.push('/group?id='+this.props.id+'&name='+this.props.name);
  //   console.log(`searchQuery:${this.q}`);
  //   browserHistory.push({ pathname: '/search', query: { q: this.q } });
  // }

  render() {
    return (
      <form action={`/search${this.q}`} >
        <input type="text" name="q" onChange={this.updateQ(this.value)} />
        <button type="submit" value="Search" />
      </form>
    );
  }
}
