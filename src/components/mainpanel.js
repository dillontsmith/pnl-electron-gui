import React from 'react'
import SideBar from './sidebar'
import GraphView from './graphview'
import ToolTipBox from './tooltipbox'
import { ContextMenu, Menu, MenuItem } from '@blueprintjs/core'
import add_context_menu from '../utility/add_context_menu'

export default class MainPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active_tooltip:"starting tooltip"
    };
    this.set_tool_tip = this.set_tool_tip.bind(this);
  }

  set_tool_tip(text) {
    this.setState(
      { 'active_tooltip':text}
      )
  }

  render() {
    return (
      <div className="main-panel">
        <div className="primary-row">
          <SideBar hover={()=>this.set_tool_tip("sidebar")}/>
          <GraphView/>
        </div>
        <div className="information-row">
          <ToolTipBox text={this.state.active_tooltip}/>
          <GraphView/>
        </div>
      </div>
    )
  }
}
