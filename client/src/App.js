import React from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  var capturedLink = getUrlVars()["link"];
  console.log("captured link is: "+capturedLink);
  React.useEffect(() => {
    Axios.get('/api?link='+capturedLink).then(response => {
      document.head.innerHTML = document.head.innerHTML+ response.data.metaTags.join('\n');
    })
  },[]);

  return (
    <div className="App">
      <iframe id = "iframelinkshare"
        src = {capturedLink}
        title = "iframe"> 
      </iframe> 
    </div>
  );
}

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

export default App;
