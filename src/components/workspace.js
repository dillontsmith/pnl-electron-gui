import React from 'react'
import Layout from './layout'
import SideBar from './sidebar'
import GraphView from './graphview'
import ToolTipBox from './tooltipbox'
import ParameterControlBox from './parametercontrolbox'

export default class Workspace extends React.Component {
  constructor(props) {
    super(props)
    var w = window.innerWidth
    var h = window.innerHeight
    this.calculateHorizontalFactor = function (x) {
      return Math.ceil(x/5)
    }
    this.calculateVerticalFactor = function (y) {
      return Math.ceil(y*0.7)
    }
    this.state = {
      active_tooltip: 'tea',
      xRes: w,
      yRes: h,
      rowOneHorizontalFactor: this.calculateHorizontalFactor(w),
      rowTwoHorizontalFactor: this.calculateHorizontalFactor(w),
      verticalFactor: this.calculateVerticalFactor(h),
    }
    this.componentWillMount = this.componentWillMount.bind(this)
    this.panel_resize = this.panel_resize.bind(this)
    this.get_mouse_initial = this.get_mouse_initial.bind(this)
    this.set_tool_tip = this.set_tool_tip.bind(this)
    this.set_components = this.set_components.bind(this)
    this.window_resize = this.window_resize.bind(this)
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

  get_mouse_initial() {
    this.mouse_initial = this.state.mouse
  }

  window_resize() {
    var old_xRes = this.state.xRes
    var old_yRes = this.state.yRes
    var old_r1_h_factor = this.state.rowOneHorizontalFactor
    var old_r2_h_factor = this.state.rowTwoHorizontalFactor
    var old_v_factor = this.state.verticalFactor
    var w = window.innerWidth
    var h = window.innerHeight
    this.setState({
      xRes:w,
      yRes:h,
      rowOneHorizontalFactor: (old_r1_h_factor/old_xRes)*w,
      rowTwoHorizontalFactor: (old_r2_h_factor/old_xRes)*w,
      verticalFactor: (old_v_factor/old_yRes)*h
    })
  }

  panel_resize(horizontal_factor, vertical_factor, e, direction, ref, d) {
    var self = this
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
    window.removeEventListener('resize')
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
    window.addEventListener('resize', this.window_resize)
  }

  render() {
    var self = this
    var padding = 10
    var components = [
      <div key="a">
        <SideBar
          hover={() => this.set_tool_tip('sidebar')}
          className='pnl-panel'
          onResizeStart={this.get_mouse_initial}
          onResize={function (e, direction, ref, d) {
            self.panel_resize('rowOneHorizontalFactor', 'verticalFactor', e, direction, ref, d)
          }}
          onResizeStop={function (e, direction, ref, d) {
            self.panel_resize('rowOneHorizontalFactor', 'verticalFactor', e, direction, ref, d)
          }}
          size={
            {
              height: this.state.verticalFactor - padding,
              width: this.state.rowOneHorizontalFactor - padding
            }
          }
        />
      </div>,
      <div key="b">
        <GraphView
          className='pnl-panel'
          onResizeStart={this.get_mouse_initial}
          onResize={function (e, direction, ref, d) {
            self.panel_resize('rowOneHorizontalFactor', 'verticalFactor', e, direction, ref, d)
          }}
          onResizeStop={function (e, direction, ref, d) {
            self.panel_resize('rowOneHorizontalFactor', 'verticalFactor', e, direction, ref, d)
          }}
          size={
            {
              height: this.state.verticalFactor - padding,
              width: this.state.xRes - this.state.rowOneHorizontalFactor - padding * 2
            }
          }
        />
      </div>,
      <div key="c">
        <ToolTipBox
          text={this.state.active_tooltip}
          className='pnl-panel'
          onResizeStart={this.get_mouse_initial}
          onResizeStop={function (e, direction, ref, d) {
            self.panel_resize('rowTwoHorizontalFactor', 'verticalFactor', e, direction, ref, d)
          }}
          onResize={function (e, direction, ref, d) {
            self.panel_resize('rowTwoHorizontalFactor', 'verticalFactor', e, direction, ref, d)
          }}
          size={
            {
              height: this.state.yRes - this.state.verticalFactor - padding * 2,
              width: this.state.rowTwoHorizontalFactor - padding
            }
          }/>
      </div>,
      <div key="d">
        <ParameterControlBox
          text={this.state.active_tooltip}
          className='pnl-panel'
          onResizeStart={this.get_mouse_initial}
          onResizeStop={function (e, direction, ref, d) {
            self.panel_resize('rowTwoHorizontalFactor', 'verticalFactor', e, direction, ref, d)
          }}
          onResize={function (e, direction, ref, d) {
            self.panel_resize('rowTwoHorizontalFactor', 'verticalFactor', e, direction, ref, d)
          }}
          size={
            {
              height: this.state.yRes - this.state.verticalFactor - padding * 2,
              width: this.state.xRes - this.state.rowTwoHorizontalFactor - padding * 2
            }
          }/>
      </div>
    ]
    return (
      <Layout
        className={'workspace_grid'}
        margin={[0, 0]}
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
            x: this.state.rowOneHorizontalFactor,
            y: 0,
            w: this.state.xRes - this.state.rowOneHorizontalFactor,
            h: this.state.verticalFactor
          },
          {
            i: 'c',
            x: 0,
            y: this.state.verticalFactor,
            w: this.state.rowTwoHorizontalFactor,
            h: this.state.yRes - this.state.verticalFactor
          },
          {
            i: 'd',
            x: this.state.rowTwoHorizontalFactor,
            y: this.state.verticalFactor,
            w: this.state.xRes - this.state.rowTwoHorizontalFactor,
            h: this.state.yRes - this.state.verticalFactor
          }
        ]}
        cols={this.state.xRes}
        rowHeight={1}
        width={this.state.xRes}
        components={components}
      />
    )
  }
}