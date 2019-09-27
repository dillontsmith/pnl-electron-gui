import React from 'react'
import Layout from './layout'
import SideBar from './sidebar'
import GridLayout from 'react-grid-layout'
import GraphView from './graphview'
import ToolTipBox from './tooltipbox'
import ParameterControlBox from './parametercontrolbox'

export default class Workspace extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      active_tooltip: 'starting_tooltip',
    }
    this.componentWillMount = this.componentWillMount.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.get_mouse_on_drag = this.get_mouse_on_drag.bind(this)
    this.set_tool_tip = this.set_tool_tip.bind(this)
    var mouse
  }

  set_tool_tip(text) {
    this.setState(
      { 'active_tooltip': text }
    )
  }

  get_mouse_on_drag() {
    console.log(this.state.mouse)
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove')
  }

  componentWillMount() {
    window.addEventListener('mousemove',(e)=>
      {
        this.state.mouse = e
      }
    )
    this.setState({
        layout:[
          {i: 'a', x: 0, y: 0, w: 2,  h: 24},
          {i: 'b', x: 2, y: 0, w: 10,  h: 24},
          {i: 'c', x: 0, y: 25, w: 2, h: 8},
          {i: 'd', x: 2, y: 25, w: 10, h: 8},
        ],
        components: [
          <div key="a">
            <SideBar hover={() => this.set_tool_tip('sidebar')}
                     className='pnl-panel'
                     // onResize={this.get_mouse_on_drag}
                     onResizeStart={this.get_mouse_on_drag}
            />
          </div>,
          <div key="b">
            <GraphView className='pnl-panel'/>
          </div>,
          <div key="c">
            <ToolTipBox text={this.state.active_tooltip}
                        className='pnl-panel'/>
          </div>,
          <div key="d">
            <ParameterControlBox text={this.state.active_tooltip}
                                 className='pnl-panel'/>
          </div>
        ]
      }
    )
  }

  componentDidMount(){}

  render(){
    return(
      <Layout
      layout={this.state.layout}
      components={this.state.components}
      />
    )
  }
}