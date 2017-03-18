import React from 'react';
import Base64 from 'base-64';
import UTF8 from 'utf8';
import { PageTemplate } from 'components'
import Axios from 'axios'
import {
  SearchBox,
  Hits,
  NoHits,
  SearchkitComponent,
  SearchkitManager,
  SearchkitProvider
} from "searchkit";

const sk = new SearchkitManager("https://elastic.vfree.org/raspberry", {basicAuth:"ZWxhc3RpYzpjaGFuZ2VtZQ=="});
var http = Axios.create({
  baseURL: "https://api.vfree.org",
  responseType: "json",
  headers: {"Access-Token": token},
});
//const sk = new SearchkitManager("http://demo.searchkit.co/api/movies/")
/*searchkit.addDefaultQuery((query)=> {
  return query.addQuery(FilteredQuery({
    filter:BoolShould([
      TermQuery("tags", "123")
    ])
  }))
})*/

export default class Searchbar extends SearchkitComponent {
  render() {
    return (
        <div>
          <SearchkitProvider searchkit={sk}>
            <div>
              <SearchBox />
              <Hits />
              <NoHits />
            </div>
          </SearchkitProvider>
        </div>
    );
  }
}

