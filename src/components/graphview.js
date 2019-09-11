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
    this.setGraph = this.setGraph.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
    this.updateAndSetGraph = this.updateAndSetGraph.bind(this)
    this.transformGraph = this.transformGraph.bind(this)
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

      this.updateAndSetGraph()
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
      .zoom(false)
      .renderDot(example_gv)
  }

  transformGraph(){
    let graph = document.querySelector('.inner_svg g')
    let re_transform = /translate(\(*.*\)(?= ))/
    let re_xcoord = /(?<=\()[-\d.]*/
    let re_ycoord = /[-\d.]*(?=\))/
    let searchstring = graph.getAttribute("transform")
    let old_str_transform = /translate(\(*.*\)(?= ))/.exec(searchstring)[0]
    let old_x = re_xcoord.exec(old_str_transform)[0]
    let old_y = re_ycoord.exec(old_str_transform)[0]
    let new_x = old_x
    let new_y = old_y
    let offsets = this.getOffsets()
    if(offsets.top < 0){
      new_y -= offsets.top
    }
    else if(offsets.bottom < 0){
      new_y += offsets.botton
    }
    if(offsets.left < 0){
      new_x -= offsets.left
    }
    else if(offsets.right < 0){
      new_x += offsets.right
    }
    let updated_transform_string = searchstring.replace(
      re_transform,
      `translate(${new_x},${new_y})`
    )
    graph.setAttribute('transform',updated_transform_string)
  }

  getOffsets() {
    let inner_svg_bounds = d3.select('.inner_svg').node().getBoundingClientRect()
    let outer_svg_bounds = d3.select('.outer_svg').node().getBoundingClientRect()
    let offset_right = outer_svg_bounds.right - inner_svg_bounds.right
    let offset_bottom = outer_svg_bounds.bottom - inner_svg_bounds.bottom
    let offset_left = inner_svg_bounds.left - outer_svg_bounds.left
    let offset_top = inner_svg_bounds.top - outer_svg_bounds.top
    return {
      'right':offset_right,
      'left':offset_left,
      'top':offset_top,
      'bottom':offset_bottom
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
