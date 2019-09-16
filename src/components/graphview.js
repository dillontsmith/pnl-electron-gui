import React from 'react'
import logo from '../resources/logo.svg'
import '../css/graphview.css'
import example_gv from '../resources/basic_composition_gv'
import * as d3 from 'd3'
import * as d3Graphviz from 'd3-graphviz'
import add_context_menu from '../utility/add_context_menu'
import graph from '../resources/graph'

const _ = d3Graphviz.graphviz

const context_menu = [{
  onClick: {},
  text: 'Placeholder 1'
},
  {
    onClick: {},
    text: 'Placeholder 2'
  }
]

class GraphView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      class: `graph-view ${this.props.className}`,
      mounted: false,
      node_width: 20
    }
    this.setGraph = this.setGraph.bind(this)
  }

  componentWillMount() {
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateGraph)
  }

  componentDidMount() {
    if (!this.state.mounted) {
      this.setGraph()
      this.setState({ mounted: true })
    }
    window.addEventListener('resize', this.updateGraph)
    add_context_menu('.graph-view', context_menu)
  }

  updateGraph() {
    var graph = document.querySelector('.graph-view .graph')
    var view_rect = document.querySelector('.graph-view')
      .getBoundingClientRect()
    var graph_rect = document.querySelector('.graph-view g.node')
      .getBBox()
    var total_graph_height = graph_rect.height + graph_rect.y
    if (total_graph_height > view_rect.height) {
      var percentage = Math.ceil((total_graph_height / (view_rect.height)) * 100)
      graph.setAttribute('height', `${percentage}%`)
    } else {
      graph.setAttribute('height', '99.5%')
    }

    var total_graph_width = graph_rect.width + graph_rect.x
    if (total_graph_width > view_rect.width) {
      var percentage = Math.ceil((total_graph_width / view_rect.width) * 100)
      graph.setAttribute('width', `${percentage}%`)
    } else {
      graph.setAttribute('width', '100%')
    }
  }

  setGraph() {
    let updateGraph = this.updateGraph
    let nodeWidth = this.state.node_width
    var svg = d3.select('.graph-view')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '99.5%')
      .attr('class', 'graph')
      .attr('overflow', 'auto')

    svg.append("svg:defs").append("svg:marker")
      .attr("id", window.location.href +"/triangle")
      .attr("refX", 6)
      .attr("refY", 6)
      .attr("markerWidth", 30)
      .attr("markerHeight", 30)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 12 6 0 12 3 6")
      .style("fill", "black");

    graph.nodes.forEach(function (d) {
        d.x = parseInt(d.pos.split(',')[0])
        d.y = parseInt(d.pos.split(',')[1])
      }
    )

    graph.edges.forEach(function (d) {
      d.tail = graph.nodes[d.tail]
      d.head = graph.nodes[d.head]
    })

    var edge = svg.append('g')
      .attr('class', 'edge')
      .selectAll('line')
      .data(graph.edges)
      .enter()
      .append('line')
      .attr('x1', function (d) {
        return d.tail.x
      })
      .attr('y1', function (d) {
        return d.tail.y
      })
      .attr('x2', function (d) {
        return d.head.x
      })
      .attr('y2', function (d) {
        return d.head.y
      })
      .attr('stroke-width', 1)
      .attr('stroke', 'black')

    var node = svg.append('g')
      .attr('class', 'node')
      .selectAll('circle')
      .data(graph.nodes)
      .enter()
      .append('circle')
      .attr('r', this.state.node_width)
      .attr('cx', function (d) {
        return d.x
      })
      .attr('cy', function (d) {
        return d.y
      })
      .style('fill', function (d){
        return d.color
      })
      .call(d3.drag()
        .on('drag', drag_node))

    var view_rect = document.querySelector('.graph-view')
      .getBoundingClientRect()
    var graph_rect = document.querySelector('g.node')
      .getBBox()
    var widthOffset = (view_rect.width/2)-(graph_rect.width/2)
    var heightOffset = (view_rect.height/2)-(graph_rect.height/2)

    graph.nodes.forEach(function (d) {
        d.x += widthOffset
        d.y += heightOffset
      }
    )

    function offset_point(x1,y1,x2,y2,offset){
      var adjusted_x = x2 - x1
      var adjusted_y = y2 - y1
      var radius = Math.sqrt((adjusted_x**2 + adjusted_y**2))-offset
      var phi = Math.atan2(adjusted_y, adjusted_x)
      var new_x = radius * Math.cos(phi) + x1
      var new_y = radius * Math.sin(phi) + y1
      return {
        x:new_x,
        y:new_y
      }
    }

    edge
      .attr('x1', function (d) {
        return d.tail.x
      })
      .attr('y1', function (d) {
        return d.tail.y
      })
      .attr('x2', function (d) {
        var x2 = offset_point(d.tail.x,d.tail.y,d.head.x,d.head.y,25).x
        return x2
        // return d.head.x
      })
      .attr('y2', function (d) {
        var y2 = offset_point(d.tail.x,d.tail.y,d.head.x,d.head.y,25).y
        return y2
        // return d.head.y
      })
      .attr("marker-end", "url(#" + window.location.href + "/triangle)");

    node
      .attr('cx', function (d) {
        return d.x
      })
      .attr('cy', function (d) {
        return d.y
      })


    function drag_node(d) {
      let graph_dimensions = document.querySelector('.graph-view .graph')
        .getBoundingClientRect()

      var r = nodeWidth

      let bounds = {
        x_min: r + graph_dimensions.width * 0.005,
        x_max: graph_dimensions.width - r - graph_dimensions.width * 0.005,
        y_min: r + graph_dimensions.height * 0.005,
        y_max: graph_dimensions.height - r
      }
      d.x = d3.event.x
      d.y = d3.event.y
      console.log(d.x, d.y)
      if (d.x < bounds.x_min) {
        d.x = bounds.x_min
      }
      else if (d.x > bounds.x_max) {
        d.x = bounds.x_max
      }
      if (d.y < bounds.y_min) {
        d.y = bounds.y_min
      }
      else if (d.y > bounds.y_max) {
        d.y = bounds.y_max
      }
      d3.select(this)
        .attr('cx', d.x)
        .attr('cy', d.y)

      edge.filter(function (l) {
        return l.tail === d
      })
        .attr('x1', d.x)
        .attr('y1', d.y)
        .attr('x2', function (d) {
          var x2 = offset_point(d.tail.x,d.tail.y,d.head.x,d.head.y,25).x
          return x2
          // return d.head.x
        })
        .attr('y2', function (d) {
          var y2 = offset_point(d.tail.x,d.tail.y,d.head.x,d.head.y,25).y
          return y2
          // return d.head.x
        })
      edge.filter(function (l) {
        return l.head === d
      })
        .attr('x2', function (d) {
          var x2 = offset_point(d.tail.x,d.tail.y,d.head.x,d.head.y,25).x
          return x2
          // return d.head.x
        })
        .attr('y2', function (d) {
          var y2 = offset_point(d.tail.x,d.tail.y,d.head.x,d.head.y,25).y
          return y2
          // return d.head.x
        })
      // updateGraph()
    }
    svg.on( "mousedown", function() {
        if( !d3.event.ctrlKey) {
          d3.selectAll( 'g.selected').classed( "selected", false);
        }

        var p = d3.mouse( this);

        svg.append( "rect")
          .attr('rx', 6)
          .attr('ry', 6)
          .attr('class', "selection")
          .attr('x', p[0])
          .attr('y', p[1])
          .attr('width',0)
          .attr('height',0);
      }
    )
      .on( "mousemove", function() {
        var s = svg.select( "rect.selection");

        if( !s.empty()) {
          let p = d3.mouse(this);
          let d = {};
          d.x = parseInt( s.attr('x'), 10);
          d.y = parseInt( s.attr('y'), 10);
          d.width = parseInt( s.attr('width'), 10);
          d.height = parseInt( s.attr('height'), 10);
          let move = {};
          move.x = p[0] - d.x;
          move.y = p[1] - d.y;

          // Calculate new properties of selection rectangle
          if( move.x < 1 || (move.x*2<d.width)) {
            d.x = p[0];
            d.width -= move.x;
          } else {
            d.width = move.x;
          }
          if( move.y < 1 || (move.y*2<d.height)) {
            d.y = p[1];
            d.height -= move.y;
          } else {
            d.height = move.y;
          }

          s.attr('x', d.x)
            .attr('y', d.y)
            .attr('width', d.width)
            .attr('height', d.height);

          // deselect all temporary selected state objects
          d3.selectAll( 'g.state.selection.selected').classed( "selected", false);

        }
      })
      .on( "mouseup", function() {
        // Remove selection frame
        svg.selectAll( "rect.selection").remove();

        // Remove temporary selection marker class
        d3.selectAll( 'g.state.selection').classed( "selection", false);
      })
      .on( "mouseout", function() {
        var s = svg.select( "rect.selection");
        if( !s.empty() && d3.event.relatedTarget.tagName=='HTML' ) {
          // Remove selection frame
          svg.selectAll( "rect.selection").remove();

          // Remove temporary selection marker class
          d3.selectAll( 'g.state.selection').classed( "selection", false);
        }
      });
  }
  render() {
    return (
      <div className={this.state.class}
           onScroll={this.updateGraph}/>
    )
  }
}

export default GraphView
