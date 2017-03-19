import React from 'react';
import { PageTemplate } from 'components';
import AppBar from 'material-ui/AppBar';
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

// Overrides how Search results are rendered
const HitItem = (props) => (
  <div className={props.bemBlocks.item().mix(props.bemBlocks.container('item'))}>
    <div className={props.bemBlocks.item('title')} dangerouslySetInnerHTML={{ __html: _.get(props.result, 'highlight.title', props.result._source.title) } } />
  </div>
);

export default class SearchResults extends SearchkitComponent {
  render() {
    return (
      <PageTemplate>
        <SearchkitProvider searchkit={sk}>
          <div>
            <AppBar title="HomePage" iconElementLeft={<div />} iconElementRight={<SearchBox />} />
            <Hits mod hitsPerPage={5} itemComponent={HitItem} />
            <NoHits />
          </div>
        </SearchkitProvider>
      </PageTemplate>
    );
  }
}

