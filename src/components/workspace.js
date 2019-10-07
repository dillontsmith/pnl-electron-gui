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
      active_tooltip: 'tea',
      horizontalResolution: w,
      verticalResolution: h,
      rowOneHorizontalFactor: Math.ceil(w/5),
      verticalFactor: Math.ceil(h*0.7),
      rowTwoHorizontalFactor: Math.ceil(w/5),
    }
    this.resize_enabled = true
    this.componentWillMount = this.componentWillMount.bind(this)
    this.resize = this.resize.bind(this)
    this.get_mouse_initial = this.get_mouse_initial.bind(this)
    this.set_tool_tip = this.set_tool_tip.bind(this)
    this.set_components = this.set_components.bind(this)
    this.set_components()
  }

  set_components() {
    var self = this
  }

  set_tool_tip(text) {
    var stateWithNewText = { ...this.state.active_tooltip }
    stateWithNewText = text
    this.setState({ active_tooltip: stateWithNewText })
  }

  get_mouse_initial(e, dir, refToElement) {
    this.set_tool_tip('initial')
    this.mouse_initial = this.state.mouse
    this.mouse_direction = dir
  }

  resize(horizontal_factor, vertical_factor, e, direction, ref, d) {
    var self = this
    console.log(horizontal_factor, vertical_factor, e, direction, ref, d)
    var mouse_current = self.state.mouse
    var mouse_initial = self.mouse_initial
    var offset_hor = mouse_current.x - mouse_initial.x
    var offset_ver = mouse_current.y - mouse_initial.y
    if (['bottomRight', 'bottomLeft', 'topRight', 'topLeft'].includes(direction)) {
      self.setState({ [horizontal_factor]: self.state[horizontal_factor] + offset_hor })
      self.setState({ [vertical_factor]: self.state[vertical_factor] + offset_ver })
    } else if (['left', 'right'].includes(direction)) {
      self.setState({ [horizontal_factor]: self.state[horizontal_factor] + offset_hor })
    } else {
      self.setState({ [vertical_factor]: self.state[vertical_factor] + offset_ver })
    }
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
        this.setState({ mouse: e })
      }
    )
    window.addEventListener('mouseup', (e) => {
        this.mouse_status = 'up'
      }
    )
  }

  render() {
    var self = this
    var padding = 0
    var row_one_components = [
      <div key="a">
        <SideBar hover={() => this.set_tool_tip('sidebar')}
                 className='pnl-panel'
                 onResizeStart={this.get_mouse_initial}
                 onResize={function (e, direction, ref, d) {
                   self.resize('rowOneHorizontalFactor', 'verticalFactor', e, direction, ref, d)
                 }}
                 onResizeStop={function (e, direction, ref, d) {
                   self.resize('rowOneHorizontalFactor', 'verticalFactor', e, direction, ref, d)
                 }}
                 size={
                   {
                     height: this.state.verticalFactor,
                     width: this.state.rowOneHorizontalFactor
                   }
                 }
        />
      </div>,
      <div key="b">
        <GraphView className='pnl-panel'
                   onResizeStart={this.get_mouse_initial}
                   onResize={function (e, direction, ref, d) {
                     self.resize('rowOneHorizontalFactor', 'verticalFactor', e, direction, ref, d)
                   }}
                   onResizeStop={function (e, direction, ref, d) {
                     self.resize('rowOneHorizontalFactor', 'verticalFactor', e, direction, ref, d)
                   }}
                   size={
                     {
                       height: this.state.verticalFactor,
                       width: this.state.horizontalResolution - this.state.rowOneHorizontalFactor
                     }
                   }
        />
      </div>
    ]
    var row_two_components = [
      <div key="c">
        <ToolTipBox
          text={this.state.active_tooltip}
          className='pnl-panel'
          onResizeStart={this.get_mouse_initial}
          onResizeStop={function (e, direction, ref, d) {
            self.resize('rowTwoHorizontalFactor', 'verticalFactor', e, direction, ref, d)
          }}
          onResize={function (e, direction, ref, d) {
            self.resize('rowTwoHorizontalFactor', 'verticalFactor', e, direction, ref, d)
          }}
          size={
            {
              height: this.state.verticalResolution - this.state.verticalFactor,
              width: this.state.rowTwoHorizontalFactor
            }
          }/>
      </div>,
      <div key="d">
        <ParameterControlBox
          text={this.state.active_tooltip}
          className='pnl-panel'
          onResizeStart={this.get_mouse_initial}
          onResizeStop={function (e, direction, ref, d) {
            self.resize('rowTwoHorizontalFactor', 'verticalFactor', e, direction, ref, d)
          }}
          onResize={function (e, direction, ref, d) {
            self.resize('rowTwoHorizontalFactor', 'verticalFactor', e, direction, ref, d)
          }}
          size={
            {
              height: this.state.verticalResolution - this.state.verticalFactor,
              width: this.state.horizontalResolution - this.state.rowTwoHorizontalFactor
            }
          }/>
      </div>
    ]
    return (
      <Layout
        className={'outergrid'}
        margin={[0, 0]}
        layout={[
          {
            i: 'outer_a',
            x: 0,
            y: 0,
            w: this.state.horizontalResolution,
            h: this.state.verticalFactor
          },
          {
            i: 'outer_b',
            x: 0,
            y: this.state.verticalResolution - this.state.verticalFactor,
            w: this.state.horizontalResolution,
            h: this.state.verticalResolution - this.state.verticalFactor
          },
        ]}
        cols={this.state.horizontalResolution}
        rowHeight={1}
        width={this.state.horizontalResolution}
        components={[
          <div key="outer_a">
            <Layout
              margin={[0, 0]}
              className={'row_one'}
              layout={[
                {
                  i: 'a',
                  x: 0,
                  y: 0,
                  w: this.state.rowOneHorizontalFactor,
                  h: this.state.verticalFactor
                },
                {
                  i: 'b',
                  x: this.state.horizontalResolution - this.state.rowOneHorizontalFactor,
                  y: 0,
                  w: this.state.horizontalResolution - this.state.rowOneHorizontalFactor,
                  h: this.state.verticalFactor
                }
              ]}
              components={row_one_components}
              cols={this.state.horizontalResolution}
              rowHeight={1}
              width={this.state.horizontalResolution}
            />
          </div>,
          <div key="outer_b">
            <Layout
              margin={[0, 0]}
              className={'row_two'}
              layout={[
                {
                  i: 'c',
                  x: 0,
                  y: 0,
                  w: this.state.rowTwoHorizontalFactor,
                  h: this.state.verticalResolution - this.state.verticalFactor
                },
                {
                  i: 'd',
                  x: this.state.horizontalResolution - this.state.rowTwoHorizontalFactor,
                  y: 0,
                  w: this.state.horizontalResolution - this.state.rowTwoHorizontalFactor,
                  h: this.state.verticalResolution - this.state.verticalFactor
                },
              ]}
              components={row_two_components}
              cols={this.state.horizontalResolution}
              rowHeight={1}
              width={this.state.horizontalResolution}/>
          </div>
        ]}
      />
    )
  }
}