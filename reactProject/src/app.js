
import React,  { useState, useEffect } from "react";
import { getUserInfo } from './server/config';


import "./css/app.less";

import background from "./images/1.jpg";
import background2 from "./images/2.jpg";

function App() {
  console.log(process.env);
  useEffect(() => {
    console.log(111);
    getUserInfo({
      'id': 'LocalNews',
      'ajax': 'json'
    }).then((data) => {
      console.log('data---');
      console.log(data);
    }).catch(err => {
      console.log(err);
    });
  })
  return (
    <div>
      <div className="app">hello world22225677</div>
      <img className="background" src={background} alt=""/>
      <img className="background" src={background2} alt=""/>
    </div>
  );
}
export default App;
