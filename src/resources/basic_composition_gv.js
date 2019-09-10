const example_gv = 'digraph "Composition-0" { ' +
  'graph [overlap=False rankdir=BT] ' +
  'node [color=black fontname=arial fontsize=12 penwidth=1 shape=record] ' +
  'edge [fontname=arial fontsize=10] ' +
  'D [color=green penwidth=3 rank=source shape=oval] ' +
  'C [color=green penwidth=3 rank=source shape=oval] ' +
  'C -> E [label="" arrowhead=normal color=black penwidth=1] ' +
  'D -> E [label="" arrowhead=normal color=black penwidth=1] ' +
  'E [color=red penwidth=3 rank=max shape=oval] }';

export default example_gv
