import React from 'react';
import ReactDOM from 'react';
import { PageTemplate } from 'components'
import {
  SearchBox,
  RefinementListFilter,
  Hits,
  NoHits,
  HitsStats,
  SearchkitComponent,
  SelectedFilters,
  MenuFilter,
  HierarchicalMenuFilter,
  Pagination,
  SearchkitManager,
  SearchkitProvider,
  ResetFilters
} from "searchkit";

const searchkit = new SearchkitManager("http://elastic.vfree.org/")

export default class HomePage extends SearchkitComponent {



  render() {
    return (
      <SearchkitProvider searchkit={searchkit}>
        <div>
          <SearchBox/>
          <Hits/>
          <NoHits />
        </div>
      </SearchkitProvider>
    );
  }
}

/*
ReactDOM.render((
  <SearchkitProvider searchkit={searchkit}>
    <div>
      <SearchApp/>
    </div>
  </SearchkitProvider>
),  document.getElementById('root'))
*/
