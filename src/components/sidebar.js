import React from 'react'
import { Tree, ContextMenuTarget, ContextMenu, Menu, MenuItem } from '@blueprintjs/core'
import '../css/sidebar.css'
import add_context_menu from '../utility/add_context_menu'

const context_menu = [{
  onClick: {},
  text: 'Placeholder 1'
},
{
  onClick: {},
  text: 'Placeholder 2'
}
]

class SideBar extends React.Component {
  constructor(props){
    super()
  }
  render() {
    return (
      <div className="sidebar"
           onMouseEnter={this.props.hover}>
        <div className="bp3-tree bp3-elevation-0">
          <ul className="bp3-tree-node-list bp3-tree-root">
            <li className="bp3-tree-node bp3-tree-node-expanded">
              <div className="bp3-tree-node-content">
                <span className="bp3-tree-node-caret
                                 bp3-tree-node-caret-open
                                 bp3-icon-standard"/>

                <span className="bp3-tree-node-icon
                                 bp3-icon-standard
                                 bp3-icon-folder-close"/>

                <span className="bp3-tree-node-label">Label</span>

                <span className="bp3-tree-node-secondary-label">Secondary label</span>
              </div>
              <ul className="bp3-tree-node-list">
                <li className="bp3-tree-node">
                  <div className="bp3-tree-node-content">
                    <span className="bp3-tree-node-caret-none
                                     bp3-icon-standard"/>

                    <span className="bp3-tree-node-icon
                                     bp3-icon-standard
                                     bp3-icon-document"/>

                    <span className="bp3-tree-node-label">A Document</span>
                  </div>
                </li>
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

export default SideBar


