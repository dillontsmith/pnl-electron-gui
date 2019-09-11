import * as React from 'react'

import { Classes, Icon, Intent, ITreeNode, Position, Tooltip, Tree } from '@blueprintjs/core'
import { Example, IExampleProps } from '@blueprintjs/docs-theme'
import '../css/sidebar.css'

export default class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nodes: INITIAL_STATE,
      class: props.className != undefined ? `${Classes.ELEVATION_0} ${props.className}`:Classes.ELEVATION_0
    }
  }

  render() {
    return (
      <div className='sidebar'>
        <Tree
          contents={this.state.nodes}
          onNodeClick={this.handleNodeClick}
          onNodeCollapse={this.handleNodeCollapse}
          onNodeExpand={this.handleNodeExpand}
          className={this.state.class}
        />
      </div>
    )
  }

  handleNodeClick = (nodeData, _nodePath, e) => {
    const originallySelected = nodeData.isSelected
    if (!e.shiftKey) {
      this.forEachNode(this.state.nodes, n => (n.isSelected = false))
    }
    nodeData.isSelected = originallySelected == null ? true : !originallySelected
    this.setState(this.state)
  }

  handleNodeCollapse = (nodeData) => {
    nodeData.isExpanded = false
    this.setState(this.state)
  }

  handleNodeExpand = (nodeData) => {
    nodeData.isExpanded = true
    this.setState(this.state)
  }

  forEachNode(nodes, callback) {
    if (nodes == null) {
      return
    }

    for (const node of nodes) {
      this.forEachNode(node.childNodes, callback)
      callback(node)
    }
  }
}

var components = {
  'Mechanisms': {
    'Adaptive': {
      'Control': [
        'Control Mechanism',
        'Optimization Control Mechanism'
      ]
    },
    'Gating': [
      'Gating Mechanism'
    ],
    'Learning': [
      'Learning Mechanism '
    ],
    'Processing': [
      'Integrator Mechanism',
      'Objective Mechanism',
      'Processing Mechanism',
      'Transfer Mechanism'
    ]
  },
  'Projections': {
    'Modulatory': [
      'Control Projection',
      'Gating Projection',
      'Learning Projection'
    ],
    'Pathway': [
      'Mapping Projection',
      'Pathway Projection'
    ]
  }
}


const INITIAL_STATE = [
  {
    id: 0,
    icon: 'folder-close',
    hasCaret: false,
    isExpanded: true,
    label: 'Components',
    childNodes: [
      {
        id: 1,
        icon: 'folder-close',
        label: 'Mechanisms',
        hasCaret: false,
        isExpanded: true,
        childNodes: [
          {
            id: 2,
            icon: 'folder-close',
            label: 'Adaptive',
            hasCaret: false,
            isExpanded: true,
            childNodes: [
              {
                id: 3,
                icon: 'folder-close',
                label: 'Control',
                hasCaret: false,
                isExpanded: true,
                childNodes: [
                  {
                    id: 4,
                    icon: 'cog',
                    label: 'Control Mechanism'
                  },
                  {
                    id: 5,
                    icon: 'cog',
                    label: 'Optimization Control Mechanism'
                  },
                ]
              }
            ],
          },
          {
            id: 6,
            icon: 'folder-close',
            label: 'Gating',
            hasCaret: false,
            isExpanded: true,
            childNodes: [
              {
                id: 7,
                icon: 'cog',
                label: 'Gating Mechanism'
              }
            ],
          },
          {
            id: 8,
            icon: 'folder-close',
            label: 'Learning',
            hasCaret: false,
            isExpanded: true,
            childNodes: [
              {
                id: 7,
                icon: 'cog',
                label: 'Learning Mechanism'
              }
            ],
          },
          {
            id: 9,
            icon: 'folder-close',
            label: 'Processing',
            hasCaret: false,
            isExpanded: true,
            childNodes: [
              {
                id: 10,
                icon: 'cog',
                label: 'Integrator Mechanism'
              },
              {
                id: 11,
                icon: 'cog',
                label: 'Objective Mechanism'
              },
              {
                id: 12,
                icon: 'cog',
                label: 'Processing Mechanism'
              },
              {
                id: 13,
                icon: 'cog',
                label: 'Transfer Mechanism'
              }
            ],
          }
        ]
      },
      {
        id: 14,
        icon: 'folder-close',
        label: 'Projections',
        hasCaret: false,
        isExpanded: true,
        childNodes: [
          {
            id: 15,
            icon: 'folder-close',
            label: 'Modulatory',
            hasCaret: false,
            isExpanded: true,
            childNodes: [
              {
                id: 16,
                icon: 'inheritance',
                label: 'Control Projection'
              },
              {
                id: 17,
                icon: 'inheritance',
                label: 'Gating Projection'
              },
              {
                id: 18,
                icon: 'inheritance',
                label: 'Learning Projection'
              }
            ]
          },
          {
            id: 19,
            icon: 'folder-close',
            label: 'Pathway',
            hasCaret: false,
            isExpanded: true,
            childNodes: [
              {
                id: 20,
                icon: 'inheritance',
                label: 'Mapping Projection'
              },
              {
                id: 21,
                icon: 'inheritance',
                label: 'Pathway Projection'
              }
            ]
          }
        ]
      }
    ]
  },
]

var exampleTree = (
  {
    id: 1,
    icon: 'folder-close',
    isExpanded: true,
    label: (
      <Tooltip content="I'm a folder <3" position={Position.RIGHT}>
        Folder 1
      </Tooltip>
    ),
    childNodes: [
      {
        id: 2,
        icon: 'document',
        label: 'Item 0',
        secondaryLabel: (
          <Tooltip content="An eye!">
            <Icon icon="eye-open"/>
          </Tooltip>
        ),
      },
      {
        id: 3,
        icon: <Icon icon="tag" intent={Intent.PRIMARY} className={Classes.TREE_NODE_ICON}/>,
        label: 'Organic meditation gluten-free, sriracha VHS drinking vinegar beard man.',
      },
      {
        id: 4,
        hasCaret: true,
        icon: 'folder-close',
        label: (
          <Tooltip content="foo" position={Position.RIGHT}>
            Folder 2
          </Tooltip>
        ),
        childNodes: [
          {
            id: 5,
            label: 'No-Icon Item'
          },
          {
            id: 6,
            icon: 'tag',
            label: 'Item 1'
          },
          {
            id: 7,
            hasCaret: true,
            icon: 'folder-close',
            label: 'Folder 3',
            childNodes: [
              {
                id: 8,
                icon: 'document',
                label: 'Item 0'
              },
              {
                id: 9,
                icon: 'tag',
                label: 'Item 1'
              },
            ],
          },
        ],
      },
    ],
  },
    {
      id: 2,
      hasCaret: true,
      icon: 'folder-close',
      label: 'Super secret files',
      disabled: true,
    }
)
