import React from 'react';
import { AutoComplete, Paper, MenuItem, ToolbarGroup, IconButton } from 'material-ui';
import { Client } from 'elasticsearch';
import { SearchItem } from 'components';
import SearchIcon from 'material-ui/svg-icons/action/search'
import CancelIcon from 'material-ui/svg-icons/navigation/cancel'
import SearchResultDialog from './SearchResultDialog'

class AppBarSearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      inputValue: '',
      dialog: false
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
    this.dialogClose = this.dialogClose.bind(this);
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

  dialogClose(){
    this.setState({dialog:false});
  }

  handleAdd = (shit, index) => {
    if (index !== -1){

      console.log("app bar search box:" ,this.props.lists,this.state.dataSource,index);
      const articleId = this.state.dataSource.length <= index? this.state.dataSource[0].value.props.articleId : this.state.dataSource[index].value.props.articleId;

      this.setState({dialog: <SearchResultDialog pageType={this.props.pageType} groupId={this.props.groupId}
                                                 isOpen={true} close={this.dialogClose} id={articleId} lists={this.props.lists} reloadCallback={this.props.reloadCallback} />})
    }
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
      <Paper style={this.styles} zDepth={1}>
          <IconButton iconStyle={{color:'#9E9E9E'}} style={{cursor:'auto', bottom:'2px'}}><SearchIcon/></IconButton>
        <AutoComplete
          hintText="Search"
          dataSource={this.state.dataSource}
          filter={AutoComplete.noFilter}
          searchText={this.state.inputValue}
          onUpdateInput={(val) => this.handleUpdateInput(val)}
          onNewRequest={(shit, index) => {this.handleAdd(shit, index)}}
          listStyle={{color:'white'}}
          style={{width:"75%",bottom:'10px'}}

        />
        {this.state.dialog}
          {this.state.inputValue === ''? undefined : <IconButton style={{bottom:'2px'}} iconStyle={{color:'#9E9E9E'}}
                                                                 onTouchTap={()=>{this.setState({inputValue:''})}}><CancelIcon/></IconButton>}
      </Paper>
    );
  }
}

AppBarSearchBox.propTypes = {
  pageType: React.PropTypes.string.isRequired,
  groupId: React.PropTypes.string,
  reloadCallback: React.PropTypes.func.isRequired,
  lists: React.PropTypes.array.isRequired
};

export default AppBarSearchBox;
