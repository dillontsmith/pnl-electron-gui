import React from 'react'
import Layout from './layout'
import SideBar from './sidebar'
import GridLayout from 'react-grid-layout'
import GraphView from './graphview'
import ToolTipBox from './tooltipbox'
import ParameterControlBox from './parametercontrolbox'
import { Resizable } from 're-resizable'

var w = window.innerWidth
var h = window.innerHeight

export default class Workspace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active_tooltip:'tea',
        outerGrid: {
        className: 'outergrid',
          margin: [0, 10],
          layout: [
          {
            i: 'outer_a',
            x: 0,
            y: 0,
            w: 12,
            h: 24
          },
          {
            i: 'outer_b',
            x: 0,
            y: 25,
            w: 12,
            h: 8
          },
        ],
          cols: 12,
          rowHeight: 30,
          width: 2560
      },
      horizontalResolution:w,
      verticalResolution:h,
      rowOneHorizontalFactor:430,
      rowOneVerticalFactor:24,
      rowTwoHorizontalFactor:430,
      rowTwoVerticalFactor:8,
      rowTwo: {
        className: 'row_two',
          layout: [
          {
            i: 'c',
            x: 0,
            y: 25,
            w: 430,
            h: 8
          },
          {
            i: 'd',
            x: 430,
            y: 25,
            w: 2130,
            h: 8
          },
        ],
          components: [],
          cols: 2560,
          rowHeight: 30,
          width: 2560
      }
    }
    this.resize_enabled = true
    this.componentWillMount = this.componentWillMount.bind(this)
    this.get_mouse_on_drag = this.get_mouse_on_drag.bind(this)
    this.get_mouse_initial = this.get_mouse_initial.bind(this)
    this.set_tool_tip = this.set_tool_tip.bind(this)
    this.set_components = this.set_components.bind(this)
    this.set_components()
  }

  set_components() {
    var self = this
  }

  set_tool_tip(text) {
    var stateWithNewText = {...this.state.active_tooltip}
    stateWithNewText = text
    this.setState({active_tooltip:stateWithNewText})
  }

  get_mouse_initial(e, dir, refToElement) {
    this.set_tool_tip('initial')
    this.mouse_initial = this.state.mouse
    this.mouse_direction = dir
  }
  get_mouse_on_drag(){
    console.log(this.state.rowOneHorizontalFactor)
    var self = this
    var mouse_current = self.state.mouse
    var mouse_initial = self.mouse_initial
    var offset = mouse_current.x - mouse_initial.x
    self.setState({rowOneHorizontalFactor:self.state.rowOneHorizontalFactor+offset})
    self.mouse_initial = mouse_current
    }

  componentWillUnmount() {
    window.removeEventListener('mousemove')
    window.removeEventListener('mousedown')
    window.removeEventListener('mouseup')
  }

  componentWillMount() {
    window.addEventListener('mousedown', (e) => {
      this.mouse_status = 'down'
      }
    )
    window.addEventListener('mousemove', (e) => {
      this.setState({mouse:e})
      }
    )
    window.addEventListener('mouseup', (e) => {
        this.mouse_status = 'up'
      }
    )
  }

  render() {
    var self = this
    var row_one_components = [
      <div key="a">
        <SideBar hover={() => this.set_tool_tip('sidebar')}
                 className='pnl-panel'
                 onResizeStart={this.get_mouse_initial}
                 onResizeStop={this.get_mouse_on_drag}
                 onResize={this.get_mouse_on_drag}
                 size={
                     {
                       height:(this.state.rowOneVerticalFactor * 30) + (this.state.rowOneVerticalFactor * 10) - 10,
                       width:this.state.rowOneHorizontalFactor - 10
                     }
                 }
        />
      </div>,
      <div key="b">
        <GraphView className='pnl-panel'
                   onResizeStart={this.get_mouse_initial}
                   onResizeStop={this.get_mouse_on_drag}
                   onResize={this.get_mouse_on_drag}
                   size={
                     {
                       height:(this.state.rowOneVerticalFactor * 30) + (this.state.rowOneVerticalFactor * 10) - 10,
                       width: this.state.horizontalResolution - this.state.rowOneHorizontalFactor - 10 - 10
                     }
                   }
                   // defaultSize={
                   //   {
                   //     height:(this.rowOneVerticalFactor * 30) + (this.rowOneVerticalFactor * 10),
                   //     width:'100%'
                   //   }
                   // }
        />
      </div>
    ]
    var row_two_components = [
      <div key="c">
        <ToolTipBox text={this.state.active_tooltip}
                    className='pnl-panel'/>
      </div>,
      <div key="d">
        <ParameterControlBox text={this.state.active_tooltip}
                             className='pnl-panel'/>
      </div>
    ]
    return (
      <Layout
        className={this.state.outerGrid.className}
        margin={this.state.outerGrid.margin}
        layout={this.state.outerGrid.layout}
        components={[
          <div key="outer_a">
            <Layout
              margin={[0,0]}
              className={'row_one'}
              layout={[
                {
                  i: 'a',
                  x: 10,
                  y: 0,
                  w: this.state.rowOneHorizontalFactor - 10,
                  h: 24
                },
                {
                  i: 'b',
                  x: this.state.horizontalResolution - this.state.rowOneHorizontalFactor - 10,
                  y: 0,
                  w: this.state.horizontalResolution - this.state.rowOneHorizontalFactor -10,
                  h: 24
                }
              ]}
              components={row_one_components}
              cols={this.state.horizontalResolution}
              rowHeight={30}
              width={this.state.horizontalResolution}
              preventCollision={true}/>
          </div>,
          <div key="outer_b">
            <Layout
              className={this.state.rowTwo.className}
              layout={this.state.rowTwo.layout}
              components={row_two_components}
              cols={this.state.rowTwo.cols}
              rowHeight={this.state.rowTwo.rowHeight}
              width={this.state.rowTwo.width}/>
          </div>
        ]}
        cols={this.state.outerGrid.cols}
        rowHeight={this.state.outerGrid.rowHeight}
        width={this.state.outerGrid.width}
      />
    )
  }
}