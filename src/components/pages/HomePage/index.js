import React from 'react'
import { PageTemplate } from 'components'
import {browserHistory} from 'react-router'
import UpperSection from './subComponent/UpperSection'
import LowerSection from './subComponent/LowerSection'

const getGroupJason = () => {

};

// function getListsJason() {
//   var xhr = new XMLHttpRequest();
//
//   // TODO: the url
//   const url = "http://127.0.0.1:3000";
//   xhr.open('GET',url+'/lists');
//   //todo: xhr.setRequestHeader("")
//   //const token = cookie.load('Access-Token');
//   //xhr.setRequestHeader("Access-Token",token);
//   //xhr.setRequestHeader("Provier-Name","Google");
//
//   xhr.onreadystatechange = () => {
//     // 4 is done
//     if (xhr.readyState===4){
//       if (xhr.status == 200){
//         console.log(xhr.responseText);
//       } else {
//         console.log("invalid");
//       }
//     }
//   };
//
//   xhr.send(null);
//
// }


export default class HomePage extends React.Component {

  render() {

    return (
      <PageTemplate>
        {console.log(window.location.host)}
        <UpperSection/>
        <LowerSection/>
      </PageTemplate>
    );
  }
}

