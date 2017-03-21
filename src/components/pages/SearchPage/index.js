import React from 'react';
import { PageTemplate } from 'components';

import GetArticlesRequest from '../../../Requests/GetArticlesRequest';
import MyAppBar from '../CommenComponents/MyAppBar'
import {
  SearchBox,
  Hits,
  NoHits,
  SearchkitComponent,
  SearchkitManager,
  SearchkitProvider
} from 'searchkit';

const host = 'https://elastic.vfree.org/raspberry';
const sk = new SearchkitManager(host);

constructor()
{
  // props: {id: list id, name: list name, reloadCallback:fucntion, group: "true", groupId }
  super();

  this.getArticles = this.getArticles.bind(this);
}

getArticles(callback) {
  // send the get request
  GetArticlesRequest.get(
    this.props.id,
    this.props.group,
    this.props.groupId,
    callback
  );
}

// Overrides how Search results are rendered
const HitItem = (props) => (
  <div className={props.bemBlocks.item().mix(props.bemBlocks.container('item'))}>
    <div
      className={props.bemBlocks.item('title')}
      dangerouslySetInnerHTML={{ __html: _.get(props.result, 'highlight.title', props.result._source.title) }}
    />
    <div
      className={props.bemBlocks.item('id')}
      dangerouslySetInnerHTML={{ __html: _.get(props.result, 'highlight.id', props.result._source.id) }}
    />

  </div>
);

export default class SearchResults extends SearchkitComponent {
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
            <Hits hitsPerPage={10} itemComponent={HitItem} />
            <NoHits />
          </div>
        </SearchkitProvider>
      </PageTemplate>
    );
  }
}

