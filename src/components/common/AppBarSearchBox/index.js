import React from 'react';
import { AutoComplete, Paper, MenuItem } from 'material-ui';
import { Client } from 'elasticsearch';
import { SearchItem } from 'components';

class AppBarSearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      inputValue: ''
    };

    this.styles = {
      height: 40,
      width: 400,
      margin: 8,
      display: 'inline-block'
    };

    this.client = new Client({
      host: 'https://elastic.vfree.org'
    });

    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.performSearch = this.performSearch.bind(this);
    this.makeMap = this.makeMap.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  makeMap = (item) => {
    return {
      text: item.title,
      value: (
        <SearchItem
          title={item.title}
          articleId={item.id}
        />
      )
    };
  };

  performSearch() {
    if (this.state.inputValue !== '') {
      this.client.search({
        index: 'raspberry',
        body: {
          query: {
            match_phrase_prefix: {
              title: this.state.inputValue
            }
          }
        }
      }).then((res) => {
        const hitItems = res.hits.hits.map((each) => each._source);
        this.setState({
          dataSource: hitItems.map((each) => this.makeMap(each))
        });
      }, (err) => {
        console.log(err);
      });
    }
  }

  handleAdd = (shit, index) => {
    // TODO
  };

  handleUpdateInput = (value) => {
    const self = this;
    this.setState({
      inputValue: value
    }, () => {
      self.performSearch();
    });
  };

  render() {
    return (
      <Paper style={this.styles} zDepth={1} >
        <AutoComplete
          hintText="Search"
          dataSource={this.state.dataSource}
          filter={AutoComplete.noFilter}
          onUpdateInput={(val) => this.handleUpdateInput(val)}
          onNewRequest={(shit, index) => this.handleAdd(shit, index)}
          fullWidth
        />
      </Paper>
    );
  }
}

AppBarSearchBox.propTypes = {
  pageType: React.PropTypes.string.isRequired,
  groupId: React.PropTypes.string,
  reloadCallback: React.PropTypes.func.isRequired
};

export default AppBarSearchBox;
