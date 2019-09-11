import React from 'react'
import logo from '../resources/logo.svg'
import '../css/graphview.css'
import example_gv from '../resources/basic_composition_gv'
import * as d3 from 'd3'
import * as d3Graphviz from 'd3-graphviz'

const _ = d3Graphviz.graphviz

class GraphView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      class: `graph-view ${this.props.className}`
    }
  }

  componentDidMount() {
    this.setGraph()
  }

  setGraph() {
    d3.select('.inner_svg')
      .graphviz()
      .width(parseInt(
        d3.select('.outer_svg')
          .style('width')
        )
      )
      .height(parseInt(
        d3.select('.outer_svg')
          .style('height')
        )
      )
      .renderDot(example_gv)
  }

  render() {
    return (
      <div className={this.state.class}>
        <svg className="outer_svg"
             width="100%"
             height="100%">
          <svg className={"inner_svg"}/>
        </svg>
      </div>
    )
  }
}

export default GraphView
