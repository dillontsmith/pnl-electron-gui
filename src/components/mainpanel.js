import React from 'react'
import SideBar from './sidebar'
import GraphView from './graphview'
import ToolTipBox from './tooltipbox'
import ParameterControlBox from './parametercontrolbox'
// import '../css/mainpanel.css'
import '../../node_modules/react-grid-layout/css/styles.css'
import '../../node_modules/react-resizable/css/styles.css'
import GridLayout from 'react-grid-layout'

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
      // layout is an array of objects, see the demo for more complete usage
    var layout = [
      {i: 'a', x: 0, y: 0, w: 2,  h: 24},
      {i: 'b', x: 2, y: 0, w: 10,  h: 24},
      {i: 'c', x: 0, y: 25, w: 2, h: 8},
      {i: 'd', x: 2, y: 25, w: 10, h: 8},
    ];
    return (
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={2560} isDraggable={false}>
        <div key="a">
          <SideBar hover={() => this.set_tool_tip('sidebar')} className='pnl-panel'/>
        </div>
        <div key="b">
          <GraphView className='pnl-panel'/>
        </div>
        <div key="c">
          <ToolTipBox text={this.state.active_tooltip} className='pnl-panel'/>
        </div>
        <div key="d">  <ParameterControlBox text={this.state.active_tooltip} className='pnl-panel'/> </div>
      </GridLayout>
    )
  }

  //
  // render() {
  //   return (
  //     <div className="main-panel">
  //
  //       <SideBar
  //         hover={() => this.set_tool_tip('sidebar')}
  //         className='pnl-panel'/>
  //
  //       <GraphView
  //         className='pnl-panel'/>
  //

  //
  //       <ParameterControlBox
  //         text={this.state.active_tooltip}
  //         className='pnl-panel'/>
  //
  //     </div>
  //   )
  // }
}
