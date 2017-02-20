import React from 'react'

import { PageTemplate } from 'components'

const getListsJason = () => {
  var xhr = new XMLHttpRequest();

  // TODO: the url
  xhr.open('GET','user');
  //todo: xhr.setRequestHeader("")

  xhr.onreadystatechange = () => {
    // 4 is done

  }

}

const getGroupJason = () => {

}

const HomePage = () => {
  return (
    <PageTemplate>
      <h1>Hello World</h1>
      <div>

      </div>
    </PageTemplate>
  )
}

export default HomePage
