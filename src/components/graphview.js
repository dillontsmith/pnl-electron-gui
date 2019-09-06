import React from 'react';
import logo from '../resources/logo.svg'
import '../css/graphview.css'

class GraphView extends React.Component {
  render() {
    return(
      <div className="graph-view">
        <img src={logo} className="app-logo" alt="logo" />
      </div>
    )
  }
}

export default GraphView
