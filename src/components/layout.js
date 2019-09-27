import React from 'react'
import SideBar from './sidebar'
import GraphView from './graphview'
import ToolTipBox from './tooltipbox'
import ParameterControlBox from './parametercontrolbox'
import '../css/layout.css'
import '../../node_modules/react-grid-layout/css/styles.css'
import '../../node_modules/react-resizable/css/styles.css'
import GridLayout from 'react-grid-layout'

export default class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    // this.componentDidMount = this.componentDidMount.bind(this)
  }


  render() {
      // layout is an array of objects, see the demo for more complete usage
    return (
      <GridLayout className="layout"
                  layout={this.props.layout}
                  cols={12}
                  rowHeight={30}
                  width={2560}
                  isDraggable={false}
                  isResizable={false}>
        {
          this.props.components
        }
      </GridLayout>
    )
  }
}
