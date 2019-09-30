import React from 'react'
import Layout from './layout'
import SideBar from './sidebar'
import GridLayout from 'react-grid-layout'
import GraphView from './graphview'
import ToolTipBox from './tooltipbox'
import ParameterControlBox from './parametercontrolbox'

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
      rowOne: {
        className: 'row_one',
          layout: [
          {
            i: 'a',
            x: 0,
            y: 0,
            w: 430,
            h: 24
          },
          {
            i: 'b',
            x: 430,
            y: 0,
            w: 2130,
            h: 24
          }
        ],
          components: [],
          cols: 2560,
          rowHeight: 30,
          width: 2560
      },
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
    this.componentWillMount = this.componentWillMount.bind(this)
    this.get_mouse_on_drag = this.get_mouse_on_drag.bind(this)
    this.get_mouse_initial = this.get_mouse_initial.bind(this)
    this.set_tool_tip = this.set_tool_tip.bind(this)
    this.set_components = this.set_components.bind(this)
    this.set_components()
  }

  set_components() {
    var self = this
    var row_one_components = [
      <div key="a">
        <SideBar hover={() => this.set_tool_tip('sidebar')}
                 className='pnl-panel'
                 onResizeStart={this.get_mouse_initial}
                 onResize={function () {
                   self.get_mouse_on_drag(
                     {
                       'horizontal': [self.state.rowOne.components, 0],
                       'vertical': [self.state.outerGrid.components, 0]
                     },
                     {
                       'horizontal': [self.state.rowOne.layout,'rowOne'],
                       'vertical':  [self.state.outerGrid.layout,'outerGrid']
                     }
                   )
                 }}
        />
      </div>,
      <div key="b">
        <GraphView className='pnl-panel'/>
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
    var stateWithComponents = this.state
    stateWithComponents.rowOne.components = row_one_components
    stateWithComponents.rowTwo.components = row_two_components
    this.setState(stateWithComponents)
  }

  set_tool_tip(text) {
    var state = this.state
    state.active_tooltip = 'fdsjafkdjafls'
    this.setState(
      state
    )
  }

  get_mouse_initial(e, dir, refToElement) {
    // console.log(this.mouse_initial)
    this.set_tool_tip('initial')
    this.mouse_initial = this.state.mouse
    this.mouse_direction = dir
  }

  get_mouse_on_drag(component_arr, layout_arr) {
    this.set_tool_tip('on drag')
    var component_index = component_arr.horizontal[1]
    var mouse_current = this.state.mouse
    var mouse_initial = this.mouse_initial
    var mouse_direction = this.mouse_direction
    var self = this
    if (mouse_direction === 'right') {
      if (mouse_current.x > mouse_initial.x){
        var offset = mouse_current.x - mouse_initial.x
        var layout_key = layout_arr.horizontal[1]
        var new_layout = layout_arr.horizontal[0]
        new_layout[component_index].w += offset
        new_layout[component_index+1].w -= offset
        new_layout[component_index+1].x += offset
        var state = this.state
        state[layout_key].layout = new_layout
        self.setState(state)
        this.mouse_initial = mouse_current
        console.log(self.state)
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove')
  }

  componentWillMount() {
    window.addEventListener('mousemove', (e) => {
        this.setState({mouse:e})
      }
    )
    this.set_tool_tip('asdfasf')
  }

  render() {
    return (
      <Layout
        className={this.state.outerGrid.className}
        margin={this.state.outerGrid.margin}
        layout={this.state.outerGrid.layout}
        components={[
          <div key="outer_a">
            <Layout
              className={this.state.rowOne.className}
              layout={this.state.rowOne.layout}
              components={this.state.rowOne.components}
              cols={this.state.rowOne.cols}
              rowHeight={this.state.rowOne.rowHeight}
              width={this.state.rowOne.width}/>
          </div>,
          <div key="outer_b">
            <Layout
              className={this.state.rowTwo.className}
              layout={this.state.rowTwo.layout}
              components={this.state.rowTwo.components}
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