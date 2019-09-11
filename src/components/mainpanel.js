import React from 'react'
import SideBar from './sidebar'
import GraphView from './graphview'
import ToolTipBox from './tooltipbox'
import ParameterControlBox from './parametercontrolbox'
import '../css/mainpanel.css'

export default class MainPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active_tooltip: 'starting tooltip'
    }
    this.set_tool_tip = this.set_tool_tip.bind(this)
  }

  set_tool_tip(text) {
    this.setState(
      { 'active_tooltip': text }
    )
  }

  render() {
    return (
      <div className="main-panel">

        <SideBar
          hover={() => this.set_tool_tip('sidebar')}
          className='pnl-panel'/>

        <GraphView
          className='pnl-panel'/>

        <ToolTipBox
          text={this.state.active_tooltip}
          className='pnl-panel'/>

        <ParameterControlBox
          text={this.state.active_tooltip}
          className='pnl-panel'/>

      </div>
    )
  }
}
