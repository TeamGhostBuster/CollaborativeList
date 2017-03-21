import React from 'react';
import {
  SearchBox,
  Hits,
  NoHits,
  SearchkitComponent,
  SearchkitManager,
  SearchkitProvider
} from 'searchkit';
import { PageTemplate } from 'components';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import MyAppBar from '../CommenComponents/MyAppBar';
import ArticleDialog from '../CommenComponents/List/ListSub/ArticleSub/ArticleDialog';

const host = 'https://elastic.vfree.org/raspberry';
const sk = new SearchkitManager(host);

// Overrides how Search results are rendered
const HitItem = (props) => {
  const { bemBlocks, result } = props;
  return (
  //   {/*<Card className={props.bemBlocks.item().mix(props.bemBlocks.container('item'))} >*/}
  //     {/*<CardHeader title={result._source.title} className={bemBlocks.item('title')} />*/}
  //     {/*<CardText />*/}
  //     {/*<Toolbar style={{ backgroundColor: 'white' }}>*/}
  //       {/*<ToolbarGroup firstChild>*/}
  //         {/*<RaisedButton buttonStyle={{ height: '100%' }} label="Details" onTouchTap={this.openDialog} />*/}
  //       {/*</ToolbarGroup>*/}
  //     {/*</Toolbar>;*/}
  // {/*</Card>*/}
  // {/*<ArticleDialog*/}
  //   {/*isOpen={this.state.open} close={this.closeDialog} list_id={this.props.list_id}*/}
  //   {/*id={this.props.id}*/}
  // {/*/>*/}
  <Card className={props.bemBlocks.item().mix(props.bemBlocks.container('item'))}>
    <div
      className={props.bemBlocks.item('title')}
      dangerouslySetInnerHTML={{ __html: _.get(props.result, 'highlight.title', props.result._source.title) }}
    />
    <div
      className={props.bemBlocks.item('description')}
      dangerouslySetInnerHTML={{ __html: props.result._source.description }}
    />
  </Card>
  );
};

export default class SearchResults extends SearchkitComponent {
  constructor(props) {
    // props: { id: string, title: string, group: bool, groupId, list_id, refresh: function, vote}
    super(props);
    this.state = { open: false };

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

  render() {
    return (
      <PageTemplate>
        <SearchkitProvider searchkit={sk}>
          <div>
            <MyAppBar
              title="Search Results"
              openDrawer={this.handleToggle}
            />
            <SearchBox />
            <Hits mod="sk-hits-grid" hitsPerPage={10} itemComponent={HitItem} />
            <NoHits />
          </div>
        </SearchkitProvider>
      </PageTemplate>
    );
  }
}

// {/*<div className={props.bemBlocks.item().mix(props.bemBlocks.container('item'))}>*/}
//   <ArticleCard
//     key={props.bemBlocks.item('id')} id={props.bemBlocks.item('id')} list_id=''
//     title={props.bemBlocks.item('title')} group='false' groupId=''
//     refresh={this.componentWillMount} vote={article.vote_count}
//   />
// {/*</div>*/}
