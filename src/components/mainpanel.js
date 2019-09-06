import React from 'react'
import SideBar from './sidebar'
import GraphView from './graphview'
import ToolTipBox from './tooltipbox'

export default class MainPanel extends React.Component {
  render() {
    return (
      <div className="main-panel">
        <div className="primary-row">
          <SideBar/>
          <GraphView/>
        </div>
        <div className="information-row">
          <ToolTipBox/>
          <GraphView/>
        </div>
      </div>
    )
  }
}
