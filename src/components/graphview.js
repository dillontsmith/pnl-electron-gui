import React from 'react';
import logo from '../resources/logo.svg'
import '../css/graphview.css'
import example_gv from '../resources/basic_composition_gv'
import * as d3 from 'd3'
import * as d3Graphviz from 'd3-graphviz';

const _ = d3Graphviz.graphviz

class GraphView extends React.Component {
  componentDidMount() {
    this.setGraph()
  }

  setGraph() {
    d3.select(".test").graphviz().renderDot(example_gv);
  }

  render() {
    return(
      <div className="graph-view">
        <svg className="test"
        width="100%"
        height="100%"/>
      </div>
    )
  }
}

export default GraphView
