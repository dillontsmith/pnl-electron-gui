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
      class: `graph-view ${this.props.className}`,
      mounted: false
    }
    this.updateDimensions = this.updateDimensions.bind(this)
    this.updateAndSetGraph = this.updateAndSetGraph.bind(this)
  }

  updateDimensions() {
    var
      w = window
    this.setState({
        width: w.innerWidth,
        height: w.innerHeight,
      }
    )
  }

  componentWillMount() {
    this.updateDimensions()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateAndSetGraph)
  }

  componentDidMount() {
    if (!this.state.mounted) {
      this.setGraph()
      this.setState({mounted: true})}
    window.addEventListener('resize', this.updateAndSetGraph)
  }

  updateAndSetGraph() {
    this.updateDimensions()
    this.setGraph()
  }

  setGraph() {
    d3.select('.inner_svg')
      .graphviz()
      .width(this.state.width)
      .height(this.state.height)
      .renderDot(example_gv)
    console.log(this.getOffset())
  }

  getOffset() {
    let inner_svg_bounds = d3.select('.inner_svg').node().getBoundingClientRect()
    let outer_svg_bounds = d3.select('.outer_svg').node().getBoundingClientRect()
    let offset_right = outer_svg_bounds.right - inner_svg_bounds.right
    let offset_bottom = outer_svg_bounds.bottom - inner_svg_bounds.bottom
    let offset_left = outer_svg_bounds.left - inner_svg_bounds.left
    let offset_top = outer_svg_bounds.top - inner_svg_bounds.top
    return {
      'offset_right':offset_right
    }
  }
  render() {
    return (
      <div className={this.state.class}>
        <svg className="outer_svg"
             width="100%"
             height="100%">
          <svg className={'inner_svg'}/>
        </svg>
      </div>
    )
  }
}

export default GraphView
