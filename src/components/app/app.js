// import packages
import React from 'react';

// import css
import '../../css/app.css';
import '../../css/sidebar.css'

// import components
import SideBar from '../sidebar/sidebar'
import MainPanel from '../main-panel/main-panel'

function App() {
  return (
    <div className="app">

      <div className="sidebar-wrapper">
        <div className="sidebar">
          <SideBar/>
        </div>
      </div>
      <div className="main-panel">
        <MainPanel />
      </div>

    </div>
  );
}

export default App;
