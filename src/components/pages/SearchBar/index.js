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
    //used in express
    TermQuery,
    FilteredQuery,
    BoolShould,
  ResetFilters
} from "searchkit";

/*
SearchkitExpress = require("searchkit-express")
var app = express()

SearchkitExpress({
    host:process.env.ELASTIC_URL || "http://elastic.vfree.org",
    index:'raspberry',
    queryProcessor:function(query, req, res){
        //do neccessery permissions, prefilters to query object

        //then return it
        return query
    }
  }, app)
*/

const searchkit = new SearchkitManager("https://elastic.vfree.org/raspberry/")
/*searchkit.addDefaultQuery((query)=> {
    return query.addQuery(FilteredQuery({
      filter:BoolShould([
        TermQuery("colour", "red"),
        TermQuery("colour", "orange")
      ])
    }))
 })
 */


export default class HomePage extends SearchkitComponent {


  render() {
    return (
        <div>
          <SearchkitProvider searchkit={searchkit}>
            <div>
              <SearchBox/>
              <Hits mod="sk-hits-grid" hitsPerPage={10}/>
              <NoHits />
            </div>
          </SearchkitProvider>
        </div>
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
