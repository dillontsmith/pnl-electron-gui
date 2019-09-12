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
  }

  updateGraph() {
    var graph = document.querySelector('.graph-view .graph')
    var view_rect = document.querySelector('.graph-view')
      .getBoundingClientRect()
    var graph_rect = document.querySelector('.graph-view g.node')
      .getBBox()
    var total_graph_height = graph_rect.height + graph_rect.y
    if (total_graph_height > view_rect.height) {
      var percentage = Math.ceil((total_graph_height / view_rect.height) * 100)
      graph.setAttribute('height', `${percentage}%`)
    } else {
      graph.setAttribute('height', '99%')
    }

    var total_graph_width = graph_rect.width + graph_rect.x
    if (total_graph_width > view_rect.width) {
      var percentage = Math.ceil((total_graph_width / view_rect.width) * 100)
      graph.setAttribute('width', `${percentage}%`)
    } else {
      graph.setAttribute('width', '99%')
    }
  }

  setGraph() {
    let graph = {
      'nodes': [{
        'x': 444,
        'y': 275
      }, {
        'x': 378,
        'y': 324
      }, {
        'x': 478,
        'y': 278
      }, {
        'x': 471,
        'y': 256
      }, {
        'x': 382,
        'y': 269
      }, {
        'x': 371,
        'y': 247
      }, {
        'x': 359,
        'y': 276
      }, {
        'x': 364,
        'y': 302
      }, {
        'x': 400,
        'y': 330
      }, {
        'x': 388,
        'y': 298
      }, {
        'x': 524,
        'y': 296
      }, {
        'x': 570,
        'y': 243
      }, {
        'x': 552,
        'y': 159
      }, {
        'x': 502,
        'y': 287
      }, {
        'x': 511,
        'y': 313
      }, {
        'x': 513,
        'y': 265
      }, {
        'x': 602,
        'y': 132
      }, {
        'x': 610,
        'y': 90
      }, {
        'x': 592,
        'y': 91
      }, {
        'x': 575,
        'y': 89
      }, {
        'x': 607,
        'y': 73
      }, {
        'x': 591,
        'y': 68
      }, {
        'x': 574,
        'y': 73
      }, {
        'x': 589,
        'y': 149
      }, {
        'x': 620,
        'y': 205
      }, {
        'x': 621,
        'y': 230
      }, {
        'x': 589,
        'y': 234
      }, {
        'x': 602,
        'y': 223
      }, {
        'x': 548,
        'y': 188
      }, {
        'x': 532,
        'y': 196
      }, {
        'x': 548,
        'y': 114
      }, {
        'x': 575,
        'y': 174
      }, {
        'x': 497,
        'y': 250
      }, {
        'x': 576,
        'y': 196
      }, {
        'x': 504,
        'y': 201
      }, {
        'x': 494,
        'y': 186
      }, {
        'x': 482,
        'y': 199
      }, {
        'x': 505,
        'y': 219
      }, {
        'x': 486,
        'y': 216
      }, {
        'x': 590,
        'y': 306
      }, {
        'x': 677,
        'y': 169
      }, {
        'x': 657,
        'y': 258
      }, {
        'x': 667,
        'y': 205
      }, {
        'x': 552,
        'y': 227
      }, {
        'x': 518,
        'y': 173
      }, {
        'x': 473,
        'y': 125
      }, {
        'x': 796,
        'y': 260
      }, {
        'x': 731,
        'y': 272
      }, {
        'x': 642,
        'y': 288
      }, {
        'x': 576,
        'y': 269
      }, {
        'x': 605,
        'y': 187
      }, {
        'x': 559,
        'y': 289
      }, {
        'x': 544,
        'y': 356
      }, {
        'x': 505,
        'y': 365
      }, {
        'x': 579,
        'y': 289
      }, {
        'x': 619,
        'y': 282
      }, {
        'x': 574,
        'y': 329
      }, {
        'x': 664,
        'y': 306
      }, {
        'x': 627,
        'y': 304
      }, {
        'x': 643,
        'y': 327
      }, {
        'x': 664,
        'y': 348
      }, {
        'x': 665,
        'y': 327
      }, {
        'x': 653,
        'y': 317
      }, {
        'x': 650,
        'y': 338
      }, {
        'x': 622,
        'y': 321
      }, {
        'x': 633,
        'y': 338
      }, {
        'x': 647,
        'y': 357
      }, {
        'x': 718,
        'y': 362
      }, {
        'x': 636,
        'y': 240
      }, {
        'x': 640,
        'y': 227
      }, {
        'x': 617,
        'y': 249
      }, {
        'x': 631,
        'y': 254
      }, {
        'x': 566,
        'y': 213
      }, {
        'x': 713,
        'y': 322
      }, {
        'x': 716,
        'y': 298
      }, {
        'x': 666,
        'y': 241
      }, {
        'x': 627,
        'y': 355
      }],
      'links': [{
        'source': 1,
        'target': 0
      }, {
        'source': 2,
        'target': 0
      }, {
        'source': 3,
        'target': 0
      }, {
        'source': 3,
        'target': 2
      }, {
        'source': 4,
        'target': 0
      }, {
        'source': 5,
        'target': 0
      }, {
        'source': 6,
        'target': 0
      }, {
        'source': 7,
        'target': 0
      }, {
        'source': 8,
        'target': 0
      }, {
        'source': 9,
        'target': 0
      }, {
        'source': 11,
        'target': 10
      }, {
        'source': 11,
        'target': 3
      }, {
        'source': 11,
        'target': 2
      }, {
        'source': 11,
        'target': 0
      }, {
        'source': 12,
        'target': 11
      }, {
        'source': 13,
        'target': 11
      }, {
        'source': 14,
        'target': 11
      }, {
        'source': 15,
        'target': 11
      }, {
        'source': 17,
        'target': 16
      }, {
        'source': 18,
        'target': 16
      }, {
        'source': 18,
        'target': 17
      }, {
        'source': 19,
        'target': 16
      }, {
        'source': 19,
        'target': 17
      }, {
        'source': 19,
        'target': 18
      }, {
        'source': 20,
        'target': 16
      }, {
        'source': 20,
        'target': 17
      }, {
        'source': 20,
        'target': 18
      }, {
        'source': 20,
        'target': 19
      }, {
        'source': 21,
        'target': 16
      }, {
        'source': 21,
        'target': 17
      }, {
        'source': 21,
        'target': 18
      }, {
        'source': 21,
        'target': 19
      }, {
        'source': 21,
        'target': 20
      }, {
        'source': 22,
        'target': 16
      }, {
        'source': 22,
        'target': 17
      }, {
        'source': 22,
        'target': 18
      }, {
        'source': 22,
        'target': 19
      }, {
        'source': 22,
        'target': 20
      }, {
        'source': 22,
        'target': 21
      }, {
        'source': 23,
        'target': 16
      }, {
        'source': 23,
        'target': 17
      }, {
        'source': 23,
        'target': 18
      }, {
        'source': 23,
        'target': 19
      }, {
        'source': 23,
        'target': 20
      }, {
        'source': 23,
        'target': 21
      }, {
        'source': 23,
        'target': 22
      }, {
        'source': 23,
        'target': 12
      }, {
        'source': 23,
        'target': 11
      }, {
        'source': 24,
        'target': 23
      }, {
        'source': 24,
        'target': 11
      }, {
        'source': 25,
        'target': 24
      }, {
        'source': 25,
        'target': 23
      }, {
        'source': 25,
        'target': 11
      }, {
        'source': 26,
        'target': 24
      }, {
        'source': 26,
        'target': 11
      }, {
        'source': 26,
        'target': 16
      }, {
        'source': 26,
        'target': 25
      }, {
        'source': 27,
        'target': 11
      }, {
        'source': 27,
        'target': 23
      }, {
        'source': 27,
        'target': 25
      }, {
        'source': 27,
        'target': 24
      }, {
        'source': 27,
        'target': 26
      }, {
        'source': 28,
        'target': 11
      }, {
        'source': 28,
        'target': 27
      }, {
        'source': 29,
        'target': 23
      }, {
        'source': 29,
        'target': 27
      }, {
        'source': 29,
        'target': 11
      }, {
        'source': 30,
        'target': 23
      }, {
        'source': 31,
        'target': 30
      }, {
        'source': 31,
        'target': 11
      }, {
        'source': 31,
        'target': 23
      }, {
        'source': 31,
        'target': 27
      }, {
        'source': 32,
        'target': 11
      }, {
        'source': 33,
        'target': 11
      }, {
        'source': 33,
        'target': 27
      }, {
        'source': 34,
        'target': 11
      }, {
        'source': 34,
        'target': 29
      }, {
        'source': 35,
        'target': 11
      }, {
        'source': 35,
        'target': 34
      }, {
        'source': 35,
        'target': 29
      }, {
        'source': 36,
        'target': 34
      }, {
        'source': 36,
        'target': 35
      }, {
        'source': 36,
        'target': 11
      }, {
        'source': 36,
        'target': 29
      }, {
        'source': 37,
        'target': 34
      }, {
        'source': 37,
        'target': 35
      }, {
        'source': 37,
        'target': 36
      }, {
        'source': 37,
        'target': 11
      }, {
        'source': 37,
        'target': 29
      }, {
        'source': 38,
        'target': 34
      }, {
        'source': 38,
        'target': 35
      }, {
        'source': 38,
        'target': 36
      }, {
        'source': 38,
        'target': 37
      }, {
        'source': 38,
        'target': 11
      }, {
        'source': 38,
        'target': 29
      }, {
        'source': 39,
        'target': 25
      }, {
        'source': 40,
        'target': 25
      }, {
        'source': 41,
        'target': 24
      }, {
        'source': 41,
        'target': 25
      }, {
        'source': 42,
        'target': 41
      }, {
        'source': 42,
        'target': 25
      }, {
        'source': 42,
        'target': 24
      }, {
        'source': 43,
        'target': 11
      }, {
        'source': 43,
        'target': 26
      }, {
        'source': 43,
        'target': 27
      }, {
        'source': 44,
        'target': 28
      }, {
        'source': 44,
        'target': 11
      }, {
        'source': 45,
        'target': 28
      }, {
        'source': 47,
        'target': 46
      }, {
        'source': 48,
        'target': 47
      }, {
        'source': 48,
        'target': 25
      }, {
        'source': 48,
        'target': 27
      }, {
        'source': 48,
        'target': 11
      }, {
        'source': 49,
        'target': 26
      }, {
        'source': 49,
        'target': 11
      }, {
        'source': 50,
        'target': 49
      }, {
        'source': 50,
        'target': 24
      }, {
        'source': 51,
        'target': 49
      }, {
        'source': 51,
        'target': 26
      }, {
        'source': 51,
        'target': 11
      }, {
        'source': 52,
        'target': 51
      }, {
        'source': 52,
        'target': 39
      }, {
        'source': 53,
        'target': 51
      }, {
        'source': 54,
        'target': 51
      }, {
        'source': 54,
        'target': 49
      }, {
        'source': 54,
        'target': 26
      }, {
        'source': 55,
        'target': 51
      }, {
        'source': 55,
        'target': 49
      }, {
        'source': 55,
        'target': 39
      }, {
        'source': 55,
        'target': 54
      }, {
        'source': 55,
        'target': 26
      }, {
        'source': 55,
        'target': 11
      }, {
        'source': 55,
        'target': 16
      }, {
        'source': 55,
        'target': 25
      }, {
        'source': 55,
        'target': 41
      }, {
        'source': 55,
        'target': 48
      }, {
        'source': 56,
        'target': 49
      }, {
        'source': 56,
        'target': 55
      }, {
        'source': 57,
        'target': 55
      }, {
        'source': 57,
        'target': 41
      }, {
        'source': 57,
        'target': 48
      }, {
        'source': 58,
        'target': 55
      }, {
        'source': 58,
        'target': 48
      }, {
        'source': 58,
        'target': 27
      }, {
        'source': 58,
        'target': 57
      }, {
        'source': 58,
        'target': 11
      }, {
        'source': 59,
        'target': 58
      }, {
        'source': 59,
        'target': 55
      }, {
        'source': 59,
        'target': 48
      }, {
        'source': 59,
        'target': 57
      }, {
        'source': 60,
        'target': 48
      }, {
        'source': 60,
        'target': 58
      }, {
        'source': 60,
        'target': 59
      }, {
        'source': 61,
        'target': 48
      }, {
        'source': 61,
        'target': 58
      }, {
        'source': 61,
        'target': 60
      }, {
        'source': 61,
        'target': 59
      }, {
        'source': 61,
        'target': 57
      }, {
        'source': 61,
        'target': 55
      }, {
        'source': 62,
        'target': 55
      }, {
        'source': 62,
        'target': 58
      }, {
        'source': 62,
        'target': 59
      }, {
        'source': 62,
        'target': 48
      }, {
        'source': 62,
        'target': 57
      }, {
        'source': 62,
        'target': 41
      }, {
        'source': 62,
        'target': 61
      }, {
        'source': 62,
        'target': 60
      }, {
        'source': 63,
        'target': 59
      }, {
        'source': 63,
        'target': 48
      }, {
        'source': 63,
        'target': 62
      }, {
        'source': 63,
        'target': 57
      }, {
        'source': 63,
        'target': 58
      }, {
        'source': 63,
        'target': 61
      }, {
        'source': 63,
        'target': 60
      }, {
        'source': 63,
        'target': 55
      }, {
        'source': 64,
        'target': 55
      }, {
        'source': 64,
        'target': 62
      }, {
        'source': 64,
        'target': 48
      }, {
        'source': 64,
        'target': 63
      }, {
        'source': 64,
        'target': 58
      }, {
        'source': 64,
        'target': 61
      }, {
        'source': 64,
        'target': 60
      }, {
        'source': 64,
        'target': 59
      }, {
        'source': 64,
        'target': 57
      }, {
        'source': 64,
        'target': 11
      }, {
        'source': 65,
        'target': 63
      }, {
        'source': 65,
        'target': 64
      }, {
        'source': 65,
        'target': 48
      }, {
        'source': 65,
        'target': 62
      }, {
        'source': 65,
        'target': 58
      }, {
        'source': 65,
        'target': 61
      }, {
        'source': 65,
        'target': 60
      }, {
        'source': 65,
        'target': 59
      }, {
        'source': 65,
        'target': 57
      }, {
        'source': 65,
        'target': 55
      }, {
        'source': 66,
        'target': 64
      }, {
        'source': 66,
        'target': 58
      }, {
        'source': 66,
        'target': 59
      }, {
        'source': 66,
        'target': 62
      }, {
        'source': 66,
        'target': 65
      }, {
        'source': 66,
        'target': 48
      }, {
        'source': 66,
        'target': 63
      }, {
        'source': 66,
        'target': 61
      }, {
        'source': 66,
        'target': 60
      }, {
        'source': 67,
        'target': 57
      }, {
        'source': 68,
        'target': 25
      }, {
        'source': 68,
        'target': 11
      }, {
        'source': 68,
        'target': 24
      }, {
        'source': 68,
        'target': 27
      }, {
        'source': 68,
        'target': 48
      }, {
        'source': 68,
        'target': 41
      }, {
        'source': 69,
        'target': 25
      }, {
        'source': 69,
        'target': 68
      }, {
        'source': 69,
        'target': 11
      }, {
        'source': 69,
        'target': 24
      }, {
        'source': 69,
        'target': 27
      }, {
        'source': 69,
        'target': 48
      }, {
        'source': 69,
        'target': 41
      }, {
        'source': 70,
        'target': 25
      }, {
        'source': 70,
        'target': 69
      }, {
        'source': 70,
        'target': 68
      }, {
        'source': 70,
        'target': 11
      }, {
        'source': 70,
        'target': 24
      }, {
        'source': 70,
        'target': 27
      }, {
        'source': 70,
        'target': 41
      }, {
        'source': 70,
        'target': 58
      }, {
        'source': 71,
        'target': 27
      }, {
        'source': 71,
        'target': 69
      }, {
        'source': 71,
        'target': 68
      }, {
        'source': 71,
        'target': 70
      }, {
        'source': 71,
        'target': 11
      }, {
        'source': 71,
        'target': 48
      }, {
        'source': 71,
        'target': 41
      }, {
        'source': 71,
        'target': 25
      }, {
        'source': 72,
        'target': 26
      }, {
        'source': 72,
        'target': 27
      }, {
        'source': 72,
        'target': 11
      }, {
        'source': 73,
        'target': 48
      }, {
        'source': 74,
        'target': 48
      }, {
        'source': 74,
        'target': 73
      }, {
        'source': 75,
        'target': 69
      }, {
        'source': 75,
        'target': 68
      }, {
        'source': 75,
        'target': 25
      }, {
        'source': 75,
        'target': 48
      }, {
        'source': 75,
        'target': 41
      }, {
        'source': 75,
        'target': 70
      }, {
        'source': 75,
        'target': 71
      }, {
        'source': 76,
        'target': 64
      }, {
        'source': 76,
        'target': 65
      }, {
        'source': 76,
        'target': 66
      }, {
        'source': 76,
        'target': 63
      }, {
        'source': 76,
        'target': 62
      }, {
        'source': 76,
        'target': 48
      }, {
        'source': 76,
        'target': 58
      }]
    }
    let updateGraph = this.updateGraph
    var svg = d3.select('.graph-view')
      .append('svg')
      .attr('width', '99%')
      .attr('height', '99%')
      .attr('class', 'graph')
      .attr('overflow', 'auto')

    graph.links.forEach(function (d) {
      d.source = graph.nodes[d.source]
      d.target = graph.nodes[d.target]
    })

    var link = svg.append('g')
      .attr('class', 'link')
      .selectAll('line')
      .data(graph.links)
      .enter()
      .append('line')
      .attr('x1', function (d) {
        return d.source.x
      })
      .attr('y1', function (d) {
        return d.source.y
      })
      .attr('x2', function (d) {
        return d.target.x
      })
      .attr('y2', function (d) {
        return d.target.y
      })
      .attr('stroke-width', 1)
      .attr('stroke', 'black')

    var node = svg.append('g')
      .attr('class', 'node')
      .selectAll('circle')
      .data(graph.nodes)
      .enter()
      .append('circle')
      .attr('r', 4)
      .attr('cx', function (d) {
        return d.x
      })
      .attr('cy', function (d) {
        return d.y
      })
      .call(d3.drag()
        .on('drag', drag_node))
    function drag_node(d) {
      let graph_dimensions = document.querySelector('.graph-view .graph')
        .getBoundingClientRect()

      let bounds = {
        x_min: 10,
        x_max: graph_dimensions.width - 10,
        y_min: 10,
        y_max: graph_dimensions.height - 10
      }
      d.x = d3.event.x
      d.y = d3.event.y
      if (d.x < 0) {
        d.x = bounds.x_min
      }
      if (d.y < 0) {
        d.y = bounds.y_min
      }
      d3.select(this)
        .attr('cx', d.x)
        .attr('cy', d.y)

      link.filter(function (l) {
        return l.source === d
      })
        .attr('x1', d.x)
        .attr('y1', d.y)

      link.filter(function (l) {
        return l.target === d
      })
        .attr('x2', d.x)
        .attr('y2', d.y)
      updateGraph()
    }
  }

  render() {
    return (
      <div className={this.state.class}
           onScroll={this.updateGraph}/>
    )
  }
}

export default GraphView
