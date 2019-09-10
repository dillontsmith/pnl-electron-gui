import React from 'react'
import '../css/sidebar.css'
import add_context_menu from '../utility/add_context_menu'
import components from '../resources/components'
import tree from '@blueprintjs/core'
const context_menu = [{
  onClick: {},
  text: 'Placeholder 1'
},
{
  onClick: {},
  text: 'Placeholder 2'
}
]

function create_tree_node(primary_text="", secondary_text="", icon="") {
  var node = (
    <li className="bp3-tree-node">
      <div className="bp3-tree-node-content">
        <span className="bp3-tree-node-caret-none"/>
        <span className={`bp3-tree-node-icon bp3-icon-standard ${icon}`}/>
        <span className="bp3-tree-node-label">{primary_text}</span>
        <span className="bp3-tree-node-secondary-label">{secondary_text}</span>
      </div>
    </li>
  )
  return node
}

function create_tree_node_list(nodes, root=false){
  if (!root){
    var root_string = ''
  }
  else {
    root_string = 'bp3-tree-root'
  }
  {/*<ul className={`bp3-tree-node-list ${root_string}`}>*/}
  var node_list = (
    <ul className={`bp3-tree-node-list`}>
      <li className="bp3-tree-node">
        <div className="bp3-tree-node-content">
          <span className="bp3-tree-node-icon bp3-icon-standard bp3-icon-folder-close"/>
          <span className="bp3-tree-node-label">Label</span>
        </div>
      {nodes}
      </li>
    </ul>
  )
  return node_list
}

class __sidebar extends React.Component {

  constructor(props){
    super()
  }
  render() {
    var node =
      create_tree_node(
        'this is a dang test',
        'also a test',
        'bp3-icon-document')

    var node_list =
      create_tree_node_list([node,node,node])

    var other_node_list =
      create_tree_node_list([node_list])

    return (
      <div className="sidebar"
           onMouseEnter={this.props.hover}>
        <div className="bp3-tree bp3-elevation-0">
          <ul className="bp3-tree-node-list bp3-tree-root">
            <li className="bp3-tree-node">

              <div className="bp3-tree-node-content">
                <span className="bp3-tree-node-icon bp3-icon-standard bp3-icon-folder-close"/>
                <span className="bp3-tree-node-label">Label</span>
              </div>

              <ul className="bp3-tree-node-list">

                <li className="bp3-tree-node">
                  <div className="bp3-tree-node-content">
                    <span className="bp3-tree-node-caret-none"/>
                    <span className="bp3-tree-node-icon bp3-icon-standard bp3-icon-document"/>
                    <span className="bp3-tree-node-label">A Document</span>
                  </div>
                </li>

                {node_list}

                <li className="bp3-tree-node">
                  <div className="bp3-tree-node-content">
                    <span className="bp3-tree-node-caret-none
                                     bp3-icon-standard"/>
                    <span className="bp3-tree-node-icon
                                     bp3-icon-standard
                                     bp3-icon-document"/>
                    <span className="bp3-tree-node-label">Another Document</span>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
  }
  componentDidMount() {
    add_context_menu(
      '.sidebar',
      context_menu
    )
  }
}

export default __sidebar


