import React from 'react'
import { Tree, ContextMenuTarget, ContextMenu, Menu, MenuItem } from '@blueprintjs/core'
import '../css/sidebar.css'

class SideBar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <div className="bp3-tree bp3-elevation-0">
          <ul className="bp3-tree-node-list bp3-tree-root">
            <li className="bp3-tree-node bp3-tree-node-expanded">
              <div className="bp3-tree-node-content">
                <span
                  className="bp3-tree-node-caret bp3-tree-node-caret-open bp3-icon-standard"></span>
                <span
                  className="bp3-tree-node-icon bp3-icon-standard bp3-icon-folder-close"></span>
                <span className="bp3-tree-node-label">Label</span>
                <span className="bp3-tree-node-secondary-label">Secondary label</span>
              </div>
              <ul className="bp3-tree-node-list">
                <li className="bp3-tree-node">
                  <div className="bp3-tree-node-content">
                    <span className="bp3-tree-node-caret-none bp3-icon-standard"></span>
                    <span
                      className="bp3-tree-node-icon bp3-icon-standard bp3-icon-document"></span>
                    <span className="bp3-tree-node-label">A Document</span>
                  </div>
                </li>
                <li className="bp3-tree-node">
                  <div className="bp3-tree-node-content">
                    <span className="bp3-tree-node-caret-none bp3-icon-standard"></span>
                    <span
                      className="bp3-tree-node-icon bp3-icon-standard bp3-icon-document"></span>
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
    const sidebar_element = document.querySelector('.sidebar')
    sidebar_element.oncontextmenu = (e) => {
      // prevent the browser's native context menu
      e.preventDefault()

      // render a Menu without JSX...
      const menu = React.createElement(
        Menu,
        {}, // empty props
        React.createElement(MenuItem, {
          onClick: {},
          text: 'Placeholder 1'
        }),
        React.createElement(MenuItem, {
          onClick: {},
          text: 'Placeholder 2'
        }),
      )

      // mouse position is available on event
      ContextMenu.show(menu, {
        left: e.clientX,
        top: e.clientY
      }, () => {
        // menu was closed; callback optional
      })
    }
  }
}

export default SideBar


