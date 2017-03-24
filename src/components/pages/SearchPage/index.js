import React from 'react';
import {
  SearchBox,
  Hits,
  NoHits,
  SearchkitComponent,
  SearchkitManager,
  SearchkitProvider,
  Layout, TopBar
} from 'searchkit';
import { Toolbar, ToolbarGroup, Popover, Menu, MenuItem, FlatButton } from 'material-ui';

const host = 'https://elastic.vfree.org/raspberry';
const sk = new SearchkitManager(host);

// Overrides how Search results are rendered
const HitItem = (props) => {
  const { _source } = props.result;
  return (
    <MenuItem primaryText={_source.title} secondaryText={_source.url}/>
  );
};

export default class SearchPage extends SearchkitComponent {
  constructor(props) {
    // props: { id: string, title: string, group: bool, groupId, list_id, refresh: function, vote}
    super(props);

    this.state = {
      open: false,
      anchorOrigin: {
        horizontal: 'left',
        vertical: 'bottom',
      },
      targetOrigin: {
        horizontal: 'left',
        vertical: 'top',
      },
    };

    this.closeDialog = this.closeDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  closeDialog() {
    this.setState({ open: false });
    this.props.refresh();
  }

  openDialog() {
    this.setState({ open: true });
  }

  displayHits = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <SearchkitProvider searchkit={sk}>
          <div>
            <div onFocus={this.displayHits}>
              <SearchBox searchOnChange={true} />
            </div>
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              onRequestClose={this.handleRequestClose}
            >
              <Hits hitsPerPage={10} itemComponent={HitItem} />
              <NoHits />
            </Popover>
          </div>
        </SearchkitProvider>
      </div>
    );
  }
}
